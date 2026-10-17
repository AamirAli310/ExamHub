import React, { useState, useEffect } from 'react';
import { DetailedResults } from '../utils/examEngine';
import { ExamPolicy } from '../types/exam';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Clock,
  RotateCcw,
  Home,
  Printer,
  CheckCircle2,
  XCircle,
  Flag,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ExamResultsProps {
  results: DetailedResults;
  policy: ExamPolicy;
  onRetake: () => void;
  onGoHome: () => void;
}

export const ExamResults: React.FC<ExamResultsProps> = ({
  results,
  policy,
  onRetake,
  onGoHome,
}) => {
  const [filterReview, setFilterReview] = useState<'all' | 'incorrect' | 'flagged'>('all');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Trigger celebration confetti on mount if score is good!
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  const filteredQuestions = results.questionResults.filter((r) => {
    if (filterReview === 'incorrect') return !r.isCorrect;
    if (filterReview === 'flagged') return r.isFlagged;
    return true;
  });

  const avgTimePerQuestion =
    results.totalAnswered > 0
      ? Math.round(results.timeSpentTotalSeconds / results.totalAnswered)
      : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-grow overflow-y-auto bg-slate-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Banner / Score Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-700 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {policy.organization || 'GL Assessment Standard'}
                </span>
                <span className="text-xs text-slate-400">Diagnostic Summary</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Exam Performance Analytics
              </h2>
              <p className="text-slate-300 text-sm mt-1 max-w-xl">
                Comprehensive diagnostic report calibrated to CAT4 Standard Age Score (SAS) and Stanine benchmarks across all cognitive batteries.
              </p>
            </div>

            {/* Score Pill */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-5 shrink-0 shadow-lg">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-amber-400">
                  {results.rawPercentage}%
                </div>
                <div className="text-xs text-slate-300 font-semibold mt-1">
                  Accuracy ({results.totalCorrect}/{results.totalQuestions})
                </div>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-extrabold text-teal-300">
                  {results.overallSas}
                </div>
                <div className="text-xs text-slate-300 font-semibold mt-1">Est. SAS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Metric Cards (Stanine, SAS, Percentile, Speed) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stanine */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
              <span>STANINE SCORE</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">
                Stanine {results.overallStanine}
              </div>
              <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                {results.overallDescriptor}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
              Standard UK 1-9 scale where 5 is average
            </p>
          </div>

          {/* Standard Age Score (SAS) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
              <span>STANDARD AGE SCORE</span>
              <Award className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{results.overallSas}</div>
              <div className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md inline-block mt-1">
                Scale 69 - 141 (Mean 100)
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
              National standardized ability score
            </p>
          </div>

          {/* National Percentile Rank */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
              <span>NATIONAL PERCENTILE</span>
              <Sparkles className="w-4 h-4 text-indigo-500" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">
                {results.nprPercentile}th
              </div>
              <div className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mt-1">
                Top {100 - results.nprPercentile}% of Peers
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
              Estimated national cohort standing
            </p>
          </div>

          {/* Time & Pace */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
              <span>PACING & TIME</span>
              <Clock className="w-4 h-4 text-sky-500" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{avgTimePerQuestion}s</div>
              <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-1">
                {Math.round(results.timeSpentTotalSeconds / 60)} mins total elapsed
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
              Target for GL exams: ~45-60s per item
            </p>
          </div>
        </div>

        {/* Battery-by-Battery Performance Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            Cognitive Battery Diagnostic Breakdown
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Detailed performance across each core reasoning area as defined in the CAT4 curriculum
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(results.batteryStats).map((bName) => {
              const stat = results.batteryStats[bName];
              return (
                <div
                  key={bName}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-extrabold text-slate-900 text-sm">{bName} Reasoning</h4>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      Stanine {stat.stanine}
                    </span>
                  </div>

                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <span className="text-2xl font-black text-slate-900">
                        {stat.correct} / {stat.total}
                      </span>
                      <span className="text-xs text-slate-500 ml-1.5 font-medium">Correct</span>
                    </div>
                    <span className="text-sm font-bold text-teal-700">{stat.percentage}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Est. SAS: {stat.estimatedSas}</span>
                    <span>{stat.descriptor}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Question Review Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Question-by-Question Review</h3>
              <p className="text-xs text-slate-500">
                Inspect cognitive rules, step-by-step logic, and correct options for all test items
              </p>
            </div>

            {/* Review Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
              <button
                onClick={() => setFilterReview('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterReview === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                All ({results.questionResults.length})
              </button>
              <button
                onClick={() => setFilterReview('incorrect')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterReview === 'incorrect'
                    ? 'bg-red-500 text-white shadow-xs'
                    : 'hover:text-slate-900 text-red-600'
                }`}
              >
                Mistakes ({results.questionResults.filter((q) => !q.isCorrect).length})
              </button>
              <button
                onClick={() => setFilterReview('flagged')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterReview === 'flagged'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Flagged ({results.questionResults.filter((q) => q.isFlagged).length})
              </button>
            </div>
          </div>

          {/* List of Review Items */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs">
                No items match this filter category.
              </div>
            ) : (
              filteredQuestions.map((res, index) => {
                const q = res.question;
                const isExpanded = expandedQuestion === q.id || filterReview === 'incorrect';

                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border-2 transition-all overflow-hidden ${
                      res.isCorrect
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-red-200 bg-red-50/20'
                    }`}
                  >
                    {/* Header line */}
                    <div
                      onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                      className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            res.isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                          }`}
                        >
                          {res.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              Question #{index + 1} &bull; {q.battery} ({q.subtestName})
                            </span>
                            {res.isFlagged && (
                              <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                                <Flag className="w-3 h-3 fill-amber-500 text-amber-500" />
                                Flagged
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm line-clamp-1 mt-0.5">
                            {q.stem}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <span
                          className={`px-2.5 py-1 rounded-lg ${
                            res.isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          Your Ans: {res.userAnswer || 'Blank'} | Correct: {q.correctAnswer}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-200/80 text-xs space-y-4">
                        {q.diagramSvg && (
                          <div
                            className="p-3 bg-white rounded-xl border border-slate-200 max-w-md mx-auto flex justify-center"
                            dangerouslySetInnerHTML={{ __html: q.diagramSvg }}
                          />
                        )}

                        {/* Options comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt) => {
                            const isUserPick = opt.label === res.userAnswer;
                            const isCorrectOpt = opt.label === q.correctAnswer;

                            let optStyle = 'border-slate-200 bg-white text-slate-700';
                            if (isCorrectOpt) {
                              optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                            } else if (isUserPick && !isCorrectOpt) {
                              optStyle = 'border-red-400 bg-red-50 text-red-950 font-bold';
                            }

                            return (
                              <div
                                key={opt.label}
                                className={`p-3 rounded-xl border-2 flex items-center gap-2.5 ${optStyle}`}
                              >
                                <span
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                                    isCorrectOpt
                                      ? 'bg-emerald-600 text-white'
                                      : isUserPick
                                      ? 'bg-red-500 text-white'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {opt.label}
                                </span>
                                <span>{opt.text}</span>
                                {isCorrectOpt && (
                                  <span className="ml-auto text-emerald-600 font-bold">✓ Correct</span>
                                )}
                                {isUserPick && !isCorrectOpt && (
                                  <span className="ml-auto text-red-600 font-bold">✗ Selected</span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation Box */}
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="font-bold text-slate-800 block text-xs">
                            Step-by-Step Cognitive Rule & Explanation:
                          </span>
                          <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
                          {q.hint && (
                            <p className="text-amber-800 bg-amber-50/80 p-2 rounded-lg mt-2 text-[11px] font-medium border border-amber-200">
                              <strong>Exam Strategy Tip:</strong> {q.hint}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-12">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 font-bold text-xs text-slate-800 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Diagnostic Report</span>
            </button>

            <button
              onClick={onRetake}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 font-bold text-xs text-slate-950 transition-transform shadow-md hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Exam Simulator</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
