import React, { useState } from 'react';
import {
  Question,
  ExamCategory,
  ComplexityLevel,
  COMPLEXITY_LEVELS_META,
} from '../types/exam';
import { SUBTESTS_META } from '../data/defaultPolicies';
import {
  sampleUniqueQuestionsForSubtests,
  shuffleArray,
} from '../data/questionGenerator';
import {
  X,
  Play,
  Layers,
  Clock,
  Shuffle,
  CheckSquare,
  Sparkles,
  Target,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

interface CustomTestCreatorModalProps {
  allQuestions: Question[];
  isOpen: boolean;
  onClose: () => void;
  onLaunchCustomTest: (
    selectedQuestions: Question[],
    customTitle: string,
    customMinutes: number,
    isRandomized: boolean,
    complexityLabel?: string
  ) => void;
}

export const CustomTestCreatorModal: React.FC<CustomTestCreatorModalProps> = ({
  allQuestions,
  isOpen,
  onClose,
  onLaunchCustomTest,
}) => {
  const [testTitle, setTestTitle] = useState('Custom Diagnostic Practice');
  const [selectedExamType, setSelectedExamType] = useState<ExamCategory>('CAT4');
  const [questionSource, setQuestionSource] = useState<'both' | 'uploaded' | 'default'>('both');
  const [selectedSubtestIds, setSelectedSubtestIds] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);
  const [questionCount, setQuestionCount] = useState<number>(24);
  const [durationMinutes, setDurationMinutes] = useState<number>(20);
  const [isRandomized, setIsRandomized] = useState<boolean>(true);

  // Complexity Controls with 3-tier Linking Hierarchy
  const [globalComplexity, setGlobalComplexity] = useState<ComplexityLevel | 'Mixed'>('Mixed');
  const [linkingMode, setLinkingMode] = useState<'module' | 'section' | 'subsection'>('module');
  const [sectionComplexity, setSectionComplexity] = useState<
    Record<string, ComplexityLevel | 'Inherit'>
  >({
    'Non-Verbal': 'Inherit',
    'Verbal': 'Inherit',
    'Quantitative': 'Inherit',
    'Spatial': 'Inherit',
    'Science & Math': 'Inherit',
  });
  const [subtestComplexityOverrides, setSubtestComplexityOverrides] = useState<
    Record<number, ComplexityLevel | 'Inherit'>
  >({});

  if (!isOpen) return null;

  const uploadedCount = allQuestions.filter((q) => q.isCustomUploaded).length;
  const defaultCount = allQuestions.filter((q) => !q.isCustomUploaded).length;

  const toggleSubtest = (id: number) => {
    if (selectedSubtestIds.includes(id)) {
      if (selectedSubtestIds.length > 1) {
        setSelectedSubtestIds(selectedSubtestIds.filter((sId) => sId !== id));
      }
    } else {
      setSelectedSubtestIds([...selectedSubtestIds, id]);
    }
  };

  const handleSelectAllSubtests = () => {
    setSelectedSubtestIds([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  };

  const handleSelectCat4Only = () => {
    setSelectedSubtestIds([1, 2, 3, 4, 5, 6, 7, 8]);
  };

  const handleSubtestComplexityChange = (
    subId: number,
    level: ComplexityLevel | 'Inherit'
  ) => {
    setSubtestComplexityOverrides((prev) => ({
      ...prev,
      [subId]: level,
    }));
  };

  const handleSectionComplexityChange = (
    sectionKey: string,
    level: ComplexityLevel | 'Inherit'
  ) => {
    setSectionComplexity((prev) => ({
      ...prev,
      [sectionKey]: level,
    }));
  };

  // Compile effective overrides based on linkingMode
  const compileEffectiveOverrides = (): Record<number, ComplexityLevel | 'Inherit'> => {
    const overrides: Record<number, ComplexityLevel | 'Inherit'> = {};
    for (const sId of selectedSubtestIds) {
      if (linkingMode === 'module') {
        overrides[sId] = 'Inherit';
      } else if (linkingMode === 'section') {
        const sub = SUBTESTS_META.find((s) => s.id === sId);
        const secLevel = sub ? sectionComplexity[sub.battery] : 'Inherit';
        overrides[sId] = secLevel || 'Inherit';
      } else if (linkingMode === 'subsection') {
        overrides[sId] = subtestComplexityOverrides[sId] || 'Inherit';
      }
    }
    return overrides;
  };

  const handleLaunch = () => {
    // Filter questions based on configuration
    let pool = allQuestions.filter((q) => selectedSubtestIds.includes(q.subtestId));

    if (questionSource === 'uploaded') {
      pool = pool.filter((q) => q.isCustomUploaded);
      if (pool.length === 0) {
        alert(
          'You have no uploaded questions in the selected subtests. Please upload questions first or choose "Mix of both".'
        );
        return;
      }
    } else if (questionSource === 'default') {
      pool = pool.filter((q) => !q.isCustomUploaded);
    }

    if (pool.length === 0) {
      alert('No questions match your selected criteria. Please select at least one subtest with questions.');
      return;
    }

    const effectiveOverrides = compileEffectiveOverrides();

    // Sample unique questions respecting complexity parameters
    const perSubCount = Math.ceil(questionCount / selectedSubtestIds.length);
    const sampled = sampleUniqueQuestionsForSubtests(
      pool,
      selectedSubtestIds,
      perSubCount,
      globalComplexity,
      effectiveOverrides
    );

    let finalSelection = isRandomized ? shuffleArray(sampled) : sampled;
    if (questionCount > 0 && finalSelection.length > questionCount) {
      finalSelection = finalSelection.slice(0, questionCount);
    }

    const complexitySummary =
      linkingMode === 'subsection'
        ? 'Custom Subsection Levels'
        : linkingMode === 'section'
        ? 'Custom Section Levels'
        : globalComplexity !== 'Mixed'
        ? COMPLEXITY_LEVELS_META[globalComplexity].shortLabel
        : 'Balanced Standards';

    onLaunchCustomTest(
      finalSelection,
      testTitle,
      durationMinutes,
      isRandomized,
      complexitySummary
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1E293B] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Custom Test & Assessment Creator</h2>
              <p className="text-xs text-slate-300">
                Configure complexity levels, subtest weights, timers, and question sources
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
        <div className="p-6 overflow-y-auto flex-grow space-y-5 text-xs">
          {/* Test Name & Exam Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Custom Test Name</label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Exam Category Target</label>
              <select
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value as ExamCategory)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium text-xs"
              >
                <option value="CAT4">CAT4 Cognitive Abilities</option>
                <option value="Science">Science & STEM Olympiad</option>
                <option value="Math">Math Problem Solving</option>
                <option value="GL">GL Assessment 11+</option>
                <option value="Custom">Custom Mixed Exam</option>
              </select>
            </div>
          </div>

          {/* LEVEL OF COMPLEXITY CONFIGURATION */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-teal-700" />
                <span className="font-extrabold text-slate-900 text-xs">
                  Level of Complexity (International Standards)
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                {(
                  [
                    { id: 'module', label: 'Main Module' },
                    { id: 'section', label: 'Section Level' },
                    { id: 'subsection', label: 'Subsection Level' },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setLinkingMode(mode.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      linkingMode === mode.id
                        ? 'bg-teal-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Global Complexity Picker */}
            <div>
              <div className="text-[11px] text-slate-500 mb-1.5">
                {linkingMode === 'module'
                  ? 'Main Module Level (Applies uniformly to all selected sections):'
                  : 'Base Fallback Level (Applied to sections/subsections set to Inherit):'}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                <button
                  type="button"
                  onClick={() => setGlobalComplexity('Mixed')}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    globalComplexity === 'Mixed'
                      ? 'border-teal-600 bg-teal-600 text-white font-black shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs">Mixed</div>
                  <div className="text-[9px] opacity-80">Balanced (1-4)</div>
                </button>

                {(['Beginner', 'Standard', 'Advanced', 'Expert'] as ComplexityLevel[]).map(
                  (lvl) => {
                    const meta = COMPLEXITY_LEVELS_META[lvl];
                    const isSelected = globalComplexity === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setGlobalComplexity(lvl)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'border-teal-600 bg-teal-600 text-white font-black shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-bold text-xs">{meta.shortLabel}</div>
                        <div className="text-[9px] opacity-80">
                          {lvl === 'Beginner'
                            ? 'Foundation'
                            : lvl === 'Standard'
                            ? 'Intermediate'
                            : lvl === 'Advanced'
                            ? 'Proficient'
                            : 'Mastery'}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>

              {globalComplexity !== 'Mixed' && (
                <p className="text-[11px] text-slate-500 mt-2 bg-white p-2 rounded-xl border border-slate-200">
                  <strong>{COMPLEXITY_LEVELS_META[globalComplexity].label}:</strong>{' '}
                  {COMPLEXITY_LEVELS_META[globalComplexity].intlDescriptor}
                </p>
              )}
            </div>

            {/* Section (Battery) Level Overrides */}
            {linkingMode === 'section' && (
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <div className="text-[11px] font-bold text-slate-700">
                  Configure Complexity by Section (Battery):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Non-Verbal', 'Verbal', 'Quantitative', 'Spatial', 'Science & Math'].map(
                    (battery) => (
                      <div
                        key={battery}
                        className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200"
                      >
                        <span className="font-bold text-slate-800 text-[11px]">{battery}</span>
                        <select
                          value={sectionComplexity[battery] || 'Inherit'}
                          onChange={(e) =>
                            handleSectionComplexityChange(
                              battery,
                              e.target.value as ComplexityLevel | 'Inherit'
                            )
                          }
                          className="py-1 px-2 text-[10px] font-bold bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                        >
                          <option value="Inherit">Inherit ({globalComplexity})</option>
                          <option value="Beginner">Beginner (Foundation)</option>
                          <option value="Standard">Standard (Intermediate)</option>
                          <option value="Advanced">Advanced (Proficient)</option>
                          <option value="Expert">Expert (Mastery)</option>
                        </select>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Subtest Selection Grid & Optional Per-Subtest Level Linking */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-700">
                Select Included Subtests & Topic Weights
              </label>
              <div className="flex gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={handleSelectCat4Only}
                  className="text-teal-700 hover:underline font-semibold"
                >
                  CAT4 8 Subtests
                </button>
                <span className="text-slate-300">&bull;</span>
                <button
                  type="button"
                  onClick={handleSelectAllSubtests}
                  className="text-teal-700 hover:underline font-semibold"
                >
                  All (incl. Science/Math)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUBTESTS_META.map((sub) => {
                const isChecked = selectedSubtestIds.includes(sub.id);
                const currentOverride = subtestComplexityOverrides[sub.id] || 'Inherit';

                return (
                  <div
                    key={sub.id}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isChecked
                        ? 'border-teal-600 bg-teal-50/70'
                        : 'border-slate-200 bg-white opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleSubtest(sub.id)}
                        className="flex items-center gap-2 text-left flex-grow"
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-teal-600 border-teal-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <CheckSquare className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {sub.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            Subtest {sub.id} &bull; {sub.battery}
                          </div>
                        </div>
                      </button>

                      {/* Per-Subtest Complexity Dropdown if Subsection Linking Enabled */}
                      {linkingMode === 'subsection' && isChecked && (
                        <select
                          value={currentOverride}
                          onChange={(e) =>
                            handleSubtestComplexityChange(
                              sub.id,
                              e.target.value as ComplexityLevel | 'Inherit'
                            )
                          }
                          className="py-1 px-2 text-[10px] font-bold bg-white border border-slate-300 rounded-lg text-slate-700 ml-2"
                        >
                          <option value="Inherit">Inherit ({globalComplexity})</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Standard">Standard</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Source Selection */}
          <div>
            <label className="block font-bold text-slate-700 mb-2">Question Source Repository</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  id: 'both',
                  label: 'Mix Both',
                  desc: `${defaultCount} Default + ${uploadedCount} Uploaded`,
                },
                {
                  id: 'uploaded',
                  label: 'My Uploads Only',
                  desc: `${uploadedCount} custom questions`,
                },
                {
                  id: 'default',
                  label: 'Default Bank Only',
                  desc: `${defaultCount} official questions`,
                },
              ].map((src) => (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => setQuestionSource(src.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    questionSource === src.id
                      ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{src.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{src.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Timing, Count & Shuffling Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                Question Count
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-xs"
              >
                <option value={10}>10 Questions (Quick Quiz)</option>
                <option value={20}>20 Questions (Standard Drill)</option>
                <option value={40}>40 Questions (Deep Diagnostic)</option>
                <option value={80}>80 Questions (Half Mock)</option>
                <option value={168}>168 Questions (Full Mock)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Time Limit (Minutes)
              </label>
              <input
                type="number"
                min={2}
                max={180}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 20)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Shuffle className="w-3.5 h-3.5 text-slate-400" />
                Display Order
              </label>
              <select
                value={isRandomized ? 'random' : 'sequential'}
                onChange={(e) => setIsRandomized(e.target.value === 'random')}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-xs"
              >
                <option value="random">Randomized / Shuffled</option>
                <option value="sequential">Sequential by Subtest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold text-xs hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleLaunch}
            className="px-6 py-2.5 bg-[#0F766E] hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs transition-transform shadow-md hover:scale-105 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Custom Test Simulator</span>
          </button>
        </div>
      </div>
    </div>
  );
};
