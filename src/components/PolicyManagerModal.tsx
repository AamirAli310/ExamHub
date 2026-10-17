import React, { useState } from 'react';
import { ExamPolicy } from '../types/exam';
import { DEFAULT_POLICIES, THEMES } from '../data/defaultPolicies';
import { parseExamPolicyFromText } from '../utils/examEngine';
import {
  X,
  Upload,
  Download,
  CheckCircle2,
  Sliders,
  Clock,
  Palette,
  ShieldAlert,
  FileText,
  Sparkles,
  Shuffle,
  Lock,
} from 'lucide-react';

interface PolicyManagerModalProps {
  currentPolicy: ExamPolicy;
  isOpen: boolean;
  onClose: () => void;
  onSavePolicy: (policy: ExamPolicy) => void;
}

export const PolicyManagerModal: React.FC<PolicyManagerModalProps> = ({
  currentPolicy,
  isOpen,
  onClose,
  onSavePolicy,
}) => {
  const [activePolicy, setActivePolicy] = useState<ExamPolicy>(currentPolicy);
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'customize'>('presets');
  const [rawPolicyText, setRawPolicyText] = useState('');
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: ExamPolicy) => {
    setActivePolicy(preset);
  };

  const handleApplyOfficialGlTimers = () => {
    setActivePolicy({
      ...activePolicy,
      timerType: 'subtest',
      strictSectionLocking: true,
      subtestMinutes: { 1: 10, 2: 10, 3: 8, 4: 8, 5: 10, 6: 8, 7: 9, 8: 9, 9: 10 },
      totalMinutes: 72,
    });
    setUploadFeedback('Applied Official GL Assessment Timers (10m, 10m, 8m, 8m, 10m, 8m, 9m, 9m)!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        try {
          const parsed = parseExamPolicyFromText(text, activePolicy);
          setActivePolicy(parsed);
          setUploadFeedback(`Successfully applied policy "${parsed.name}" with ${parsed.timerType} timer!`);
        } catch (err) {
          setUploadFeedback('Error parsing file. Please check syntax or use sample format.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleApplyRawText = () => {
    if (!rawPolicyText.trim()) return;
    const parsed = parseExamPolicyFromText(rawPolicyText, activePolicy);
    setActivePolicy(parsed);
    setUploadFeedback(`Applied custom rules: ${parsed.name} | Timer: ${parsed.timerType}`);
  };

  const handleExportPolicy = () => {
    const jsonStr = JSON.stringify(activePolicy, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-policy-${activePolicy.policyId || 'custom'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveAndApply = () => {
    onSavePolicy(activePolicy);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#1E293B] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Dynamic Exam Policy & Rule Engine</h2>
              <p className="text-xs text-slate-300">
                Configure timing rules, strict section locks, display order, themes, and penalty scoring
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'presets'
                ? 'border-[#0F766E] text-teal-800 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Official Presets</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-[#0F766E] text-teal-800 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Policy Document</span>
          </button>
          <button
            onClick={() => setActiveTab('customize')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'customize'
                ? 'border-[#0F766E] text-teal-800 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Manual Parameter Tuning</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {/* TAB 1: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Choose an official exam standard. This immediately configures section durations, strict locking, interface colors, navigation rules, and penalty scoring:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DEFAULT_POLICIES.map((p) => {
                  const isSelected = activePolicy.policyId === p.policyId;
                  return (
                    <div
                      key={p.policyId}
                      onClick={() => handleSelectPreset(p)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#0F766E] bg-teal-50/50 shadow-md ring-2 ring-teal-400/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {p.organization}
                          </span>
                          {isSelected && (
                            <span className="flex items-center gap-1 text-xs font-bold text-teal-700">
                              <CheckCircle2 className="w-4 h-4 fill-[#0F766E] text-white" />
                              Active
                            </span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-xs mt-1">{p.name}</h3>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {p.timerType === 'subtest'
                            ? '8-10m / subtest'
                            : p.timerType === 'per-question'
                            ? `${p.perQuestionSeconds}s / item`
                            : p.timerType === 'total'
                            ? `${p.totalMinutes}m total`
                            : 'Untimed'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          {p.strictSectionLocking ? 'Strict Lock' : 'Flexible'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD POLICY */}
          {activeTab === 'upload' && (
            <div className="space-y-5">
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-teal-950 text-xs leading-relaxed">
                <span className="font-bold">Smart Policy Parser:</span> Upload a JSON configuration or paste syllabus/school instructions. The parser automatically detects section durations, strict locking rules, display order (random vs sequential), and scoring penalties.
              </div>

              {/* File Dropzone */}
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100/80 transition-colors relative">
                <input
                  type="file"
                  id="policy-file-input"
                  accept=".json,.txt,.md"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-slate-800 text-sm">
                    Upload Exam Policy Document (.json, .txt)
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Drag and drop or click to browse
                  </span>
                </div>
              </div>

              {/* Paste Text Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-500" />
                  Or Paste Exam Rules / Policy Text
                </label>
                <textarea
                  value={rawPolicyText}
                  onChange={(e) => setRawPolicyText(e.target.value)}
                  placeholder={`Example:\nExam: GL Assessment Official Simulation\nOrganization: GL Assessment UK\nDuration: 10 minutes per section\nOrder: randomized\nStrict section lock: true\nNegative marking: 0`}
                  rows={4}
                  className="w-full text-xs font-mono p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <div className="mt-2 flex justify-between items-center">
                  <button
                    onClick={handleApplyRawText}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors shadow-xs"
                  >
                    Parse & Apply Rules
                  </button>
                  <button
                    onClick={handleExportPolicy}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export Active Policy JSON
                  </button>
                </div>
              </div>

              {uploadFeedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{uploadFeedback}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOMIZE */}
          {activeTab === 'customize' && (
            <div className="space-y-6 text-xs">
              {/* Organization & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    School / Institution Name
                  </label>
                  <input
                    type="text"
                    value={activePolicy.organization}
                    onChange={(e) =>
                      setActivePolicy({ ...activePolicy, organization: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Exam Policy Title
                  </label>
                  <input
                    type="text"
                    value={activePolicy.name}
                    onChange={(e) =>
                      setActivePolicy({ ...activePolicy, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Timing Engine & GL Standard Button */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-500" />
                    Timer Engine Mode
                  </label>
                  <button
                    type="button"
                    onClick={handleApplyOfficialGlTimers}
                    className="text-[11px] font-bold text-teal-700 hover:underline"
                  >
                    Set Official GL Timers (10, 10, 8, 8, 10, 8, 9, 9m)
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'subtest', label: 'Per Subtest (GL)', desc: 'Official section timers' },
                      { id: 'total', label: 'Total Exam Time', desc: 'Single countdown' },
                      { id: 'per-question', label: 'Per Question', desc: 'Rapid speed drill' },
                      { id: 'untimed', label: 'Untimed / Practice', desc: 'Mastery mode' },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() =>
                        setActivePolicy({ ...activePolicy, timerType: m.id })
                      }
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        activePolicy.timerType === m.id
                          ? 'border-[#0F766E] bg-teal-50 text-teal-950 font-bold shadow-2xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{m.label}</div>
                      <div className="text-[10px] text-slate-500">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Order (Sequential vs Randomized) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Shuffle className="w-4 h-4 text-slate-500" />
                  Question Display Order
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePolicy({ ...activePolicy, questionOrder: 'sequential' })
                    }
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activePolicy.questionOrder === 'sequential'
                        ? 'border-[#0F766E] bg-teal-50 text-teal-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Sequential (Standard GL Order)</div>
                    <div className="text-[10px] text-slate-500">
                      Questions appear in formal standardized curriculum sequence
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActivePolicy({ ...activePolicy, questionOrder: 'randomized' })
                    }
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activePolicy.questionOrder === 'randomized'
                        ? 'border-[#0F766E] bg-teal-50 text-teal-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Randomized / Shuffled</div>
                    <div className="text-[10px] text-slate-500">
                      Shuffles questions to test spontaneous cognitive adaptability
                    </div>
                  </button>
                </div>
              </div>

              {/* Theme Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-slate-500" />
                  Visual Theme & Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.keys(THEMES).map((themeKey) => {
                    const t = THEMES[themeKey];
                    const isSelected = activePolicy.theme.id === t.id;
                    return (
                      <button
                        key={themeKey}
                        type="button"
                        onClick={() => setActivePolicy({ ...activePolicy, theme: t })}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#0F766E] bg-teal-50 text-teal-950 font-bold shadow-2xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="font-bold">{t.name.split(' (')[0]}</span>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-xs"
                            style={{ backgroundColor: t.accentColor }}
                          />
                          <span className="text-[10px] text-slate-500">Palette</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rules & Proctored Toggles */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-700 uppercase tracking-wider block">
                  Exam Proctored Logic
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-white rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={activePolicy.strictSectionLocking}
                      onChange={(e) =>
                        setActivePolicy({ ...activePolicy, strictSectionLocking: e.target.checked })
                      }
                      className="accent-[#0F766E] w-4 h-4 rounded"
                    />
                    <div>
                      <span className="font-bold block">Strict Section Locking</span>
                      <span className="text-[10px] text-slate-400">
                        Locks subtest automatically on 00:00 timeout
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-white rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={activePolicy.allowNavigateBack}
                      onChange={(e) =>
                        setActivePolicy({ ...activePolicy, allowNavigateBack: e.target.checked })
                      }
                      className="accent-[#0F766E] w-4 h-4 rounded"
                    />
                    <div>
                      <span className="font-bold block">Within-Section Navigation</span>
                      <span className="text-[10px] text-slate-400">
                        Move back and forth freely inside active subtest
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-white rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={activePolicy.instantFeedback}
                      onChange={(e) =>
                        setActivePolicy({ ...activePolicy, instantFeedback: e.target.checked })
                      }
                      className="accent-[#0F766E] w-4 h-4 rounded"
                    />
                    <div>
                      <span className="font-bold block">Instant Feedback Mode</span>
                      <span className="text-[10px] text-slate-400">
                        Reveals correct answer & explanation immediately
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-white rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={activePolicy.allowFlagging}
                      onChange={(e) =>
                        setActivePolicy({ ...activePolicy, allowFlagging: e.target.checked })
                      }
                      className="accent-[#0F766E] w-4 h-4 rounded"
                    />
                    <div>
                      <span className="font-bold block">Question Flagging (F)</span>
                      <span className="text-[10px] text-slate-400">
                        Bookmark items to revisit in question grid
                      </span>
                    </div>
                  </label>
                </div>

                {/* Negative marking penalty */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span className="font-bold">Scoring Rule / Penalty:</span>
                  </div>
                  <select
                    value={activePolicy.negativeMarking}
                    onChange={(e) =>
                      setActivePolicy({
                        ...activePolicy,
                        negativeMarking: parseFloat(e.target.value),
                      })
                    }
                    className="font-bold border border-slate-300 rounded-lg px-2.5 py-1 bg-white text-xs"
                  >
                    <option value="0">Standard (+1 Correct, 0 Wrong)</option>
                    <option value="0.25">-0.25 marks penalty per wrong</option>
                    <option value="0.33">-0.33 marks penalty per wrong</option>
                    <option value="0.5">-0.50 marks penalty per wrong</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Applying policy: <strong className="text-slate-800">{activePolicy.name}</strong>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndApply}
              className="px-5 py-2 bg-[#0F766E] hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Apply & Save Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
