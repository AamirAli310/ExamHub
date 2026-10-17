import React, { useState } from 'react';
import { UserProfile, TestAttempt } from '../types/exam';
import {
  X,
  TrendingUp,
  Award,
  AlertCircle,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BarChart3,
  Target,
} from 'lucide-react';

interface PerformanceDashboardModalProps {
  currentUser: UserProfile;
  attempts: TestAttempt[];
  isOpen: boolean;
  onClose: () => void;
  onStartTargetedPractice: (subtestIds: number[]) => void;
}

export const PerformanceDashboardModal: React.FC<PerformanceDashboardModalProps> = ({
  currentUser,
  attempts,
  isOpen,
  onClose,
  onStartTargetedPractice,
}) => {
  const [filterExamType, setFilterExamType] = useState<string>('all');

  if (!isOpen) return null;

  // Filter attempts for this user
  const userAttempts = attempts.filter((a) => a.userId === currentUser.id);

  const filteredAttempts = userAttempts.filter(
    (a) => filterExamType === 'all' || a.examType === filterExamType
  );

  // Overall analytics calculations
  const totalCompleted = userAttempts.length;
  const avgPercentage =
    totalCompleted > 0
      ? Math.round(userAttempts.reduce((acc, cur) => acc + cur.percentage, 0) / totalCompleted)
      : 0;
  const avgSas =
    totalCompleted > 0
      ? Math.round(userAttempts.reduce((acc, cur) => acc + cur.estimatedSas, 0) / totalCompleted)
      : 0;

  // Aggregate areas needing improvement across all attempts
  const weakSpotCounts: Record<string, number> = {};
  userAttempts.forEach((att) => {
    att.weakestAreas?.forEach((area) => {
      weakSpotCounts[area] = (weakSpotCounts[area] || 0) + 1;
    });
  });

  const sortedWeakSpots = Object.entries(weakSpotCounts).sort((a, b) => b[1] - a[1]);

  // Exam category performance summary
  const categories = ['CAT4', 'Science', 'Math', 'GL'] as const;
  const categoryStats = categories.map((cat) => {
    const catAtts = userAttempts.filter((a) => a.examType === cat);
    const count = catAtts.length;
    const avgScore =
      count > 0 ? Math.round(catAtts.reduce((sum, a) => sum + a.percentage, 0) / count) : null;
    return { category: cat, count, avgScore };
  });

  // Map weak spot names to subtest IDs for targeted drill
  const getSubtestIdsForWeakArea = (areaName: string): number[] => {
    const lower = areaName.toLowerCase();
    if (lower.includes('figure classification')) return [1];
    if (lower.includes('figure matrices')) return [2];
    if (lower.includes('non-verbal')) return [1, 2];
    if (lower.includes('verbal classification')) return [3];
    if (lower.includes('verbal analogies')) return [4];
    if (lower.includes('verbal')) return [3, 4];
    if (lower.includes('number analogies')) return [5];
    if (lower.includes('number series')) return [6];
    if (lower.includes('quantitative')) return [5, 6];
    if (lower.includes('figure analysis') || lower.includes('hole punch')) return [7];
    if (lower.includes('figure recognition') || lower.includes('hidden')) return [8];
    if (lower.includes('spatial')) return [7, 8];
    if (lower.includes('science') || lower.includes('circuit')) return [9];
    return [1, 2, 3, 4, 5, 6, 7, 8];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1E293B] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Student Performance & Diagnostic Dashboard</h2>
              <p className="text-xs text-slate-300">
                Progress portfolio for {currentUser.name} ({currentUser.gradeLevel || 'Grade 5 / Year 6'})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Completed Tests
              </span>
              <div className="text-2xl font-black text-slate-900">{totalCompleted}</div>
              <span className="text-[10px] text-slate-400">Total verified sessions</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Average Score
              </span>
              <div className="text-2xl font-black text-teal-700">{avgPercentage}%</div>
              <span className="text-[10px] text-slate-400">Across all exams</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Average Est. SAS
              </span>
              <div className="text-2xl font-black text-amber-600">{avgSas || '—'}</div>
              <span className="text-[10px] text-slate-400">Standard Age Score (100 mean)</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Exam Readiness
              </span>
              <div className="text-2xl font-black text-emerald-600">
                {avgPercentage >= 75 ? 'Strong' : avgPercentage >= 60 ? 'Moderate' : 'Developing'}
              </div>
              <span className="text-[10px] text-slate-400">Based on GL benchmarks</span>
            </div>
          </div>

          {/* Category Scores Overview */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-teal-600" />
              Performance by Exam Curriculum
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categoryStats.map((c) => (
                <div key={c.category} className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-800">{c.category}</span>
                    <span className="text-[10px] text-slate-400">{c.count} tests</span>
                  </div>
                  <div className="text-xl font-black text-slate-900">
                    {c.avgScore !== null ? `${c.avgScore}%` : 'Not Taken'}
                  </div>
                  {c.avgScore !== null && (
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-teal-600 rounded-full"
                        style={{ width: `${c.avgScore}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AREAS NEEDING IMPROVEMENT (Diagnostic Growth Focus) */}
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Targeted Areas Needing Improvement
              </h3>
              <span className="text-xs text-amber-800 font-medium">
                Identified from subtests scoring under 65%
              </span>
            </div>

            {sortedWeakSpots.length === 0 ? (
              <div className="bg-white p-4 rounded-xl border border-amber-200 text-xs text-slate-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>
                  {userAttempts.length === 0
                    ? 'Take your first exam to identify specific reasoning strengths and diagnostic growth areas!'
                    : 'Great performance! No persistent weak spots detected across your recent tests.'}
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sortedWeakSpots.map(([area, count]) => {
                  const targetSubtestIds = getSubtestIdsForWeakArea(area);
                  return (
                    <div
                      key={area}
                      className="bg-white p-3.5 rounded-xl border border-amber-200 flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{area}</h4>
                        <span className="text-[10px] text-amber-800">
                          Flagged in {count} assessment{count > 1 ? 's' : ''}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onStartTargetedPractice(targetSubtestIds);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 transition-transform hover:scale-105"
                      >
                        <span>Drill This Area</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Test History Chronological Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-slate-600" />
                Historical Exam Attempts & Records
              </h3>

              <div className="flex gap-1 text-xs">
                {['all', 'CAT4', 'Science', 'Math', 'GL'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterExamType(filter)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      filterExamType === filter
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter}
                  </button>
                ))}
              </div>
            </div>

            {filteredAttempts.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs">
                No past exam attempts found under this filter. Complete an exam to record your history!
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {filteredAttempts.map((att) => (
                  <div
                    key={att.id}
                    className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-xs transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-extrabold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 text-[10px]">
                          {att.examType}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{att.examTitle}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(att.timestamp).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.round(att.durationSeconds / 60)} mins
                        </span>
                        <span>{att.totalQuestions} Questions</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-base font-black text-slate-900">{att.percentage}%</div>
                        <div className="text-[10px] text-slate-500">
                          {att.correctAnswers}/{att.totalQuestions} Correct
                        </div>
                      </div>

                      <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-center">
                        <div className="font-black text-xs">SAS {att.estimatedSas}</div>
                        <div className="text-[9px] font-semibold text-slate-500">
                          Stanine {att.stanine}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Logged in as: <strong className="text-slate-800">{currentUser.name}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xs transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
