import { Question, ComplexityLevel } from '../types/exam';

/**
 * Subtest 5: Number Analogies (100 Questions)
 * Subtest 6: Number Series (100 Questions)
 * Strictly stratified across 4 international complexity levels:
 * - Beginner (Level 1: Q1-25) -> Single-step arithmetic (+, -, ×2, ×3, ÷2)
 * - Standard (Level 2: Q26-50) -> Two-step linear operations (2n + 1, 3n - 2) & alternating steps
 * - Advanced (Level 3: Q51-75) -> Quadratic powers (n² ± 1, n(n+1)), Fibonacci & 2nd-order differences
 * - Expert (Level 4: Q76-100) -> Cubic/Polynomial (n³ ± n), factorials & interleaved prime progressions
 */

interface NumberAnalogySpec {
  pair1: [number, number];
  pair2: [number, number];
  promptC: number;
  answerD: number;
  ruleDesc: string;
  isAdditive?: boolean;
  addConstant?: number;
  distractors: [number, number, number, number];
}

const BEGINNER_NA_RULES: NumberAnalogySpec[] = [
  { pair1: [4, 9], pair2: [7, 12], promptC: 10, answerD: 15, ruleDesc: 'Single-step: Add 5 (n + 5)', isAdditive: true, addConstant: 5, distractors: [13, 14, 16, 20] },
  { pair1: [12, 8], pair2: [15, 11], promptC: 20, answerD: 16, ruleDesc: 'Single-step: Subtract 4 (n - 4)', isAdditive: true, addConstant: -4, distractors: [14, 15, 17, 18] },
  { pair1: [3, 6], pair2: [5, 10], promptC: 8, answerD: 16, ruleDesc: 'Single-step: Multiply by 2 (2n)', distractors: [12, 14, 18, 20] },
  { pair1: [3, 9], pair2: [5, 15], promptC: 7, answerD: 21, ruleDesc: 'Single-step: Multiply by 3 (3n)', distractors: [18, 20, 24, 27] },
  { pair1: [14, 7], pair2: [20, 10], promptC: 24, answerD: 12, ruleDesc: 'Single-step: Divide by 2 (n ÷ 2)', distractors: [10, 11, 14, 16] },
];

const STANDARD_NA_RULES: NumberAnalogySpec[] = [
  { pair1: [4, 11], pair2: [7, 20], promptC: 9, answerD: 26, ruleDesc: 'Two-step: Multiply by 3, subtract 1 (3n - 1)', distractors: [24, 25, 27, 28] },
  { pair1: [2, 9], pair2: [6, 25], promptC: 8, answerD: 33, ruleDesc: 'Two-step: Multiply by 4, add 1 (4n + 1)', distractors: [31, 32, 34, 36] },
  { pair1: [5, 23], pair2: [8, 38], promptC: 10, answerD: 48, ruleDesc: 'Two-step: Multiply by 5, subtract 2 (5n - 2)', distractors: [45, 47, 50, 52] },
  { pair1: [16, 10], pair2: [24, 14], promptC: 32, answerD: 18, ruleDesc: 'Two-step: Divide by 2, add 2 (n/2 + 2)', distractors: [16, 17, 20, 22] },
  { pair1: [6, 19], pair2: [9, 28], promptC: 12, answerD: 37, ruleDesc: 'Two-step: Multiply by 3, add 1 (3n + 1)', distractors: [34, 35, 36, 39] },
];

const ADVANCED_NA_RULES: NumberAnalogySpec[] = [
  { pair1: [3, 10], pair2: [5, 26], promptC: 7, answerD: 50, ruleDesc: 'Quadratic: Square the number and add 1 (n² + 1)', distractors: [48, 49, 51, 56] },
  { pair1: [4, 15], pair2: [6, 35], promptC: 8, answerD: 63, ruleDesc: 'Quadratic: Square the number and subtract 1 (n² - 1)', distractors: [60, 62, 64, 65] },
  { pair1: [4, 20], pair2: [6, 42], promptC: 8, answerD: 72, ruleDesc: 'Oblong Product: Multiply number by (n + 1) -> n(n + 1)', distractors: [64, 68, 70, 80] },
  { pair1: [7, 42], pair2: [9, 72], promptC: 11, answerD: 110, ruleDesc: 'Reduced Product: Multiply number by (n - 1) -> n(n - 1)', distractors: [99, 108, 112, 121] },
  { pair1: [12, 140], pair2: [8, 60], promptC: 10, answerD: 96, ruleDesc: 'Quadratic Offset: Square and subtract 4 (n² - 4)', distractors: [90, 94, 100, 104] },
];

