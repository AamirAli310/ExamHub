export type BatteryType =
  | 'Non-Verbal'
  | 'Verbal'
  | 'Quantitative'
  | 'Spatial'
  | 'Science & Math';

export type ExamCategory = 'CAT4' | 'Science' | 'Math' | 'GL' | 'Custom';

export type OptionLabel = 'A' | 'B' | 'C' | 'D' | 'E';

export interface QuestionOption {
  label: OptionLabel;
  text: string;
  svgContent?: string;
  image?: string;
}

export type ComplexityLevel = 'Beginner' | 'Standard' | 'Advanced' | 'Expert';

export interface ComplexityMeta {
  level: ComplexityLevel;
  label: string;
  shortLabel: string;
  intlDescriptor: string; // International assessment standard description
  colorClass: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

export const COMPLEXITY_LEVELS_META: Record<ComplexityLevel, ComplexityMeta> = {
  Beginner: {
    level: 'Beginner',
    label: 'Beginner (Foundation / Key Stage 2 Baseline)',
    shortLabel: 'Beginner',
    intlDescriptor: 'Fundamental reasoning concepts, single-step rules, and guided patterns.',
    colorClass: 'emerald',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-700',
  },
  Standard: {
    level: 'Standard',
    label: 'Standard (Intermediate / Grade 5 Age-Expected)',
    shortLabel: 'Standard',
    intlDescriptor: 'Official GL Assessment standard benchmark, two-tier transformations.',
    colorClass: 'blue',
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
    badgeText: 'text-blue-700',
  },
  Advanced: {
    level: 'Advanced',
    label: 'Advanced (Proficient / High Stanine 7-8)',
    shortLabel: 'Advanced',
    intlDescriptor: 'Complex multi-variable analogies, interleaved series, spatial reflections.',
    colorClass: 'amber',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-800',
  },
  Expert: {
    level: 'Expert',
    label: 'Expert (Mastery / Stanine 9 & STEM Olympiad)',
    shortLabel: 'Expert',
    intlDescriptor: 'High-cognitive-load spatial folds, advanced abstract rules, non-linear logic.',
    colorClass: 'purple',
    badgeBg: 'bg-purple-50',
    badgeBorder: 'border-purple-200',
    badgeText: 'text-purple-700',
  },
};

export interface Question {
  id: string;
  subtestId: number; // 1 to 8, or 9 for Science & Math
  battery: BatteryType;
  subtestName: string;
  stem: string;
  diagramSvg?: string;
  diagramDescription?: string;
  options: QuestionOption[];
  correctAnswer: OptionLabel;
  explanation: string;
  hint?: string;
  difficulty?: ComplexityLevel | 'Foundation';
  complexityLevel?: ComplexityLevel;
  examType?: ExamCategory; // CAT4, Science, Math, GL
  isCustomUploaded?: boolean;
  topicTag?: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  headerBg: string;
  headerText: string;
  accentColor: string;
  cardBorder: string;
  btnPrimary: string;
  btnPrimaryHover: string;
  badgeBg: string;
  badgeText: string;
  appBackground: string;
}

export interface ExamPolicy {
  policyId: string;
  name: string;
  description: string;
  organization: string;
  timerType: 'subtest' | 'total' | 'per-question' | 'untimed';
  subtestMinutes: Record<number, number>; // subtestId -> duration in minutes
  totalMinutes: number; // For 'total' mode
  perQuestionSeconds: number; // For 'per-question' mode
  allowPause: boolean;
  allowNavigateBack: boolean; // within section
  showReviewScreen: boolean;
  showQuestionGrid: boolean;
  allowFlagging: boolean;
  instantFeedback: boolean;
  negativeMarking: number; // 0, 0.25, 0.33, etc.
  passPercentage: number;
  autoSubmitOnTimeUp: boolean;
  strictSectionLocking: boolean; // auto-locks section when timer expires
  questionOrder: 'sequential' | 'randomized'; // order of questions
  theme: ThemeConfig;
}

export interface SubtestMeta {
  id: number;
  part: number; // 1, 2, 3, 4
  battery: BatteryType;
  name: string;
  description: string;
  iconName: string;
  color: string;
  defaultMinutes: number; // GL Official: 10, 10, 8, 8, 10, 8, 9, 9
  officialQuestionCount: number; // 24, 24, 24, 24, 18, 18, 18, 18
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  gradeLevel?: string; // e.g. Year 6 / Grade 5
  avatarColor: string;
  createdAt: string;
}

export interface TestAttempt {
  id: string;
  userId: string;
  userName: string;
  examType: ExamCategory;
  examTitle: string;
  timestamp: number;
  durationSeconds: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  estimatedSas: number;
  stanine: number;
  stanineDescriptor: string;
  batteryBreakdown: Record<
    string,
    { correct: number; total: number; percentage: number; stanine: number }
  >;
  weakestAreas: string[]; // subtests or topics with < 65% accuracy
  strongestAreas: string[];
}

export interface CustomTestConfig {
  title: string;
  examType: ExamCategory;
  selectedSubtestIds: number[];
  includeDefaultBank: boolean;
  includeUploadedOnly: boolean;
  totalQuestions: number;
  durationMinutes: number;
  randomize: boolean;
  globalComplexity?: ComplexityLevel | 'Mixed';
  subtestComplexity?: Record<number, ComplexityLevel | 'Inherit'>;
}
