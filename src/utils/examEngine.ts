import { ExamPolicy, Question, BatteryType } from '../types/exam';

export interface BatteryAnalytics {
  battery: BatteryType;
  subtests: number[];
  correct: number;
  total: number;
  percentage: number;
  estimatedSas: number;
  stanine: number;
  descriptor: string;
}

export interface DetailedResults {
  totalQuestions: number;
  totalAnswered: number;
  totalCorrect: number;
  rawPercentage: number;
  totalScoreWithPenalty: number;
  overallSas: number;
  overallStanine: number;
  overallDescriptor: string;
  nprPercentile: number;
  batteryStats: Record<string, BatteryAnalytics>;
  timeSpentTotalSeconds: number;
  questionResults: {
    question: Question;
    userAnswer?: string;
    isCorrect: boolean;
    timeSpent: number;
    isFlagged: boolean;
  }[];
}

/**
 * Calculates CAT4 Standard Age Score (SAS) from accuracy percentage.
 * Mean = 100, SD = 15, range approx 69 to 141.
 */
export function calculateSas(percentage: number): number {
  if (percentage <= 0) return 69;
  if (percentage >= 100) return 141;

  // Linear / normal mapped approximation
  // 50% = 100 SAS, 75% = 115 SAS, 95% = 135 SAS, 25% = 85 SAS
  const zScore = (percentage - 50) / 25;
  const rawSas = Math.round(100 + zScore * 15);
  return Math.max(69, Math.min(141, rawSas));
}

/**
 * Maps SAS to Stanine 1 to 9
 */
export function getStanineFromSas(sas: number): { stanine: number; descriptor: string } {
  if (sas >= 127) return { stanine: 9, descriptor: 'Very High (Top 4%)' };
  if (sas >= 119) return { stanine: 8, descriptor: 'High (Above Average)' };
  if (sas >= 112) return { stanine: 7, descriptor: 'Above Average' };
  if (sas >= 104) return { stanine: 6, descriptor: 'Average (Upper Band)' };
  if (sas >= 96) return { stanine: 5, descriptor: 'Average (Mid Band)' };
  if (sas >= 89) return { stanine: 4, descriptor: 'Average (Lower Band)' };
  if (sas >= 82) return { stanine: 3, descriptor: 'Below Average' };
  if (sas >= 74) return { stanine: 2, descriptor: 'Low' };
  return { stanine: 1, descriptor: 'Very Low' };
}

/**
 * Estimates National Percentile Rank (NPR) from Stanine
 */
export function getPercentileFromStanine(stanine: number): number {
  const percentiles = [0, 4, 11, 23, 40, 60, 77, 89, 96, 99];
  return percentiles[stanine] || 50;
}

/**
 * Calculate full diagnostic results
 */
export function calculateDetailedResults(
  questions: Question[],
  userAnswers: Record<string, string>,
  flagged: Record<string, boolean>,
  timeSpent: Record<string, number>,
  policy: ExamPolicy
): DetailedResults {
  let totalCorrect = 0;
  let totalAnswered = 0;
  let penaltyDeduction = 0;
  let totalTime = 0;

  const batteryBuckets: Record<
    string,
    { subtests: Set<number>; correct: number; total: number }
  > = {};

  const questionResults = questions.map((q) => {
    const ans = userAnswers[q.id];
    const hasAnswered = ans !== undefined && ans !== '';
    if (hasAnswered) totalAnswered++;

    const isCorrect = ans === q.correctAnswer;
    if (isCorrect) {
      totalCorrect++;
    } else if (hasAnswered && policy.negativeMarking > 0) {
      penaltyDeduction += policy.negativeMarking;
    }

    const t = timeSpent[q.id] || 0;
    totalTime += t;

    // Group by battery
    const bName = q.battery;
    if (!batteryBuckets[bName]) {
      batteryBuckets[bName] = { subtests: new Set(), correct: 0, total: 0 };
    }
    batteryBuckets[bName].total++;
    batteryBuckets[bName].subtests.add(q.subtestId);
    if (isCorrect) {
      batteryBuckets[bName].correct++;
    }

    return {
      question: q,
      userAnswer: ans,
      isCorrect,
      timeSpent: t,
      isFlagged: !!flagged[q.id],
    };
  });

  const rawPercentage =
    questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0;
  const totalScoreWithPenalty = Math.max(0, totalCorrect - penaltyDeduction);
  const overallSas = calculateSas(rawPercentage);
  const { stanine: overallStanine, descriptor: overallDescriptor } =
    getStanineFromSas(overallSas);
  const nprPercentile = getPercentileFromStanine(overallStanine);

  const batteryStats: Record<string, BatteryAnalytics> = {};
  Object.keys(batteryBuckets).forEach((bName) => {
    const b = batteryBuckets[bName];
    const pct = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
    const sas = calculateSas(pct);
    const { stanine, descriptor } = getStanineFromSas(sas);
    batteryStats[bName] = {
      battery: bName as BatteryType,
      subtests: Array.from(b.subtests),
      correct: b.correct,
      total: b.total,
      percentage: pct,
      estimatedSas: sas,
      stanine,
      descriptor,
    };
  });

  return {
    totalQuestions: questions.length,
    totalAnswered,
    totalCorrect,
    rawPercentage,
    totalScoreWithPenalty: Math.round(totalScoreWithPenalty * 100) / 100,
    overallSas,
    overallStanine,
    overallDescriptor,
    nprPercentile,
    batteryStats,
    timeSpentTotalSeconds: totalTime,
    questionResults,
  };
}