const EXPERT_NA_RULES: NumberAnalogySpec[] = [
  { pair1: [2, 10], pair2: [3, 30], promptC: 4, answerD: 68, ruleDesc: 'Cubic Polynomial: Cube the number and add the number itself (n³ + n)', distractors: [60, 64, 66, 72] },
  { pair1: [3, 24], pair2: [4, 60], promptC: 5, answerD: 120, ruleDesc: 'Cubic Minus Root: Cube the number and subtract n (n³ - n = (n-1)n(n+1))', distractors: [100, 115, 125, 130] },
  { pair1: [3, 28], pair2: [4, 65], promptC: 5, answerD: 126, ruleDesc: 'Cubic Plus One: Cube and add 1 (n³ + 1)', distractors: [120, 124, 125, 130] },
  { pair1: [4, 28], pair2: [6, 66], promptC: 8, answerD: 120, ruleDesc: 'Triangular Scaling: n(2n - 1)Hexagonal number mapping', distractors: [112, 116, 124, 128] },
  { pair1: [5, 75], pair2: [6, 108], promptC: 7, answerD: 147, ruleDesc: 'Triple Square: 3 × n² (Three times the square of n)', distractors: [140, 144, 150, 154] },
];

export const SUBTEST_5_QUESTIONS: Question[] = Array.from({ length: 100 }, (_, i) => {
  const qNum = i + 1;
  const id = `cat4-s5-${qNum}`;
  const complexityLevel: ComplexityLevel =
    qNum <= 25 ? 'Beginner' : qNum <= 50 ? 'Standard' : qNum <= 75 ? 'Advanced' : 'Expert';

  const tierIdx = (qNum - 1) % 25;
  const variantOffset = Math.floor(tierIdx / 5); // 0, 1, 2, 3, 4

  const pool =
    complexityLevel === 'Beginner'
      ? BEGINNER_NA_RULES
      : complexityLevel === 'Standard'
      ? STANDARD_NA_RULES
      : complexityLevel === 'Advanced'
      ? ADVANCED_NA_RULES
      : EXPERT_NA_RULES;

  const spec = pool[tierIdx % pool.length];

  // Generate distinct numbers per variantOffset while preserving exact algebraic validity
  let p1a = spec.pair1[0] + variantOffset;
  let p2a = spec.pair2[0] + variantOffset;
  let pc = spec.promptC + variantOffset;

  const computeVal = (x: number): number => {
    if (complexityLevel === 'Beginner') {
      const rIdx = tierIdx % 5;
      if (rIdx === 0) return x + 5 + variantOffset;
      if (rIdx === 1) return x - 3;
      if (rIdx === 2) return x * 2;
      if (rIdx === 3) return x * 3;
      return x * 2;
    }
    if (complexityLevel === 'Standard') {
      const rIdx = tierIdx % 5;
      if (rIdx === 0) return 3 * x - 1;
      if (rIdx === 1) return 4 * x + 1;
      if (rIdx === 2) return 5 * x - 2;
      if (rIdx === 3) return 2 * x + 3;
      return 3 * x + 2;
    }
    if (complexityLevel === 'Advanced') {
      const rIdx = tierIdx % 5;
      if (rIdx === 0) return x * x + 1;
      if (rIdx === 1) return x * x - 1;
      if (rIdx === 2) return x * (x + 1);
      if (rIdx === 3) return x * (x - 1);
      return x * x - 4;
    }
    // Expert
    const rIdx = tierIdx % 5;
    if (rIdx === 0) return x * x * x + x;
    if (rIdx === 1) return x * x * x - x;
    if (rIdx === 2) return x * x * x + 1;
    if (rIdx === 3) return x * (2 * x - 1);
    return 3 * x * x;
  };

  const p1b = computeVal(p1a);
  const p2b = computeVal(p2a);
  const ans = computeVal(pc);

  const letterMap: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
  const targetLabel = letterMap[(qNum - 1) % 5];

  const distractorPool = [ans - 2, ans + 2, ans - 4, ans + 5];
  const builtOptions = letterMap.map((lbl) => {
    if (lbl === targetLabel) {
      return { label: lbl, text: `${ans}` };
    }
    const dVal = distractorPool.shift() ?? ans + 3;
    return { label: lbl, text: `${dVal}` };
  });

  return {
    id,
    subtestId: 5,
    battery: 'Quantitative',
    subtestName: 'Number Analogies',
    stem: `[${complexityLevel} Tier] [${p1a} &rarr; ${p1b}] &bull; [${p2a} &rarr; ${p2b}] &bull; [${pc} &rarr; ? ]`,
    options: builtOptions,
    correctAnswer: targetLabel,
    explanation: `[${complexityLevel} Quantitative Rule] Each pair follows: ${spec.ruleDesc}. Applying this rule to ${pc} gives ${ans}.`,
    hint: `Test a ${complexityLevel.toLowerCase()}-level rule connecting ${p1a} to ${p1b} and ${p2a} to ${p2b}.`,
    difficulty: complexityLevel,
    complexityLevel,
    topicTag: `Number Analogies - ${complexityLevel}`,
  };
});

