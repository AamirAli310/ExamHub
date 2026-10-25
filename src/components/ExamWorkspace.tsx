import React, { useState, useEffect, useRef } from 'react';
import { Question, ExamPolicy, OptionLabel } from '../types/exam';
import { SUBTESTS_META } from '../data/defaultPolicies';
import {
  Clock,
  Pause,
  Play,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Lock,
} from 'lucide-react';

interface ExamWorkspaceProps {
  questions: Question[];
  policy: ExamPolicy;
  onFinishExam: (
    userAnswers: Record<string, string>,
    flagged: Record<string, boolean>,
    timeSpent: Record<string, number>
  ) => void;
  onExitExam: () => void;
}

export const ExamWorkspace: React.FC<ExamWorkspaceProps> = ({
  questions,
  policy,
  onFinishExam,
  onExitExam,
}) => {
  // Determine distinct subtests in these questions
  const distinctSubtests = Array.from(new Set(questions.map((q) => q.subtestId))).sort(
    (a, b) => a - b
  );

  const [currentSubtestIndex, setCurrentSubtestIndex] = useState(0);
  const activeSubtestId = distinctSubtests[currentSubtestIndex] || 1;

  // Track locked subtests for strict section-locking policy
  const [lockedSubtestIds, setLockedSubtestIds] = useState<Set<number>>(new Set());
  const [timeExpiredModal, setTimeExpiredModal] = useState<boolean>(false);

  // Filter questions for the current subtest (if policy is subtest-based)
  const isSubtestTimer = policy.timerType === 'subtest';
  const subtestQuestions = isSubtestTimer
    ? questions.filter((q) => q.subtestId === activeSubtestId)
    : questions;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({});

  // Timer states
  const [subtestRemainingSecs, setSubtestRemainingSecs] = useState<number>(() => {
    if (policy.timerType === 'subtest') {
      return (policy.subtestMinutes[activeSubtestId] || 8) * 60;
    }
    if (policy.timerType === 'total') {
      return (policy.totalMinutes || 72) * 60;
    }
    if (policy.timerType === 'per-question') {
      return policy.perQuestionSeconds || 60;
    }
    return 0; // Untimed
  });

  const [isPaused, setIsPaused] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showNextSubtestModal, setShowNextSubtestModal] = useState(false);

  const activeQuestion = subtestQuestions[currentQIndex] || subtestQuestions[0];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize or update timer when subtest changes (if subtest mode)
  useEffect(() => {
    if (policy.timerType === 'subtest') {
      const dur = (policy.subtestMinutes[activeSubtestId] || 8) * 60;
      setSubtestRemainingSecs(dur);
    }
    setCurrentQIndex(0);
  }, [activeSubtestId, policy]);

  // Per-question timer reset when question changes
  useEffect(() => {
    if (policy.timerType === 'per-question') {
      setSubtestRemainingSecs(policy.perQuestionSeconds || 60);
    }
  }, [currentQIndex, policy.timerType, policy.perQuestionSeconds]);

  // Main countdown timer engine
  useEffect(() => {
    if (isPaused || policy.timerType === 'untimed') return;

    timerRef.current = setInterval(() => {
      setSubtestRemainingSecs((prev) => {
        if (prev <= 1) {
          handleTimerExpiry();
          return 0;
        }
        return prev - 1;
      });

      // Track time spent on current question
      if (activeQuestion) {
        setTimeSpent((prev) => ({
          ...prev,
          [activeQuestion.id]: (prev[activeQuestion.id] || 0) + 1,
        }));
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, policy.timerType, activeQuestion, currentSubtestIndex]);

  const handleTimerExpiry = () => {
    if (policy.timerType === 'per-question') {
      if (currentQIndex < subtestQuestions.length - 1) {
        setCurrentQIndex((idx) => idx + 1);
      } else {
        advanceSubtestOrSubmit();
      }
    } else if (policy.timerType === 'subtest') {
      // Strict section locking: lock current subtest
      setLockedSubtestIds((prev) => new Set([...prev, activeSubtestId]));
      setTimeExpiredModal(true);
    } else if (policy.timerType === 'total') {
      onFinishExam(userAnswers, flagged, timeSpent);
    }
  };

  const advanceSubtestOrSubmit = () => {
    // If strict locking is enabled, permanently lock the completed subtest
    if (policy.strictSectionLocking) {
      setLockedSubtestIds((prev) => new Set([...prev, activeSubtestId]));
    }

    if (currentSubtestIndex < distinctSubtests.length - 1) {
      setCurrentSubtestIndex((idx) => idx + 1);
    } else {
      onFinishExam(userAnswers, flagged, timeSpent);
    }
  };

  // Keyboard navigation & Shortcuts (1-5 or A-E, Arrow keys, 'F')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused || showSubmitModal || showNextSubtestModal || timeExpiredModal) return;

      const key = e.key.toUpperCase();
      const optionKeys: Record<string, OptionLabel> = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        '5': 'E',
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        E: 'E',
      };

      if (optionKeys[key]) {
        handleSelectAnswer(optionKeys[key]);
      } else if (key === 'ARROWLEFT' && policy.allowNavigateBack) {
        handlePrevQuestion();
      } else if (key === 'ARROWRIGHT') {
        handleNextQuestion();
      } else if (key === 'F' && policy.allowFlagging) {
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeQuestion,
    currentQIndex,
    isPaused,
    showSubmitModal,
    showNextSubtestModal,
    timeExpiredModal,
    policy,
  ]);

  const handleSelectAnswer = (label: OptionLabel) => {
    if (!activeQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: label,
    }));
  };

  const handleToggleFlag = () => {
    if (!activeQuestion) return;
    setFlagged((prev) => ({
      ...prev,
      [activeQuestion.id]: !prev[activeQuestion.id],
    }));
  };

  const handleNextQuestion = () => {
    if (currentQIndex < subtestQuestions.length - 1) {
      setCurrentQIndex((idx) => idx + 1);
    } else if (isSubtestTimer) {
      if (currentSubtestIndex < distinctSubtests.length - 1) {
        setShowNextSubtestModal(true);
      } else {
        setShowSubmitModal(true);
      }
    } else {
      setShowSubmitModal(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIndex > 0 && policy.allowNavigateBack) {
      setCurrentQIndex((idx) => idx - 1);
    }
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const subMeta = SUBTESTS_META.find((s) => s.id === activeSubtestId);

  // Statistics for active subtest
  const answeredCountInSubtest = subtestQuestions.filter(
    (q) => userAnswers[q.id] !== undefined
  ).length;
  const totalInSubtest = subtestQuestions.length;

  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-65px)] overflow-hidden bg-slate-100">
      {/* Top Exam Header Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs z-20">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${subMeta?.color || '#0F766E'}15`,
                color: subMeta?.color || '#0F766E',
              }}
            >
              Part {subMeta?.part || 1} &bull; {activeQuestion?.battery} Reasoning
            </span>
            <span className="text-xs text-slate-400">&bull;</span>
            <span className="text-xs font-semibold text-slate-700">
              Subtest {activeSubtestId}: {activeQuestion?.subtestName}
            </span>
            {policy.strictSectionLocking && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                <Lock className="w-3 h-3 text-slate-400" />
                Strict Section Lock
              </span>
            )}
          </div>
          <h2 className="font-extrabold text-base text-slate-900 mt-0.5">
            Question {currentQIndex + 1} of {subtestQuestions.length}
          </h2>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          {policy.timerType !== 'untimed' ? (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-base shadow-sm transition-all ${
                subtestRemainingSecs < 60
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-[#1E293B] text-white'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{formatTimer(subtestRemainingSecs)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Untimed Practice</span>
            </div>
          )}

          {policy.allowPause && policy.timerType !== 'untimed' && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
              title={isPaused ? 'Resume Exam' : 'Pause Exam'}
            >
              {isPaused ? <Play className="w-5 h-5 text-emerald-600" /> : <Pause className="w-5 h-5" />}
            </button>
          )}

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Finish & Review
          </button>
        </div>
      </div>

      {/* Per-Question Progress Bar (if in per-question mode) */}
      {policy.timerType === 'per-question' && (
        <div className="w-full bg-slate-200 h-1.5 overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-1000 ease-linear"
            style={{
              width: `${(subtestRemainingSecs / (policy.perQuestionSeconds || 60)) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-grow flex flex-col lg:flex-row h-full overflow-hidden relative">
        {/* PAUSE OVERLAY */}
        {isPaused && (
          <div className="absolute inset-0 z-40 bg-[#1E293B]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/40">
              <Pause className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Test Paused</h3>
            <p className="text-slate-300 max-w-md text-sm mb-6">
              The test timer is paused and question content is hidden to maintain integrity. Click Resume when you are ready to continue.
            </p>
            <button
              onClick={() => setIsPaused(false)}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Resume Exam
            </button>
          </div>
        )}

        {/* LEFT / CENTER: QUESTION WORKSPACE */}
        <div className="flex-grow flex flex-col h-full bg-white overflow-y-auto border-r border-slate-200 p-6 sm:p-10">
          <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col justify-between">
            {/* Question Stem & Content */}
            <div>
              {/* Question metadata badge & flag */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Item #{currentQIndex + 1}
                  </span>
                  {activeQuestion?.complexityLevel && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-wide ${
                        activeQuestion.complexityLevel === 'Beginner'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : activeQuestion.complexityLevel === 'Standard'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : activeQuestion.complexityLevel === 'Advanced'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}
                    >
                      {activeQuestion.complexityLevel} Tier
                    </span>
                  )}
                  {activeQuestion?.examType && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      {activeQuestion.examType}
                    </span>
                  )}
                </div>

                {policy.allowFlagging && (
                  <button
                    onClick={handleToggleFlag}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      flagged[activeQuestion?.id]
                        ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Flag
                      className={`w-3.5 h-3.5 ${
                        flagged[activeQuestion?.id]
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-slate-400'
                      }`}
                    />
                    <span>
                      {flagged[activeQuestion?.id] ? 'Flagged for Review' : 'Flag Question (F)'}
                    </span>
                  </button>
                )}
              </div>

              {/* Question Stem */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-relaxed">
                {activeQuestion?.stem}
              </h3>

              {/* Optional Diagram / Graphic SVG */}
              {activeQuestion?.diagramSvg && (
                <div
                  className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-center shadow-inner overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: activeQuestion.diagramSvg }}
                />
              )}

              {/* Multiple Choice Options (A - E) */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {activeQuestion?.options.map((opt) => {
                  const isSelected = userAnswers[activeQuestion.id] === opt.label;
                  const isInstant = policy.instantFeedback && userAnswers[activeQuestion.id];
                  const isRight = opt.label === activeQuestion.correctAnswer;

                  let borderClass = 'border-slate-300 hover:border-slate-400 bg-white text-slate-800';
                  if (isSelected && !isInstant) {
                    borderClass = 'border-[#0F766E] bg-teal-50/80 text-teal-950 font-bold ring-2 ring-teal-400/30';
                  } else if (isInstant) {
                    if (isRight) {
                      borderClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isSelected && !isRight) {
                      borderClass = 'border-red-500 bg-red-50 text-red-950 font-bold';
                    }
                  }

                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelectAnswer(opt.label)}
                      className={`flex items-center p-4 rounded-2xl border-2 ${borderClass} transition-all text-left group shadow-2xs cursor-pointer`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm mr-4 transition-all shrink-0 ${
                          isSelected && !isInstant
                            ? 'bg-[#0F766E] text-white'
                            : isInstant && isRight
                            ? 'bg-emerald-600 text-white'
                            : isInstant && isSelected && !isRight
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-sm sm:text-base font-medium flex-grow">
                        {opt.text}
                      </span>
                      {isSelected && !isInstant && (
                        <CheckCircle className="w-5 h-5 text-teal-700 shrink-0 ml-2" />
                      )}
                      {isInstant && isRight && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded ml-2">
                          Correct
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Feedback Explanation Box (if active) */}
              {policy.instantFeedback && userAnswers[activeQuestion?.id] && (
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-950 animate-fade-in mb-6">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <HelpCircle className="w-4 h-4 text-teal-600" />
                    <span>Explanation & Strategy Rule:</span>
                  </div>
                  <p>{activeQuestion?.explanation}</p>
                  {activeQuestion?.hint && (
                    <p className="mt-1 text-slate-600 italic">Tip: {activeQuestion.hint}</p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Question Navigation Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-auto">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQIndex === 0 || !policy.allowNavigateBack}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 transition-colors ${
                  currentQIndex === 0 || !policy.allowNavigateBack
                    ? 'opacity-40 cursor-not-allowed bg-slate-50'
                    : 'hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
                <span>Press keys</span>
                <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] text-slate-700">1-5</kbd>
                <span>or</span>
                <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] text-slate-700">A-E</kbd>
              </div>

              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#0F766E] hover:bg-teal-700 text-white font-bold text-xs transition-transform shadow-md hover:scale-105"
              >
                <span>
                  {currentQIndex === subtestQuestions.length - 1
                    ? isSubtestTimer && currentSubtestIndex < distinctSubtests.length - 1
                      ? 'End Subtest ➔'
                      : 'Finish Exam'
                    : 'Next Question'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: QUESTION GRID NAVIGATOR */}
        {policy.showQuestionGrid && (
          <div className="w-full lg:w-80 bg-slate-50 border-t lg:border-t-0 border-slate-200 p-6 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-900 text-sm">Question Navigator</h4>
                <span className="text-xs font-semibold text-slate-500">
                  {answeredCountInSubtest}/{totalInSubtest} Answered
                </span>
              </div>

              {/* Number Buttons Grid (Green = Answered, Gray = Skipped, Yellow = Flagged) */}
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 mb-6">
                {subtestQuestions.map((q, idx) => {
                  const isCurrent = idx === currentQIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isFlag = flagged[q.id];

                  let btnStyle = 'bg-slate-200 border-slate-300 text-slate-700 hover:border-slate-400';
                  if (isAnswered) {
                    btnStyle = 'bg-emerald-500 border-emerald-600 text-white font-bold shadow-2xs';
                  }
                  if (isFlag) {
                    btnStyle = 'bg-amber-400 border-amber-500 text-slate-950 font-bold';
                  }
                  if (isCurrent) {
                    btnStyle += ' ring-2 ring-[#1E293B] ring-offset-2';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        if (policy.allowNavigateBack || idx >= currentQIndex) {
                          setCurrentQIndex(idx);
                        }
                      }}
                      className={`h-10 rounded-xl border flex items-center justify-center text-xs font-semibold transition-all relative ${btnStyle}`}
                    >
                      {idx + 1}
                      {isFlag && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-600 rounded-full border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-2 mb-6 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
                  <span className="text-slate-600 font-medium">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
                  <span className="text-slate-600 font-medium">Flagged for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-slate-200 inline-block border border-slate-300" />
                  <span className="text-slate-600 font-medium">Skipped / Unanswered</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-4 border-t border-slate-200">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-3 rounded-xl bg-[#1E293B] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all text-center"
              >
                Submit Exam & View Diagnostics
              </button>
              <button
                onClick={onExitExam}
                className="w-full py-2 text-slate-500 hover:text-slate-700 text-xs font-semibold text-center"
              >
                Quit to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* STRICT SECTION TIME-UP AUTO-LOCK MODAL */}
      {timeExpiredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-red-500 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-200">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider px-2 py-0.5 rounded bg-red-50">
              Section Locked Automatically
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-2 mb-2">
              Time is Up for Subtest {activeSubtestId}!
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              In accordance with official GL Assessment exam policy, your allocated time has expired and Subtest {activeSubtestId} ({activeQuestion?.subtestName}) is now permanently locked. You cannot edit answers or return to this section.
            </p>
            <button
              onClick={() => {
                setTimeExpiredModal(false);
                advanceSubtestOrSubmit();
              }}
              className="w-full py-3 bg-[#0F766E] hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs shadow-md transition-transform hover:scale-105"
            >
              {currentSubtestIndex < distinctSubtests.length - 1
                ? `Proceed to Subtest ${distinctSubtests[currentSubtestIndex + 1]}`
                : 'View Final Exam Results'}
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL BEFORE NEXT SUBTEST */}
      {showNextSubtestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              End Subtest {activeSubtestId}?
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              You answered <strong>{answeredCountInSubtest}</strong> out of{' '}
              <strong>{totalInSubtest}</strong> questions in this section. Once you proceed to Subtest{' '}
              {distinctSubtests[currentSubtestIndex + 1]}, this section will be locked.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowNextSubtestModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold text-xs hover:bg-slate-50"
              >
                Review Current Section
              </button>
              <button
                onClick={() => {
                  setShowNextSubtestModal(false);
                  advanceSubtestOrSubmit();
                }}
                className="px-5 py-2 bg-[#0F766E] hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Proceed to Next Subtest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT EXAM FINAL CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Ready to Submit Your Exam?
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Total Questions Answered:{' '}
              <strong className="text-slate-900">
                {Object.keys(userAnswers).length} / {questions.length}
              </strong>
              {Object.keys(userAnswers).length < questions.length && (
                <span className="text-amber-700 block mt-1 font-medium">
                  ({questions.length - Object.keys(userAnswers).length} questions left unanswered)
                </span>
              )}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold text-xs hover:bg-slate-50"
              >
                Keep Practicing
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  onFinishExam(userAnswers, flagged, timeSpent);
                }}
                className="px-5 py-2 bg-[#0F766E] hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Yes, Submit Exam Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
