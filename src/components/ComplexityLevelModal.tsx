import React, { useState } from 'react';
import {
  ComplexityLevel,
  COMPLEXITY_LEVELS_META,
  BatteryType,
} from '../types/exam';
import { SUBTESTS_META } from '../data/defaultPolicies';
import {
  Target,
  X,
  Play,
  Layers,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

export type ComplexityLinkingMode = 'module' | 'section' | 'subsection';

export interface SectionComplexityConfig {
  'Non-Verbal': ComplexityLevel | 'Inherit';
  'Verbal': ComplexityLevel | 'Inherit';
  'Quantitative': ComplexityLevel | 'Inherit';
  'Spatial': ComplexityLevel | 'Inherit';
  'Science & Math': ComplexityLevel | 'Inherit';
}

interface ComplexityLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGlobalLevel?: ComplexityLevel | 'Mixed';
  initialLinkingMode?: ComplexityLinkingMode;
  initialSectionLevels?: SectionComplexityConfig;
  initialSubsectionLevels?: Record<number, ComplexityLevel | 'Inherit'>;
  onLaunchExamWithComplexity: (
    globalLevel: ComplexityLevel | 'Mixed',
    subtestOverrides: Record<number, ComplexityLevel | 'Inherit'>,
    linkingModeSummary: string
  ) => void;
}