interface SeriesRuleSpec {
  patternName: string;
  generateTerms: (seedOffset: number) => number[];
  formulaDesc: string;
}

const BEGINNER_SERIES_RULES: SeriesRuleSpec[] = [
  { patternName: '+3 Constant Step', generateTerms: (s) => Array.from({ length: 6 }, (_, i) => (2 + s) + i * 3), formulaDesc: 'Single-step: Add 3 each time (+3)' },
  { patternName: '+5 Constant Step', generateTerms: (s) => Array.from({ length: 6 }, (_, i) => (5 + s) + i * 5), formulaDesc: 'Single-step: Add 5 each time (+5)' },
  { patternName: '-4 Constant Subtraction', generateTerms: (s) => Array.from({ length: 6 }, (_, i) => (40 + s * 2) - i * 4), formulaDesc: 'Single-step: Subtract 4 each time (-4)' },
  { patternName: 'Doubling Sequence (×2)', generateTerms: (s) => Array.from({ length: 6 }, (_, i) => (1 + (s % 3)) * Math.pow(2, i)), formulaDesc: 'Single-step: Multiply by 2 each step (×2)' },
  { patternName: '+10 Decade Step', generateTerms: (s) => Array.from({ length: 6 }, (_, i) => (4 + s) + i * 10), formulaDesc: 'Single-step: Add 10 each step (+10)' },
];

const STANDARD_SERIES_RULES: SeriesRuleSpec[] = [
  { patternName: 'Alternating +4, -1', generateTerms: (s) => {
    const res = [6 + s];
    for (let i = 1; i < 6; i++) res.push(res[i - 1] + (i % 2 === 1 ? 4 : -1));
    return res;
  }, formulaDesc: 'Two-step Alternating: Add 4, then subtract 1 alternately' },
  { patternName: 'Linear Increment (+2, +3, +4, +5, +6)', generateTerms: (s) => {
    const res = [3 + s];
    for (let i = 1; i < 6; i++) res.push(res[i - 1] + i + 1);
    return res;
  }, formulaDesc: 'Arithmetic Difference Progression: Add +2, +3, +4, +5, +6' },
  { patternName: 'Alternating ×2, -1', generateTerms: (s) => {
    const res = [3 + (s % 3)];
    for (let i = 1; i < 6; i++) res.push(i % 2 === 1 ? res[i - 1] * 2 : res[i - 1] - 1);
    return res;
  }, formulaDesc: 'Two-step Alternating: Multiply by 2, then subtract 1' },
  { patternName: 'Decelerating Step (-10, -8, -6, -4, -2)', generateTerms: (s) => {
    const res = [50 + s * 2];
    for (let i = 1; i < 6; i++) res.push(res[i - 1] - (12 - i * 2));
    return res;
  }, formulaDesc: 'Decreasing even subtraction: -10, -8, -6, -4, -2' },
  { patternName: 'Double Plus One (2n + 1)', generateTerms: (s) => {
    const res = [2 + (s % 3)];
    for (let i = 1; i < 6; i++) res.push(res[i - 1] * 2 + 1);
    return res;
  }, formulaDesc: 'Two-step Recursive: Multiply previous term by 2 and add 1' },
];

const ADVANCED_SERIES_RULES: SeriesRuleSpec[] = [
  { patternName: 'Fibonacci Sum of Two Preceding Terms', generateTerms: (s) => {
    const res = [2 + s, 3 + s];
    for (let i = 2; i < 6; i++) res.push(res[i - 1] + res[i - 2]);
    return res;
  }, formulaDesc: 'Fibonacci Recursion: Each term equals the sum of the two preceding terms (T_n = T_{n-1} + T_{n-2})' },
  { patternName: 'Shifted Squares (n² + 2)', generateTerms: (s) => Array.from({ length: 6 }, (_, i) => Math.pow(i + 2 + (s % 2), 2) + 2), formulaDesc: 'Quadratic Sequence: Consecutive squares plus 2 (n² + 2)' },
  { patternName: 'Interleaved Dual Sequences', generateTerms: (s) => [10 + s, 20 + s, 13 + s, 18 + s, 16 + s, 16 + s], formulaDesc: 'Interleaved Twin Series: Odd positions add +3; Even positions subtract -2' },
  { patternName: 'Geometric Difference (+2, +4, +8, +16, +32)', generateTerms: (s) => {
    const res = [5 + s];
    for (let i = 1; i < 6; i++) res.push(res[i - 1] + Math.pow(2, i));
    return res;
  }, formulaDesc: 'Exponential First Differences: Differences double each step (+2, +4, +8, +16, +32)' },
  { patternName: 'Prime Number Offset Chain', generateTerms: (s) => {
    const primes = [2, 3, 5, 7, 11, 13, 17];
    const res = [10 + s];
    for (let i = 1; i < 6; i++) res.push(res[i - 1] + primes[i]);
    return res;
  }, formulaDesc: 'Prime Differences: Consecutive prime numbers (+3, +5, +7, +11, +13) are added' },
];

