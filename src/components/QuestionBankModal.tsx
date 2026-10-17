import React, { useState } from 'react';
import { Question, BatteryType, OptionLabel, ExamCategory } from '../types/exam';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';
import { SUBTESTS_META } from '../data/defaultPolicies';
import {
  X,
  Plus,
  Upload,
  Download,
  Trash2,
  Search,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';

interface QuestionBankModalProps {
  questions: Question[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuestions: (newQuestions: Question[]) => void;
}

export const QuestionBankModal: React.FC<QuestionBankModalProps> = ({
  questions,
  isOpen,
  onClose,
  onUpdateQuestions,
}) => {
  const [filterBattery, setFilterBattery] = useState<string>('all');
  const [filterExamType, setFilterExamType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  // New question form state
  const [newBattery, setNewBattery] = useState<BatteryType>('Non-Verbal');
  const [newSubtestId, setNewSubtestId] = useState<number>(1);
  const [newExamType, setNewExamType] = useState<ExamCategory>('CAT4');
  const [newStem, setNewStem] = useState('');
  const [newSvgOrImg, setNewSvgOrImg] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [optE, setOptE] = useState('');
  const [newCorrect, setNewCorrect] = useState<OptionLabel>('A');
  const [newExplanation, setNewExplanation] = useState('');
  const [newHint, setNewHint] = useState('');

  // Bulk upload category mapping
  const [bulkUploadCategory, setBulkUploadCategory] = useState<ExamCategory>('CAT4');

  if (!isOpen) return null;

  const filteredQuestions = questions.filter((q) => {
    const matchesBattery = filterBattery === 'all' || q.battery === filterBattery;
    const matchesExamType =
      filterExamType === 'all' ||
      (filterExamType === 'uploaded' && q.isCustomUploaded) ||
      q.examType === filterExamType ||
      (!q.examType && filterExamType === 'CAT4');

    const matchesSearch =
      q.stem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subtestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBattery && matchesExamType && matchesSearch;
  });

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Delete this question from your active question bank?')) {
      const updated = questions.filter((q) => q.id !== id);
      onUpdateQuestions(updated);
    }
  };

  const handleResetDefault = () => {
    if (confirm(`Reset question bank back to default comprehensive questions?`)) {
      onUpdateQuestions(DEFAULT_QUESTIONS);
      setUploadFeedback('Question bank successfully reset to default questions.');
    }
  };

  const handleExportQuestions = () => {
    const jsonStr = JSON.stringify(questions, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cat4-question-bank-${questions.length}-items.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSampleCsv = () => {
    const csvContent =
      'SubtestId,Battery,ExamType,SubtestName,Stem,OptionA,OptionB,OptionC,OptionD,OptionE,CorrectAnswer,Explanation\n' +
      '1,Non-Verbal,CAT4,Figure Classification,"Which shape belongs with the target group?",Square,Circle,Triangle,Pentagon,Hexagon,C,"All items have 3 sides."\n' +
      '3,Verbal,CAT4,Verbal Classification,"Which word belongs with: OAK, PINE, BIRCH",Rose,Willow,Grass,Acorn,Branch,B,"Oak, pine, birch, and willow are all trees."\n' +
      '9,Science & Math,Science,Applied Science,"What chemical compound is produced during photosynthesis?",Glucose,Salt,Rust,Methane,Ozone,A,"Plants convert CO2 and water into glucose."\n';

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-questions-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      try {
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const tagged = parsed.map((item, idx) => ({
              ...item,
              id: item.id || `uploaded-json-${Date.now()}-${idx}`,
              isCustomUploaded: true,
              examType: item.examType || bulkUploadCategory,
            }));
            onUpdateQuestions([...questions, ...tagged]);
            setUploadFeedback(`Successfully uploaded and categorized ${tagged.length} questions as ${bulkUploadCategory}!`);
          } else {
            setUploadFeedback('Uploaded JSON must contain an array of question objects.');
          }
        } else if (file.name.endsWith('.csv') || file.name.endsWith('.tsv') || file.name.endsWith('.txt')) {
          // Spreadsheets or delimited text parser
          const isTsv = file.name.endsWith('.tsv') || content.includes('\t');
          const delimiter = isTsv ? '\t' : ',';
          const lines = content.split('\n').filter((l) => l.trim().length > 0);
          const newItems: Question[] = [];
          const startIndex = lines[0].toLowerCase().includes('stem') ? 1 : 0;

          for (let i = startIndex; i < lines.length; i++) {
            const cols = lines[i].split(delimiter).map((c) => c.trim().replace(/^"|"$/g, ''));
            if (cols.length >= 7) {
              const subId = parseInt(cols[0]) || 1;
              const subMeta = SUBTESTS_META.find((s) => s.id === subId);
              newItems.push({
                id: `uploaded-${Date.now()}-${i}`,
                subtestId: subId,
                battery: (cols[1] as BatteryType) || subMeta?.battery || 'Verbal',
                examType: (cols[2] as ExamCategory) || bulkUploadCategory,
                subtestName: cols[3] || subMeta?.name || 'Custom Question',
                stem: cols[4] || cols[3] || 'Question',
                options: [
                  { label: 'A', text: cols[5] || 'Option A' },
                  { label: 'B', text: cols[6] || 'Option B' },
                  { label: 'C', text: cols[7] || 'Option C' },
                  { label: 'D', text: cols[8] || 'Option D' },
                  { label: 'E', text: cols[9] || 'Option E' },
                ],
                correctAnswer: (cols[10] as OptionLabel) || 'A',
                explanation: cols[11] || 'Correct answer verified.',
                isCustomUploaded: true,
              });
            }
          }
          if (newItems.length > 0) {
            onUpdateQuestions([...questions, ...newItems]);
            setUploadFeedback(`Successfully extracted and categorized ${newItems.length} questions from ${file.name} as ${bulkUploadCategory}!`);
          } else {
            setUploadFeedback('Could not detect enough columns. Download the sample CSV template for format reference.');
          }
        }
      } catch (err) {
        setUploadFeedback('Error reading file. Please ensure valid JSON, CSV, or spreadsheet text.');
      }
    };
    reader.readAsText(file);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStem.trim() || !optA.trim() || !optB.trim()) {
      alert('Please fill in question stem and at least Options A and B.');
      return;
    }

    const subMeta = SUBTESTS_META.find((s) => s.id === newSubtestId);

    const created: Question = {
      id: `custom-${Date.now()}`,
      subtestId: newSubtestId,
      battery: newBattery,
      examType: newExamType,
      subtestName: subMeta ? subMeta.name : 'Custom Practice',
      stem: newStem,
      diagramSvg: newSvgOrImg.trim() ? newSvgOrImg : undefined,
      options: [
        { label: 'A', text: optA },
        { label: 'B', text: optB },
        { label: 'C', text: optC || 'N/A' },
        { label: 'D', text: optD || 'N/A' },
        { label: 'E', text: optE || 'N/A' },
      ],
      correctAnswer: newCorrect,
      explanation: newExplanation || 'Correct answer identified.',
      hint: newHint || undefined,
      isCustomUploaded: true,
    };

    onUpdateQuestions([created, ...questions]);
    setIsAddingNew(false);
    setNewStem('');
    setNewSvgOrImg('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setOptE('');
    setNewExplanation('');
    setNewHint('');
    setUploadFeedback(`Question added and tagged under ${newExamType}!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1E293B] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Interactive Question Bank & Spreadsheet Uploader</h2>
              <p className="text-xs text-slate-300">
                {questions.length} total questions in database &bull; Categorized by CAT4, Science, Math, and GL
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

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search & Filters */}
          <div className="flex items-center gap-2 flex-grow max-w-lg">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search stem, keywords, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>

            <select
              value={filterExamType}
              onChange={(e) => setFilterExamType(e.target.value)}
              className="py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700"
            >
              <option value="all">All Exams</option>
              <option value="CAT4">CAT4</option>
              <option value="Science">Science</option>
              <option value="Math">Math</option>
              <option value="GL">GL 11+</option>
              <option value="uploaded">Uploaded Only</option>
            </select>

            <select
              value={filterBattery}
              onChange={(e) => setFilterBattery(e.target.value)}
              className="py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700"
            >
              <option value="all">All Batteries</option>
              <option value="Non-Verbal">Non-Verbal</option>
              <option value="Verbal">Verbal</option>
              <option value="Quantitative">Quantitative</option>
              <option value="Spatial">Spatial</option>
              <option value="Science & Math">Science & Math</option>
            </select>
          </div>

          {/* Action Buttons & Category Uploader */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingNew ? 'Close Form' : 'Add Single'}</span>
            </button>

            {/* Category tag for uploaded file */}
            <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg px-2 py-1">
              <span className="text-[10px] text-slate-500 font-bold">Category:</span>
              <select
                value={bulkUploadCategory}
                onChange={(e) => setBulkUploadCategory(e.target.value as ExamCategory)}
                className="text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="CAT4">CAT4</option>
                <option value="Science">Science</option>
                <option value="Math">Math</option>
                <option value="GL">GL 11+</option>
              </select>
            </div>

            <label className="flex items-center gap-1.5 px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload File (.csv/.json)</span>
              <input
                type="file"
                accept=".json,.csv,.tsv,.txt"
                onChange={handleUploadFile}
                className="hidden"
              />
            </label>

            <button
              onClick={handleDownloadSampleCsv}
              title="Download Sample Spreadsheet Template"
              className="p-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            </button>

            <button
              onClick={handleExportQuestions}
              title="Export all questions as JSON"
              className="flex items-center gap-1 px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>

            <button
              onClick={handleResetDefault}
              title="Reset to default questions"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {uploadFeedback && (
          <div className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadFeedback}</span>
            </div>
            <button
              onClick={() => setUploadFeedback(null)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4">
          {/* Add Question Form */}
          {isAddingNew && (
            <form
              onSubmit={handleCreateQuestion}
              className="p-5 bg-teal-50/70 border-2 border-teal-300 rounded-2xl space-y-4 text-xs animate-fade-in"
            >
              <div className="flex items-center justify-between border-b border-teal-200 pb-2">
                <h3 className="font-bold text-teal-950 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-teal-600" />
                  Create New Test Question
                </h3>
                <span className="text-[11px] text-teal-800">
                  Categorize under CAT4, Science, Math, or GL Assessment
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Exam Type</label>
                  <select
                    value={newExamType}
                    onChange={(e) => setNewExamType(e.target.value as ExamCategory)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  >
                    <option value="CAT4">CAT4 Cognitive</option>
                    <option value="Science">Science Olympiad</option>
                    <option value="Math">Math Problem Solving</option>
                    <option value="GL">GL Assessment 11+</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Battery</label>
                  <select
                    value={newBattery}
                    onChange={(e) => setNewBattery(e.target.value as BatteryType)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Non-Verbal">Non-Verbal Reasoning</option>
                    <option value="Verbal">Verbal Reasoning</option>
                    <option value="Quantitative">Quantitative Reasoning</option>
                    <option value="Spatial">Spatial Reasoning</option>
                    <option value="Science & Math">Science & Math</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subtest</label>
                  <select
                    value={newSubtestId}
                    onChange={(e) => setNewSubtestId(parseInt(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    {SUBTESTS_META.map((s) => (
                      <option key={s.id} value={s.id}>
                        Subtest {s.id}: {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Question Stem / Prompt</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Which shape belongs with the first three? Or, Complete the number sequence..."
                  value={newStem}
                  onChange={(e) => setNewStem(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                  Visual Diagram SVG or Free Image URL (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder={`<svg ...> or image URL from free graphics sources`}
                  value={newSvgOrImg}
                  onChange={(e) => setNewSvgOrImg(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-[11px] font-mono"
                />
              </div>

              {/* Options */}
              <div className="space-y-2">
                <span className="block font-bold text-slate-700">Answer Options (A - E):</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                      A
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Option A text"
                      value={optA}
                      onChange={(e) => setOptA(e.target.value)}
                      className="flex-grow p-1.5 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                      B
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Option B text"
                      value={optB}
                      onChange={(e) => setOptB(e.target.value)}
                      className="flex-grow p-1.5 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                      C
                    </span>
                    <input
                      type="text"
                      placeholder="Option C text"
                      value={optC}
                      onChange={(e) => setOptC(e.target.value)}
                      className="flex-grow p-1.5 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                      D
                    </span>
                    <input
                      type="text"
                      placeholder="Option D text"
                      value={optD}
                      onChange={(e) => setOptD(e.target.value)}
                      className="flex-grow p-1.5 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                      E
                    </span>
                    <input
                      type="text"
                      placeholder="Option E text"
                      value={optE}
                      onChange={(e) => setOptE(e.target.value)}
                      className="flex-grow p-1.5 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Correct Answer & Explanation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Correct Option</label>
                  <select
                    value={newCorrect}
                    onChange={(e) => setNewCorrect(e.target.value as OptionLabel)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                    <option value="E">Option E</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Explanation / Solution Rule
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Describe the cognitive rule or calculation step-by-step"
                    value={newExplanation}
                    onChange={(e) => setNewExplanation(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg shadow-xs"
                >
                  Save Question to Bank
                </button>
              </div>
            </form>
          )}

          {/* Questions List */}
          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                No questions found matching your filter or search query.
              </div>
            ) : (
              filteredQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-xs transition-shadow flex flex-col justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] uppercase">
                          #{idx + 1} &bull; Subtest {q.subtestId}: {q.subtestName}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-semibold">
                          {q.battery}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold">
                          {q.examType || 'CAT4'}
                        </span>
                        {q.isCustomUploaded && (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                            Uploaded
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-2">{q.stem}</h4>

                    {q.diagramSvg && (
                      <div
                        className="mb-3 p-2 bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto max-w-md"
                        dangerouslySetInnerHTML={{ __html: q.diagramSvg }}
                      />
                    )}

                    {/* Options Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 mb-2">
                      {q.options.map((opt) => {
                        const isRight = opt.label === q.correctAnswer;
                        return (
                          <div
                            key={opt.label}
                            className={`p-2 rounded border flex items-center gap-2 ${
                              isRight
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${
                                isRight ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span className="truncate">{opt.text}</span>
                            {isRight && <span className="ml-auto text-emerald-600">✓</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <strong className="text-slate-800">Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>
            Total active questions in database: <strong className="text-slate-900">{questions.length}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
