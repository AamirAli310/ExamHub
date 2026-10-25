import { Question, ComplexityLevel } from '../types/exam';
import { SUBTEST_1_QUESTIONS, SUBTEST_2_QUESTIONS } from './questionsSubtest1_2';
import { SUBTEST_3_QUESTIONS, SUBTEST_4_QUESTIONS } from './questionsSubtest3_4';
import { SUBTEST_5_QUESTIONS, SUBTEST_6_QUESTIONS } from './questionsSubtest5_6';
import { SUBTEST_7_QUESTIONS, SUBTEST_8_QUESTIONS } from './questionsSubtest7_8';
import { SUBTEST_9_QUESTIONS } from './questionsSubtest9';

/**
 * Generates the full comprehensive question bank containing:
 * - Subtest 1: Figure Classification (80 Questions)
 * - Subtest 2: Figure Matrices (80 Questions)
 * - Subtest 3: Verbal Classification (80 Questions)
 * - Subtest 4: Verbal Analogies (80 Questions)
 * - Subtest 5: Number Analogies (80 Questions)
 * - Subtest 6: Number Series (80 Questions)
 * - Subtest 7: Figure Analysis / Hole Punching (80 Questions)
 * - Subtest 8: Figure Recognition / Hidden Shapes (80 Questions)
 * - Subtest 9: Science & Applied Math (40 Questions)
 * Total: 80 * 8 = 640 CAT4 Questions + 40 Science & Math = 680 Unique Questions!
 * Categorized across 4 international complexity levels:
 * - Beginner (Foundation / Key Stage 2 Baseline)
 * - Standard (Intermediate / Grade 5 Age-Expected Benchmark)
 * - Advanced (Proficient / High Stanine 7-8)
 * - Expert (Mastery / Stanine 9 & Olympiad)
 */
export function generateFull168QuestionBank(): Question[] {
  const allQuestions: Question[] = [
    ...SUBTEST_1_QUESTIONS,
    ...SUBTEST_2_QUESTIONS,
    ...SUBTEST_3_QUESTIONS,
    ...SUBTEST_4_QUESTIONS,
    ...SUBTEST_5_QUESTIONS,
    ...SUBTEST_6_QUESTIONS,
    ...SUBTEST_7_QUESTIONS,
    ...SUBTEST_8_QUESTIONS,
    ...SUBTEST_9_QUESTIONS,
  ];

  // Verify and enforce uniqueness of IDs
  const seenIds = new Set<string>();
  const sanitizedBank: Question[] = [];

  for (const q of allQuestions) {
    if (!seenIds.has(q.id)) {
      seenIds.add(q.id);
      sanitizedBank.push(q);
    } else {
      const uniqueId = `${q.id}-dup-${Math.random().toString(36).substring(2, 7)}`;
      seenIds.add(uniqueId);
      sanitizedBank.push({ ...q, id: uniqueId });
    }
  }

  return sanitizedBank;
}

/**
 * Shuffles an array using the Fisher-Yates algorithm for uniform random sampling
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Groups question bank items by Complexity Level
 */
export function groupQuestionsByComplexity(
  questions: Question[]
): Record<ComplexityLevel, Question[]> {
  const grouped: Record<ComplexityLevel, Question[]> = {
    Beginner: [],
    Standard: [],
    Advanced: [],
    Expert: [],
  };

  for (const q of questions) {
    const lvl = q.complexityLevel || 'Standard';
    if (grouped[lvl]) {
      grouped[lvl].push(q);
    } else {
      grouped.Standard.push(q);
    }
  }

  return grouped;
}

/**
 * Samples strictly unique, non-repeating questions for a test session.
 * Supports:
 * - Global complexity filtering (Beginner, Standard, Advanced, Expert, or Mixed)
 * - Granular subsection-level complexity overrides
 */