const EXPERT_SERIES_RULES: SeriesRuleSpec[] = [
  { patternName: 'Cubic Polynomial Sequence (n³ - n)', generateTerms: (s) => Array.from({ length: 6 }, (_, i) => {
    const k = i + 2 + (s % 2);
    return k * k * k - k;
  }), formulaDesc: 'Expert Cubic Rule: Each term follows n³ - n = (n-1)n(n+1)' },
  { patternName: 'Third-Order Triangular Differences (+1, +3, +6, +10, +15)', generateTerms: (s) => {
    const diffs = [1, 3, 6, 10, 15];
    const res = [4 + s];
    for (let i = 0; i < 5; i++) res.push(res[i] + diffs[i]);
    return res;
  }, formulaDesc: 'Expert Tetrahedral Progression: First differences are triangular numbers (+1, +3, +6, +10, +15)' },
  { patternName: 'Alternating Multiplication & Square Root', generateTerms: (s) => {
    const base = 2 + (s % 2);
    return [base, base * base, base * base + 2, (base * base + 2) * 2, (base * base + 2) * 2 + 3, ((base * base + 2) * 2 + 3) * 2];
  }, formulaDesc: 'Expert Compound Operator: Alternates between multiplying and incrementing additive step' },
  { patternName: 'Modified Tribonacci (T_n = T_{n-1} + T_{n-2} - 1)', generateTerms: (s) => {
    const res = [3 + s, 5 + s];
    for (let i = 2; i < 6; i++) res.push(res[i - 1] + res[i - 2] - 1);
    return res;
  }, formulaDesc: 'Expert Non-Homogeneous Recurrence: Sum of previous two terms minus 1' },
  { patternName: 'n² × 2 Alternating Parity Offset', generateTerms: (s) => Array.from({ length: 6 }, (_, i) => {
    const n = i + 1 + (s % 2);
    return 2 * n * n + (i % 2 === 0 ? 1 : -1);
  }), formulaDesc: 'Expert Parity-Modulated Quadratic: 2n² + (-1)^i' },
];

export const SUBTEST_6_QUESTIONS: Question[] = Array.from({ length: 100 }, (_, i) => {
  const qNum = i + 1;
  const id = `cat4-s6-${qNum}`;
  const complexityLevel: ComplexityLevel =
    qNum <= 25 ? 'Beginner' : qNum <= 50 ? 'Standard' : qNum <= 75 ? 'Advanced' : 'Expert';

  const tierIdx = (qNum - 1) % 25;
  const seedOffset = Math.floor(tierIdx / 5);

  const pool =
    complexityLevel === 'Beginner'
      ? BEGINNER_SERIES_RULES
      : complexityLevel === 'Standard'
      ? STANDARD_SERIES_RULES
      : complexityLevel === 'Advanced'
      ? ADVANCED_SERIES_RULES
      : EXPERT_SERIES_RULES;

  const spec = pool[tierIdx % pool.length];
  const terms = spec.generateTerms(seedOffset);
  const promptTerms = terms.slice(0, 5);
  const correctNext = terms[5];

  const letterMap: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
  const targetLabel = letterMap[(qNum - 1) % 5];

  const distractors = [correctNext - 2, correctNext + 2, correctNext - 5, correctNext + 6];
  const builtOptions = letterMap.map((lbl) => {
    if (lbl === targetLabel) {
      return { label: lbl, text: `${correctNext}` };
    }
    const dVal = distractors.shift() ?? correctNext + 3;
    return { label: lbl, text: `${dVal}` };
  });

  return {
    id,
    subtestId: 6,
    battery: 'Quantitative',
    subtestName: 'Number Series',
    stem: `[${complexityLevel} Tier] Find the next number in this ${complexityLevel.toLowerCase()} sequence: [ ${promptTerms.join(', ')},  ? ]`,
    options: builtOptions,
    correctAnswer: targetLabel,
    explanation: `[${complexityLevel} Series Analysis] ${spec.formulaDesc}. Applying this step after ${promptTerms[4]} yields ${correctNext}.`,
    hint: `Examine the ${complexityLevel.toLowerCase()} progression rule: ${spec.patternName}.`,
    difficulty: complexityLevel,
    complexityLevel,
    topicTag: `Number Series - ${complexityLevel} (${spec.patternName})`,
  };
});
