import React from 'react';
import { ExamPolicy, Question, UserProfile, TestAttempt } from '../types/exam';
import { SUBTESTS_META } from '../data/defaultPolicies';
import {
  Play,
  Sliders,
  Database,
  BookOpen,
  Sparkles,
  ArrowRight,
  Flame,
  HelpCircle,
  BarChart2,
  PlusCircle,
  Zap,
} from 'lucide-react';

interface DashboardProps {
  policy: ExamPolicy;
  questions: Question[];
  currentUser: UserProfile;
  attempts: TestAttempt[];
  onStartFull168Exam: () => void;
  onStartExam: (subtestIds?: number[], customTitle?: string) => void;
  onOpenPolicy: () => void;
  onOpenQuestionBank: () => void;
  onOpenPerformance: () => void;
  onOpenCustomTest: () => void;
  onOpenFlashcards: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  policy,
  questions,
  currentUser,
  attempts,
  onStartFull168Exam,
  onStartExam,
  onOpenPolicy,
  onOpenQuestionBank,
  onOpenPerformance,
  onOpenCustomTest,
  onOpenFlashcards,
}) => {
  const userAttempts = attempts.filter((a) => a.userId === currentUser.id);
  const latestAttempt = userAttempts[userAttempts.length - 1];

  return (
    <div className="flex-grow overflow-y-auto bg-slate-100 p-4 sm:p-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* STUDENT PROGRESS WELCOME BANNER (IF TESTS RECORDED) */}
        {userAttempts.length > 0 && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-xs"
                style={{ backgroundColor: currentUser.avatarColor }}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Welcome back, {currentUser.name}!
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {userAttempts.length} Tests Completed
                  </span>
                </div>
                {latestAttempt && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    Latest Exam: <strong>{latestAttempt.examTitle}</strong> &bull; Score:{' '}
                    <strong className="text-emerald-700">{latestAttempt.percentage}%</strong> &bull; Est. SAS:{' '}
                    <strong className="text-teal-700">{latestAttempt.estimatedSas}</strong> (Stanine{' '}
                    {latestAttempt.stanine})
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenFlashcards}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-300 font-bold text-xs transition-colors"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Quick Flashcards</span>
              </button>

              <button
                onClick={onOpenPerformance}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Analytics</span>
              </button>
            </div>
          </div>
        )}

        {/* HERO BANNER - GL Assessment Level C/D Official Simulator */}
        <div className="bg-gradient-to-r from-[#1E293B] via-slate-900 to-[#0F766E] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-700 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                GL Assessment Official Standard
              </span>
              <span className="text-xs text-slate-300">Level C/D &bull; Year 6 / Grade 5</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              CAT4 Full-Length 168-Question Exam Simulator
            </h2>

            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Official GL Assessment exam specifications across all 8 subtests with dedicated timers (10m, 10m, 8m, 8m, 10m, 8m, 9m, 9m), strict automatic section-locking, within-section question grids, and in-depth Stanine / SAS analytics.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartFull168Exam}
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2.5 text-sm"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Start Full 168-Question Exam</span>
              </button>

              <button
                onClick={onOpenFlashcards}
                className="px-5 py-3.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-extrabold rounded-2xl border border-amber-500/40 transition-colors flex items-center gap-2 text-sm shadow-md"
              >
                <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Quick Review Flashcards</span>
              </button>

              <button
                onClick={onOpenCustomTest}
                className="px-5 py-3.5 bg-[#0F766E] hover:bg-teal-700 text-white font-bold rounded-2xl border border-teal-500/40 transition-colors flex items-center gap-2 text-sm shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Custom Test</span>
              </button>

              <button
                onClick={onOpenPolicy}
                className="px-5 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 transition-colors flex items-center gap-2 text-sm shadow-md"
              >
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Policy</span>
              </button>

              <button
                onClick={onOpenQuestionBank}
                className="px-5 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 transition-colors flex items-center gap-2 text-sm shadow-md"
              >
                <Database className="w-4 h-4 text-teal-400" />
                <span>Bank ({questions.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* THE 4 CORE BATTERIES VISUAL CARDS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                The 4 Cognitive Batteries (GL Assessment Official Format)
              </h3>
              <p className="text-xs text-slate-500">
                8 subtests distributed across 3 official testing parts
              </p>
            </div>
            <a
              href="#cat4-guide-section"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>View Student Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Battery 1: Non-Verbal */}
            <div className="bg-white rounded-2xl p-6 border-2 border-pink-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-pink-600 bg-pink-50 px-2.5 py-1 rounded-md">
                    Part One &bull; 48 Qs
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19.439 7.85c0-1.57.802-2.85 2.14-2.85v-2a1 1 0 0 0-1-1h-2a2.85 2.85 0 0 0-2.85 2.14v0a2.85 2.85 0 0 1-5.46 0v0A2.85 2.85 0 0 0 7.42 2h-2a1 1 0 0 0-1 1v2c1.34 0 2.14 1.28 2.14 2.85s-.8 2.85-2.14 2.85v2a1 1 0 0 0 1 1h2a2.85 2.85 0 0 0 2.85-2.14v0a2.85 2.85 0 0 1 5.46 0v0A2.85 2.85 0 0 0 16.58 14h2a1 1 0 0 0 1-1v-2c-1.34 0-2.14-1.28-2.14-2.85z"/>
                    </svg>
                  </div>
                </div>

                <div className="text-2xl font-black text-pink-600 mb-1">Subtests 1 & 2</div>
                <h4 className="font-extrabold text-slate-900 text-lg">Non-Verbal Reasoning</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  <strong>Figure Classification</strong> (24 Qs | 10m) &bull; <strong>Figure Matrices</strong> (24 Qs | 10m).
                </p>
              </div>

              <button
                onClick={() => onStartExam([1, 2], 'Part 1: Non-Verbal Reasoning')}
                className="mt-6 w-full py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs transition-colors"
              >
                Practice Part 1 (48 Questions | 20m)
              </button>
            </div>

            {/* Battery 2: Verbal */}
            <div className="bg-white rounded-2xl p-6 border-2 border-amber-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                    Part Two &bull; 48 Qs
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="9" height="9" rx="1.5"/>
                      <rect x="13" y="3" width="9" height="9" rx="1.5"/>
                      <rect x="7.5" y="12" width="9" height="9" rx="1.5"/>
                      <path d="M5.5 8.5 L6.5 5.5 L7.5 8.5 M5.8 7.5 L7.2 7.5"/>
                    </svg>
                  </div>
                </div>

                <div className="text-2xl font-black text-amber-600 mb-1">Subtests 3 & 4</div>
                <h4 className="font-extrabold text-slate-900 text-lg">Verbal Reasoning</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  <strong>Verbal Classification</strong> (24 Qs | 8m) &bull; <strong>Verbal Analogies</strong> (24 Qs | 8m).
                </p>
              </div>

              <button
                onClick={() => onStartExam([3, 4], 'Part 2: Verbal Reasoning')}
                className="mt-6 w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition-colors"
              >
                Practice Verbal (48 Questions | 16m)
              </button>
            </div>

            {/* Battery 3: Quantitative */}
            <div className="bg-white rounded-2xl p-6 border-2 border-yellow-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-md">
                    Part Two &bull; 36 Qs
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-700">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <line x1="3" y1="8" x2="21" y2="8"/>
                      <line x1="3" y1="13" x2="21" y2="13"/>
                      <line x1="3" y1="18" x2="21" y2="18"/>
                      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                      <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
                      <circle cx="11" cy="18" r="1.5" fill="currentColor"/>
                    </svg>
                  </div>
                </div>

                <div className="text-2xl font-black text-yellow-600 mb-1">Subtests 5 & 6</div>
                <h4 className="font-extrabold text-slate-900 text-lg">Quantitative Reasoning</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  <strong>Number Analogies</strong> (18 Qs | 10m) &bull; <strong>Number Series</strong> (18 Qs | 8m).
                </p>
              </div>

              <button
                onClick={() => onStartExam([5, 6], 'Part 2: Quantitative Reasoning')}
                className="mt-6 w-full py-2.5 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-800 font-bold text-xs transition-colors"
              >
                Practice Quantitative (36 Qs | 18m)
              </button>
            </div>

            {/* Battery 4: Spatial */}
            <div className="bg-white rounded-2xl p-6 border-2 border-cyan-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md">
                    Part Three &bull; 36 Qs
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2 L2 12 L12 22 L22 12 Z"/>
                      <path d="M12 2 L12 22"/>
                    </svg>
                  </div>
                </div>

                <div className="text-2xl font-black text-cyan-600 mb-1">Subtests 7 & 8</div>
                <h4 className="font-extrabold text-slate-900 text-lg">Spatial Reasoning</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  <strong>Figure Analysis</strong> (18 Qs | 9m) &bull; <strong>Figure Recognition</strong> (18 Qs | 9m).
                </p>
              </div>

              <button
                onClick={() => onStartExam([7, 8], 'Part 3: Spatial Reasoning')}
                className="mt-6 w-full py-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 font-bold text-xs transition-colors"
              >
                Practice Spatial (36 Qs | 18m)
              </button>
            </div>
          </div>
        </div>

        {/* CURRICULUM EXAMS & QUICK REVIEW FLASHCARD CARDS */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-4">
            Curriculum Exams & Practice Packs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quick Review Flashcards Card */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 p-6 rounded-2xl border-2 border-amber-300 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-md uppercase flex items-center gap-1 w-max">
                  <Zap className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                  Flashcard Mode
                </span>
                <h4 className="font-extrabold text-amber-950 text-base mt-2">
                  'Quick Review' Pattern Flashcards
                </h4>
                <p className="text-xs text-amber-900/80 mt-1">
                  Fast-paced 3D flip card drills for spontaneous pattern memorization. Flip with spacebar, track your streak, and master difficult questions!
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-2 border-t border-amber-200">
                <span className="text-xs text-amber-800 font-bold">188 Cards in Bank</span>
                <button
                  onClick={onOpenFlashcards}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-transform shadow-sm hover:scale-105 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Flashcards</span>
                </button>
              </div>
            </div>

            {/* Science Olympiad */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md uppercase">
                  STEM Olympiad
                </span>
                <h4 className="font-bold text-slate-900 text-base mt-2">
                  Science & Applied Math Reasoning
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Circuits, mechanical levers, photosynthesis, proportions, probability, and physics forces.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">10 Questions &bull; 10 Mins</span>
                <button
                  onClick={() => onStartExam([9], 'Science & Applied Math Reasoning')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  Start Science Test
                </button>
              </div>
            </div>

            {/* Custom Test Builder Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-teal-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md uppercase flex items-center gap-1 w-max">
                  <PlusCircle className="w-3.5 h-3.5" />
                  Custom Test Builder
                </span>
                <h4 className="font-bold text-slate-900 text-base mt-2">
                  Create Custom Exam with Uploaded Questions
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Mix your uploaded questions with the default bank. Select specific subtests, set custom timer, and choose display order.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-teal-700 font-semibold">User Uploads Supported</span>
                <button
                  onClick={onOpenCustomTest}
                  className="px-4 py-2 bg-[#0F766E] hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  Configure Test
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* EDUCATIONAL GUIDE SECTION (From Merryland International School Preparation Guide) */}
        <div
          id="cat4-guide-section"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                What Is the CAT4? Student Support & Preparation Guide
              </h3>
              <p className="text-xs text-slate-500">
                Key principles from Merryland International School & GL Assessment Standards
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            The Cognitive Abilities Test, Fourth Edition (CAT4) is not a test of what you’ve memorized in class. It measures <strong>how you think and reason</strong> — your natural problem-solving abilities across four different areas, called <em>"batteries."</em> Because it isn’t tied to a specific curriculum, you can’t cram for it the night before. What you <strong>can</strong> do is get comfortable with the question styles, so nothing on test day feels unfamiliar or surprising.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Verbal Reasoning Tips
              </h5>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Read widely — varied vocabulary is your biggest advantage here.</li>
                <li>When stuck, say the relationship out loud in a full sentence before picking an answer.</li>
                <li>Practice grouping everyday objects by category to sharpen classification.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-600" />
                Quantitative Reasoning Tips
              </h5>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Practice mental maths daily (+, -, ×, ÷) for computational speed.</li>
                <li>Always check for repeating or alternating patterns (+2, ×3, alternating -1, +4).</li>
                <li>Work without a calculator to build confidence doing quick sums in your head.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-500" />
                Non-Verbal Reasoning Tips
              </h5>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Practice noticing changes in size, shading, rotation, and number of sides.</li>
                <li>Cover part of a pattern and predict what comes next before looking at choices.</li>
                <li>Jigsaws, tangrams, and pattern-block games naturally build these skills.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                Spatial Reasoning Tips
              </h5>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Practice with real paper: fold, punch a hole, guess the pattern, then unfold.</li>
                <li>Build with blocks, LEGO, or origami to strengthen 3D visualization.</li>
                <li>Mentally rotate everyday objects around you (a mug, a box) from other angles.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-0.5">Golden Test Day Rule:</strong>
              Remember: the goal isn’t a "perfect score" — it’s showing your genuine thinking style. Read each question carefully, move on if a question feels hard and return later, and go in rested, calm, and curious!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