export function sampleUniqueExamQuestions(
  questionBank: Question[],
  subtestTargets: Record<number, number> = {
    1: 24,
    2: 24,
    3: 24,
    4: 24,
    5: 18,
    6: 18,
    7: 18,
    8: 18,
  },
  globalComplexity?: ComplexityLevel | 'Mixed',
  subtestComplexityOverrides?: Record<number, ComplexityLevel | 'Inherit'>
): Question[] {
  const selectedQuestions: Question[] = [];
  const usedIds = new Set<string>();

  const subtestIds = Object.keys(subtestTargets).map(Number).sort((a, b) => a - b);

  for (const subId of subtestIds) {
    const targetCount = subtestTargets[subId] || 18;

    // Determine target complexity for this specific subtest
    let subLevel: ComplexityLevel | 'Mixed' = globalComplexity || 'Mixed';
    if (subtestComplexityOverrides && subtestComplexityOverrides[subId]) {
      const override = subtestComplexityOverrides[subId];
      if (override !== 'Inherit') {
        subLevel = override;
      }
    }

    // Extract available questions for this subtest that haven't been picked yet
    const availableForSubtest = questionBank.filter(
      (q) => q.subtestId === subId && !usedIds.has(q.id)
    );

    let chosen: Question[] = [];

    if (subLevel !== 'Mixed') {
      // Primary selection: matching target complexity level
      const matchingLevel = availableForSubtest.filter((q) => q.complexityLevel === subLevel);
      const shuffledMatching = shuffleArray(matchingLevel);
      chosen = shuffledMatching.slice(0, Math.min(targetCount, shuffledMatching.length));

      // If more questions needed, fill from other levels gracefully
      if (chosen.length < targetCount) {
        const remainingNeeded = targetCount - chosen.length;
        const remainingPool = availableForSubtest.filter(
          (q) => !chosen.some((c) => c.id === q.id)
        );
        const shuffledRemaining = shuffleArray(remainingPool);
        chosen.push(...shuffledRemaining.slice(0, remainingNeeded));
      }
    } else {
      // Balanced / Mixed: evenly sample across Beginner, Standard, Advanced, Expert
      const byLevel = groupQuestionsByComplexity(availableForSubtest);
      const levels: ComplexityLevel[] = ['Beginner', 'Standard', 'Advanced', 'Expert'];
      const perLevelTarget = Math.ceil(targetCount / levels.length);

      for (const lvl of levels) {
        const shuffledLvl = shuffleArray(byLevel[lvl]);
        const take = shuffledLvl.slice(0, perLevelTarget);
        chosen.push(...take);
        if (chosen.length >= targetCount) break;
      }

      // If still needed due to uneven divisions, top up
      if (chosen.length < targetCount) {
        const remainingPool = availableForSubtest.filter(
          (q) => !chosen.some((c) => c.id === q.id)
        );
        const shuffledRemaining = shuffleArray(remainingPool);
        chosen.push(...shuffledRemaining.slice(0, targetCount - chosen.length));
      }
    }

    // Final slice to exact count
    const finalSubtestItems = chosen.slice(0, targetCount);
    for (const q of finalSubtestItems) {
      usedIds.add(q.id);
      selectedQuestions.push(q);
    }
  }

  return selectedQuestions;
}

/**
 * Samples unique questions for a single subtest or custom subset of subtests with complexity support
 */
export function sampleUniqueQuestionsForSubtests(
  questionBank: Question[],
  subtestIds: number[],
  countPerSubtest?: number,
  globalComplexity?: ComplexityLevel | 'Mixed',
  subtestComplexityOverrides?: Record<number, ComplexityLevel | 'Inherit'>
): Question[] {
  const targets: Record<number, number> = {};
  const defaultCounts: Record<number, number> = {
    1: 24,
    2: 24,
    3: 24,
    4: 24,
    5: 18,
    6: 18,
    7: 18,
    8: 18,
    9: 20,
  };

  for (const sId of subtestIds) {
    targets[sId] = countPerSubtest || defaultCounts[sId] || 18;
  }

  return sampleUniqueExamQuestions(
    questionBank,
    targets,
    globalComplexity,
    subtestComplexityOverrides
  );
}
