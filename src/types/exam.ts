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
  difficulty?: 'Foundation' | 'Standard' | 'Advanced';
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
}
