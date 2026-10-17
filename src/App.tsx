import { useState, useEffect } from 'react';
import { Question, ExamPolicy, UserProfile, TestAttempt } from './types/exam';
import { generateFull168QuestionBank } from './data/questionGenerator';
import { DEFAULT_POLICIES } from './data/defaultPolicies';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ExamWorkspace } from './components/ExamWorkspace';
import { ExamResults } from './components/ExamResults';
import { PolicyManagerModal } from './components/PolicyManagerModal';
import { QuestionBankModal } from './components/QuestionBankModal';
import { UserProfileModal } from './components/UserProfileModal';
import { PerformanceDashboardModal } from './components/PerformanceDashboardModal';
import { CustomTestCreatorModal } from './components/CustomTestCreatorModal';
import { FlashcardModal } from './components/FlashcardModal';
import { calculateDetailedResults, DetailedResults } from './utils/examEngine';

const INITIAL_USERS: UserProfile[] = [
  {
    id: 'u1',
    name: 'Zaid Al-Mansoor',
    email: 'zaid.mansoor@student.school',
    gradeLevel: 'Year 6 / Grade 5 (Level C/D)',
    avatarColor: '#0F766E',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'u2',
    name: 'Amina Khan',
    email: 'amina.k@student.school',
    gradeLevel: 'Year 6 / Grade 5 (Level C/D)',
    avatarColor: '#f59e0b',
    createdAt: new Date().toISOString(),
  },
];

