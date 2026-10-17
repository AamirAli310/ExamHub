import React from 'react';
import { ExamPolicy, UserProfile } from '../types/exam';
import { Sliders, Database, Layers, BarChart2, PlusCircle, Sparkles } from 'lucide-react';

interface HeaderProps {
  policy: ExamPolicy;
  currentUser: UserProfile;
  questionCount: number;
  currentView: string;
  onOpenPolicy: () => void;
  onOpenQuestionBank: () => void;
  onOpenProfile: () => void;
  onOpenPerformance: () => void;
  onOpenCustomTest: () => void;
  onOpenFlashcards: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  policy,
  currentUser,
  questionCount,
  currentView,
  onOpenPolicy,
  onOpenQuestionBank,
  onOpenProfile,
  onOpenPerformance,
  onOpenCustomTest,
  onOpenFlashcards,
  onGoHome,
}) => {
  const isExamView = currentView === 'exam';

  return (
    <header className={`${policy.theme.headerBg} border-b border-slate-700 text-white shadow-md transition-colors duration-300 z-30 sticky top-0`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          onClick={isExamView ? undefined : onGoHome}
          className={`flex items-center gap-3 ${!isExamView ? 'cursor-pointer group' : ''}`}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center font-black text-white text-xl shadow-md transform group-hover:scale-105 transition-transform">
            CAT4
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight leading-tight">
                Exam Simulator
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                GL OFFICIAL
              </span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-1">
              <span>{policy.organization || 'GL Assessment Standard'}</span>
              <span>&bull;</span>
              <span className="text-slate-400">Level C/D & STEM</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-semibold">
          {/* Quick Review Flashcards Button */}
          {!isExamView && (
            <button
              onClick={onOpenFlashcards}
              title="Quick Review Flashcard Mode (Pattern Memorization)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-extrabold transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Flashcards</span>
            </button>
          )}

          {/* User Profile Pill */}
          <button
            onClick={onOpenProfile}
            title="Switch or Register Student Profile"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 transition-all text-slate-200"
          >
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black text-white"
              style={{ backgroundColor: currentUser.avatarColor }}
            >
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <span className="max-w-[100px] truncate">{currentUser.name}</span>
          </button>

          {/* Performance Dashboard */}
          <button
            onClick={onOpenPerformance}
            title="View Student Performance History & Weak Spots"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 transition-all text-slate-200"
          >
            <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Analytics</span>
          </button>

          {/* Create Custom Test */}
          {!isExamView && (
            <button
              onClick={onOpenCustomTest}
              title="Create Custom Test (Mix Uploaded Questions & Bank)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F766E] hover:bg-teal-700 border border-teal-600 text-white font-bold transition-all shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Test</span>
            </button>
          )}

          {/* Active Policy Pill */}
          <button
            onClick={onOpenPolicy}
            title="Configure Exam Policy (Timer, Strict Locking, Theme)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 transition-all text-slate-200"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Policy:</span>
            <span className="text-amber-300 max-w-[120px] truncate">{policy.name}</span>
          </button>

          {/* Question Bank Pill */}
          <button
            onClick={onOpenQuestionBank}
            title="Manage Question Bank & Upload Spreadsheets/Text"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 transition-all text-slate-200"
          >
            <Database className="w-3.5 h-3.5 text-teal-400" />
            <span>Bank:</span>
            <span className="bg-teal-900/60 text-teal-200 px-1.5 py-0.2 rounded font-bold">
              {questionCount}
            </span>
          </button>

          {!isExamView && (
            <button
              onClick={onGoHome}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 transition-all text-slate-200"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