/**
 * Intelligent parser for text / markdown / JSON exam policies.
 * Allows schools or users to upload policy text like:
 * "Exam: Grade 5 CAT4 Prep
 * Organization: Merryland International School
 * Duration: 8 minutes per section
 * Theme: gold
 * Negative marking: 0"
 */
export function parseExamPolicyFromText(rawText: string, currentPolicy: ExamPolicy): ExamPolicy {
  try {
    // If it's valid JSON, directly parse it
    const trimmed = rawText.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      const parsed = JSON.parse(trimmed);
      return {
        ...currentPolicy,
        ...parsed,
        theme: parsed.theme || currentPolicy.theme,
      };
    }
  } catch (e) {
    // Continue with regex heuristics
  }

  const lines = rawText.split('\n');
  const updated: ExamPolicy = { ...currentPolicy };

  lines.forEach((line) => {
    const lower = line.toLowerCase();

    // Check title / name
    if (lower.includes('name:') || lower.includes('title:') || lower.includes('exam:')) {
      const parts = line.split(/:(.+)/);
      if (parts[1]) updated.name = parts[1].trim();
    }

    // Check school / organization
    if (lower.includes('school:') || lower.includes('organization:') || lower.includes('institution:')) {
      const parts = line.split(/:(.+)/);
      if (parts[1]) updated.organization = parts[1].trim();
    }

    // Check minutes / time
    const minutesMatch = line.match(/(\d+)\s*(?:mins?|minutes?|m)\s*(?:per\s*(?:section|subtest))?/i);
    if (minutesMatch) {
      const mins = parseInt(minutesMatch[1]);
      if (lower.includes('total')) {
        updated.timerType = 'total';
        updated.totalMinutes = mins;
      } else {
        updated.timerType = 'subtest';
        const subMinutes: Record<number, number> = {};
        for (let i = 1; i <= 9; i++) subMinutes[i] = mins;
        updated.subtestMinutes = subMinutes;
      }
    }

    // Per question timer (e.g. 45s, 60 seconds)
    const secondsMatch = line.match(/(\d+)\s*(?:secs?|seconds?|s)\s*(?:per\s*question)?/i);
    if (secondsMatch) {
      updated.timerType = 'per-question';
      updated.perQuestionSeconds = parseInt(secondsMatch[1]);
    }

    // Untimed
    if (lower.includes('untimed') || lower.includes('no timer') || lower.includes('practice mode')) {
      updated.timerType = 'untimed';
    }

    // Negative marking
    const negMatch = line.match(/(?:negative|penalty)[:\s]*(-?[\d.]+)/i);
    if (negMatch) {
      updated.negativeMarking = Math.abs(parseFloat(negMatch[1]));
    }

    // Instant feedback
    if (lower.includes('instant feedback') || lower.includes('show answer immediately')) {
      updated.instantFeedback = !lower.includes('false') && !lower.includes('no');
    }

    // Allow pause
    if (lower.includes('allow pause') || lower.includes('pause enabled')) {
      updated.allowPause = !lower.includes('false') && !lower.includes('no');
    }
  });

  return updated;
}