export default function App() {
  // 1. Persistent Question Bank (Full 168+ official questions)
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('cat4_question_bank_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 40) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load saved question bank, generating full 168 bank', e);
    }
    return generateFull168QuestionBank();
  });

  // 2. Persistent Exam Policy (Default: GL Assessment Official Full-Length)
  const [policy, setPolicy] = useState<ExamPolicy>(() => {
    try {
      const saved = localStorage.getItem('cat4_exam_policy_v3');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved policy, using GL default', e);
    }
    return DEFAULT_POLICIES[0]; // GL Assessment Official 168-item Simulator
  });

  // 3. User Profiles & Active User
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('cat4_users_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // Fallback
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => users[0] || INITIAL_USERS[0]);

  // 4. Test History / Attempts
  const [attempts, setAttempts] = useState<TestAttempt[]>(() => {
    try {
      const saved = localStorage.getItem('cat4_attempts_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      // Fallback
    }
    return [
      {
        id: 'att-demo-1',
        userId: 'u1',
        userName: 'Zaid Al-Mansoor',
        examType: 'CAT4',
        examTitle: 'Part 1: Non-Verbal Reasoning Baseline',
        timestamp: Date.now() - 86400000 * 2,
        durationSeconds: 1140,
        totalQuestions: 24,
        correctAnswers: 20,
        percentage: 83,
        estimatedSas: 120,
        stanine: 8,
        stanineDescriptor: 'High (Above Average)',
        batteryBreakdown: {
          'Non-Verbal': { correct: 20, total: 24, percentage: 83, stanine: 8 },
        },
        weakestAreas: ['Figure Matrices'],
        strongestAreas: ['Figure Classification'],
      },
    ];
  });

  // 5. Navigation View & Active Session
  const [currentView, setCurrentView] = useState<'dashboard' | 'exam' | 'results'>('dashboard');
  const [activeExamQuestions, setActiveExamQuestions] = useState<Question[]>([]);
  const [activeExamTitle, setActiveExamTitle] = useState('CAT4 Assessment Simulation');
  const [lastSelectedSubtests, setLastSelectedSubtests] = useState<number[] | undefined>(undefined);
  const [resultsData, setResultsData] = useState<DetailedResults | null>(null);

  // Modals
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isQuestionBankModalOpen, setIsQuestionBankModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [isCustomTestModalOpen, setIsCustomTestModalOpen] = useState(false);
  const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('cat4_question_bank_v3', JSON.stringify(questions));
    } catch (e) {
      // Storage quota fallback
    }
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem('cat4_exam_policy_v3', JSON.stringify(policy));
    } catch (e) {
      // Storage quota fallback
    }
  }, [policy]);

  useEffect(() => {
    try {
      localStorage.setItem('cat4_users_v3', JSON.stringify(users));
    } catch (e) {
      // Storage quota fallback
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('cat4_attempts_v3', JSON.stringify(attempts));
    } catch (e) {
      // Storage quota fallback
    }
  }, [attempts]);

  // Launch Full 168-Question Official GL Assessment Exam
  const handleStartFull168Exam = () => {
    // Select questions from all 8 subtests with official counts
    const selected: Question[] = [];
    const counts: Record<number, number> = {
      1: 24,
      2: 24,
      3: 24,
      4: 24,
      5: 18,
      6: 18,
      7: 18,
      8: 18,
    };

    for (let sId = 1; sId <= 8; sId++) {
      const subQs = questions.filter((q) => q.subtestId === sId);
      const targetCount = counts[sId] || 18;
      selected.push(...subQs.slice(0, targetCount));
    }

    // Set official GL policy with strict section locking
    setPolicy((prev) => ({
      ...prev,
      name: 'GL Assessment Official Full-Length (168 Items, Strict Timing)',
      timerType: 'subtest',
      strictSectionLocking: true,
      subtestMinutes: { 1: 10, 2: 10, 3: 8, 4: 8, 5: 10, 6: 8, 7: 9, 8: 9, 9: 10 },
      totalMinutes: 72,
    }));

    setLastSelectedSubtests([1, 2, 3, 4, 5, 6, 7, 8]);
    setActiveExamTitle('Official Full-Length CAT4 Level C/D Exam (168 Questions)');
    setActiveExamQuestions(selected);
    setCurrentView('exam');
  };

  const handleStartExam = (subtestIds?: number[], customTitle?: string) => {
    setLastSelectedSubtests(subtestIds);
    let selected: Question[] = [];
    if (subtestIds && subtestIds.length > 0) {
      selected = questions.filter((q) => subtestIds.includes(q.subtestId));
    } else {
      selected = [...questions];
    }

    if (selected.length === 0) {
      alert('No questions found for the selected subtests. Starting with all available questions.');
      selected = [...questions];
    }

    if (policy.questionOrder === 'randomized') {
      selected = [...selected].sort(() => Math.random() - 0.5);
    }

    setActiveExamTitle(customTitle || 'CAT4 Subtest Diagnostic');
    setActiveExamQuestions(selected);
    setCurrentView('exam');
  };

  const handleLaunchCustomTest = (
    selectedQuestions: Question[],
    customTitle: string,
    customMinutes: number,
    isRandomized: boolean
  ) => {
    setPolicy((prev) => ({
      ...prev,
      name: `Custom: ${customTitle}`,
      timerType: 'total',
      totalMinutes: customMinutes,
      questionOrder: isRandomized ? 'randomized' : 'sequential',
    }));

    setLastSelectedSubtests(undefined);
    setActiveExamTitle(customTitle);
    setActiveExamQuestions(selectedQuestions);
    setCurrentView('exam');
  };

  const handleFinishExam = (
    userAnswers: Record<string, string>,
    flagged: Record<string, boolean>,
    timeSpent: Record<string, number>
  ) => {
    const results = calculateDetailedResults(
      activeExamQuestions,
      userAnswers,
      flagged,
      timeSpent,
      policy
    );
    setResultsData(results);

    // Identify weak spots (< 65% accuracy) and strong spots
    const weakest: string[] = [];
    const strongest: string[] = [];

    Object.entries(results.batteryStats).forEach(([bName, stat]) => {
      if (stat.percentage < 65) {
        weakest.push(`${bName} Reasoning`);
      } else if (stat.percentage >= 80) {
        strongest.push(`${bName} Reasoning`);
      }
    });

    // Detect exam type
    let determinedType: 'CAT4' | 'Science' | 'Math' | 'GL' | 'Custom' = 'CAT4';
    if (activeExamTitle.toLowerCase().includes('science')) determinedType = 'Science';
    else if (activeExamTitle.toLowerCase().includes('math')) determinedType = 'Math';
    else if (activeExamTitle.toLowerCase().includes('gl')) determinedType = 'GL';
    else if (activeExamTitle.toLowerCase().includes('custom')) determinedType = 'Custom';

    // Record test attempt for user profile
    const newAttempt: TestAttempt = {
      id: `att-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      examType: determinedType,
      examTitle: activeExamTitle,
      timestamp: Date.now(),
      durationSeconds: results.timeSpentTotalSeconds,
      totalQuestions: results.totalQuestions,
      correctAnswers: results.totalCorrect,
      percentage: results.rawPercentage,
      estimatedSas: results.overallSas,
      stanine: results.overallStanine,
      stanineDescriptor: results.overallDescriptor,
      batteryBreakdown: Object.entries(results.batteryStats).reduce((acc, [k, v]) => {
        acc[k] = { correct: v.correct, total: v.total, percentage: v.percentage, stanine: v.stanine };
        return acc;
      }, {} as any),
      weakestAreas: weakest.length > 0 ? weakest : ['None — high balanced accuracy!'],
      strongestAreas: strongest,
    };

    setAttempts((prev) => [...prev, newAttempt]);
    setCurrentView('results');
  };

  const handleRetakeExam = () => {
    if (lastSelectedSubtests && lastSelectedSubtests.length === 8) {
      handleStartFull168Exam();
    } else {
      handleStartExam(lastSelectedSubtests, activeExamTitle);
    }
  };

  const handleGoHome = () => {
    setCurrentView('dashboard');
  };

  const handleCreateUser = (newUser: UserProfile) => {
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <div className={`min-h-screen flex flex-col ${policy.theme.appBackground || 'bg-slate-100'} text-slate-900 transition-colors duration-300 font-sans`}>
      {/* Top Header */}
      <Header
        policy={policy}
        currentUser={currentUser}
        questionCount={questions.length}
        currentView={currentView}
        onOpenPolicy={() => setIsPolicyModalOpen(true)}
        onOpenQuestionBank={() => setIsQuestionBankModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenPerformance={() => setIsPerformanceModalOpen(true)}
        onOpenCustomTest={() => setIsCustomTestModalOpen(true)}
        onOpenFlashcards={() => setIsFlashcardModalOpen(true)}
        onGoHome={handleGoHome}
      />

      {/* Main Screen Router */}
      <main className="flex-grow flex flex-col">
        {currentView === 'dashboard' && (
          <Dashboard
            policy={policy}
            questions={questions}
            currentUser={currentUser}
            attempts={attempts}
            onStartFull168Exam={handleStartFull168Exam}
            onStartExam={handleStartExam}
            onOpenPolicy={() => setIsPolicyModalOpen(true)}
            onOpenQuestionBank={() => setIsQuestionBankModalOpen(true)}
            onOpenPerformance={() => setIsPerformanceModalOpen(true)}
            onOpenCustomTest={() => setIsCustomTestModalOpen(true)}
            onOpenFlashcards={() => setIsFlashcardModalOpen(true)}
          />
        )}

        {currentView === 'exam' && (
          <ExamWorkspace
            questions={activeExamQuestions}
            policy={policy}
            onFinishExam={handleFinishExam}
            onExitExam={handleGoHome}
          />
        )}

        {currentView === 'results' && resultsData && (
          <ExamResults
            results={resultsData}
            policy={policy}
            onRetake={handleRetakeExam}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* Modals & Dialogs */}
      <PolicyManagerModal
        currentPolicy={policy}
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        onSavePolicy={(newPolicy) => setPolicy(newPolicy)}
      />

      <QuestionBankModal
        questions={questions}
        isOpen={isQuestionBankModalOpen}
        onClose={() => setIsQuestionBankModalOpen(false)}
        onUpdateQuestions={(newQuestions) => setQuestions(newQuestions)}
      />

      <UserProfileModal
        currentUser={currentUser}
        allUsers={users}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSelectUser={(u) => setCurrentUser(u)}
        onCreateUser={handleCreateUser}
      />

      <PerformanceDashboardModal
        currentUser={currentUser}
        attempts={attempts}
        isOpen={isPerformanceModalOpen}
        onClose={() => setIsPerformanceModalOpen(false)}
        onStartTargetedPractice={(subIds) => handleStartExam(subIds, 'Targeted Diagnostic Practice')}
      />

      <CustomTestCreatorModal
        allQuestions={questions}
        isOpen={isCustomTestModalOpen}
        onClose={() => setIsCustomTestModalOpen(false)}
        onLaunchCustomTest={handleLaunchCustomTest}
      />

      <FlashcardModal
        questions={questions}
        isOpen={isFlashcardModalOpen}
        onClose={() => setIsFlashcardModalOpen(false)}
      />
    </div>
  );
}