export const ComplexityLevelModal: React.FC<ComplexityLevelModalProps> = ({
  isOpen,
  onClose,
  initialGlobalLevel = 'Mixed',
  initialLinkingMode = 'module',
  initialSectionLevels,
  initialSubsectionLevels,
  onLaunchExamWithComplexity,
}) => {
  const [globalLevel, setGlobalLevel] = useState<ComplexityLevel | 'Mixed'>(initialGlobalLevel);
  const [linkingMode, setLinkingMode] = useState<ComplexityLinkingMode>(initialLinkingMode);

  const [sectionLevels, setSectionLevels] = useState<SectionComplexityConfig>(() => ({
    'Non-Verbal': initialSectionLevels?.['Non-Verbal'] || 'Inherit',
    'Verbal': initialSectionLevels?.['Verbal'] || 'Inherit',
    'Quantitative': initialSectionLevels?.['Quantitative'] || 'Inherit',
    'Spatial': initialSectionLevels?.['Spatial'] || 'Inherit',
    'Science & Math': initialSectionLevels?.['Science & Math'] || 'Inherit',
  }));

  const [subsectionLevels, setSubsectionLevels] = useState<
    Record<number, ComplexityLevel | 'Inherit'>
  >(() => initialSubsectionLevels || {});

  if (!isOpen) return null;

  const batteryKeys: (keyof SectionComplexityConfig)[] = [
    'Non-Verbal',
    'Verbal',
    'Quantitative',
    'Spatial',
  ];

  const handleSectionChange = (
    battery: keyof SectionComplexityConfig,
    level: ComplexityLevel | 'Inherit'
  ) => {
    setSectionLevels((prev) => ({
      ...prev,
      [battery]: level,
    }));
  };

  const handleSubsectionChange = (
    subId: number,
    level: ComplexityLevel | 'Inherit'
  ) => {
    setSubsectionLevels((prev) => ({
      ...prev,
      [subId]: level,
    }));
  };

  // Compile effective overrides for each subtest
  const compileOverrides = (): Record<number, ComplexityLevel | 'Inherit'> => {
    const overrides: Record<number, ComplexityLevel | 'Inherit'> = {};

    for (const sub of SUBTESTS_META) {
      if (linkingMode === 'module') {
        overrides[sub.id] = 'Inherit';
      } else if (linkingMode === 'section') {
        const secLevel = sectionLevels[sub.battery as keyof SectionComplexityConfig];
        overrides[sub.id] = secLevel || 'Inherit';
      } else if (linkingMode === 'subsection') {
        overrides[sub.id] = subsectionLevels[sub.id] || 'Inherit';
      }
    }

    return overrides;
  };

  const getEffectiveSubtestLevel = (subId: number): string => {
    if (linkingMode === 'module') {
      return globalLevel === 'Mixed' ? 'Mixed (Balanced)' : globalLevel;
    }
    const sub = SUBTESTS_META.find((s) => s.id === subId);
    if (!sub) return 'Standard';

    if (linkingMode === 'section') {
      const sec = sectionLevels[sub.battery as keyof SectionComplexityConfig];
      if (sec && sec !== 'Inherit') return sec;
      return globalLevel === 'Mixed' ? 'Mixed' : globalLevel;
    }

    const subLvl = subsectionLevels[subId];
    if (subLvl && subLvl !== 'Inherit') return subLvl;
    return globalLevel === 'Mixed' ? 'Mixed' : globalLevel;
  };

  const handleLaunch = () => {
    const overrides = compileOverrides();
    let summary = '';
    if (linkingMode === 'module') {
      summary = globalLevel === 'Mixed' ? 'Balanced All Levels' : `Global ${globalLevel}`;
    } else if (linkingMode === 'section') {
      summary = 'Configured by Battery Section';
    } else {
      summary = 'Configured per Individual Subsection';
    }

    onLaunchExamWithComplexity(globalLevel, overrides, summary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1E293B] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">Level of Complexity Configurator</h2>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-400 text-slate-950 uppercase">
                  GL International Standards
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Link levels with the Main Module, Section (Battery), or Individual Subsections
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6 text-xs">
          {/* LEVEL EXPLANATION CARDS (INTERNATIONAL BENCHMARK) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['Beginner', 'Standard', 'Advanced', 'Expert'] as ComplexityLevel[]).map((lvl) => {
              const meta = COMPLEXITY_LEVELS_META[lvl];
              return (
                <div
                  key={lvl}
                  className={`p-3 rounded-2xl border ${meta.badgeBorder} ${meta.badgeBg} flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-black text-xs ${meta.badgeText}`}>
                        {meta.shortLabel}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">
                        {lvl === 'Beginner'
                          ? 'Tier 1'
                          : lvl === 'Standard'
                          ? 'Tier 2'
                          : lvl === 'Advanced'
                          ? 'Tier 3'
                          : 'Tier 4'}
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-800 leading-tight">
                      {lvl === 'Beginner'
                        ? 'Foundation / KS2'
                        : lvl === 'Standard'
                        ? 'Age-Expected GL'
                        : lvl === 'Advanced'
                        ? 'High Stanine 7-8'
                        : 'Stanine 9 Olympiad'}
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-600 mt-2 leading-tight">
                    {meta.intlDescriptor}
                  </p>
                </div>
              );
            })}
          </div>

          {/* LINKING HIERARCHY SELECTOR */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-teal-700" />
                <span>Level Linking Hierarchy Option:</span>
              </label>
              <span className="text-[11px] text-teal-700 font-bold">
                {linkingMode === 'module'
                  ? 'Main Module Level (Uniform)'
                  : linkingMode === 'section'
                  ? 'Linked by Section (Battery)'
                  : 'Individual Subsection Level'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLinkingMode('module')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  linkingMode === 'module'
                    ? 'border-teal-600 bg-white ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">1. Main Module</span>
                  {linkingMode === 'module' && <CheckCircle className="w-4 h-4 text-teal-600" />}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  One uniform complexity level across all 8 subtests.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLinkingMode('section')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  linkingMode === 'section'
                    ? 'border-teal-600 bg-white ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">2. Section Level</span>
                  {linkingMode === 'section' && <CheckCircle className="w-4 h-4 text-teal-600" />}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Configure the 4 Batteries (Non-Verbal, Verbal, Quantitative, Spatial).
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLinkingMode('subsection')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  linkingMode === 'subsection'
                    ? 'border-teal-600 bg-white ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">3. Subsection Level</span>
                  {linkingMode === 'subsection' && <CheckCircle className="w-4 h-4 text-teal-600" />}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Fine-tune each of the 8 individual subtests independently.
                </p>
              </button>
            </div>
          </div>

          {/* MAIN MODULE LEVEL PICKER */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800">
                {linkingMode === 'module'
                  ? 'Main Module Level (Applies to All Questions):'
                  : 'Base Fallback Level (Applied when sections/subsections are set to Inherit):'}
              </label>
              <span className="text-[11px] text-slate-500">
                {globalLevel === 'Mixed'
                  ? 'Evenly stratified across all 4 tiers'
                  : COMPLEXITY_LEVELS_META[globalLevel].label}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() => setGlobalLevel('Mixed')}
                className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-all ${
                  globalLevel === 'Mixed'
                    ? 'border-amber-500 bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>Mixed (Balanced)</div>
                <div className="text-[9px] font-normal opacity-80">Official GL Mix</div>
              </button>

              {(['Beginner', 'Standard', 'Advanced', 'Expert'] as ComplexityLevel[]).map((lvl) => {
                const isSelected = globalLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setGlobalLevel(lvl)}
                    className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-600 text-white font-black shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>{lvl}</div>
                    <div className="text-[9px] font-normal opacity-80">
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
              })}
            </div>
          </div>

          {/* SECTION LEVEL (BATTERY) CONFIGURATION */}
          {linkingMode === 'section' && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="font-extrabold text-slate-900 text-xs flex items-center justify-between">
                <span>Configure Complexity by Section (Battery):</span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Sets both subtests in each battery
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {batteryKeys.map((battery) => {
                  const currentSecLevel = sectionLevels[battery];
                  return (
                    <div
                      key={battery}
                      className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{battery} Reasoning</div>
                        <div className="text-[10px] text-slate-400">
                          {battery === 'Non-Verbal'
                            ? 'Subtests 1 & 2'
                            : battery === 'Verbal'
                            ? 'Subtests 3 & 4'
                            : battery === 'Quantitative'
                            ? 'Subtests 5 & 6'
                            : 'Subtests 7 & 8'}
                        </div>
                      </div>

                      <select
                        value={currentSecLevel}
                        onChange={(e) =>
                          handleSectionChange(battery, e.target.value as ComplexityLevel | 'Inherit')
                        }
                        className="py-1.5 px-2.5 text-xs font-bold bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="Inherit">Inherit Base ({globalLevel})</option>
                        <option value="Beginner">Beginner (Foundation)</option>
                        <option value="Standard">Standard (Intermediate)</option>
                        <option value="Advanced">Advanced (Proficient)</option>
                        <option value="Expert">Expert (Mastery)</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUBSECTION LEVEL CONFIGURATION */}
          {linkingMode === 'subsection' && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="font-extrabold text-slate-900 text-xs flex items-center justify-between">
                <span>Fine-Tune Individual Subsection Levels:</span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Individual override per subtest
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SUBTESTS_META.filter((s) => s.id <= 8).map((sub) => {
                  const currentSubLevel = subsectionLevels[sub.id] || 'Inherit';
                  return (
                    <div
                      key={sub.id}
                      className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-xs">
                          {sub.id}. {sub.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {sub.battery} &bull; {sub.officialQuestionCount} Qs &bull; {sub.defaultMinutes}m
                        </div>
                      </div>

                      <select
                        value={currentSubLevel}
                        onChange={(e) =>
                          handleSubsectionChange(sub.id, e.target.value as ComplexityLevel | 'Inherit')
                        }
                        className="py-1 px-2 text-xs font-bold bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="Inherit">Inherit ({globalLevel})</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Standard">Standard</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LIVE EFFECTIVE PREVIEW TABLE */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Live Subtest Complexity Distribution Preview (168 Questions)</span>
              </span>
              <span className="text-[10px] text-slate-500">25 questions available per tier</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SUBTESTS_META.filter((s) => s.id <= 8).map((sub) => {
                const effective = getEffectiveSubtestLevel(sub.id);
                return (
                  <div
                    key={sub.id}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px]"
                  >
                    <div className="font-bold text-slate-800 truncate">
                      {sub.id}. {sub.name}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-slate-500">
                        {sub.officialQuestionCount} Qs ({sub.defaultMinutes}m)
                      </span>
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                          effective === 'Beginner'
                            ? 'bg-emerald-100 text-emerald-800'
                            : effective === 'Standard'
                            ? 'bg-blue-100 text-blue-800'
                            : effective === 'Advanced'
                            ? 'bg-amber-100 text-amber-900'
                            : effective === 'Expert'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {effective}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-xs"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleLaunch}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Launch 168-Question Exam with Selected Complexity</span>
          </button>
        </div>
      </div>
    </div>
  );
};
