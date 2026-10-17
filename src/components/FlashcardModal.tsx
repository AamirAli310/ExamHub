import React, { useState, useEffect, useMemo } from 'react';
import { Question, BatteryType } from '../types/exam';
import {
  X,
  RotateCw,
  CheckCircle2,
  XCircle,
  Flame,
  Sparkles,
  ArrowRight,
  Shuffle,
  HelpCircle,
  Trophy,
} from 'lucide-react';

interface FlashcardModalProps {
  questions: Question[];
  isOpen: boolean;
  onClose: () => void;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({
  questions,
  isOpen,
  onClose,
}) => {
  const [selectedBattery, setSelectedBattery] = useState<string>('all');
  const [deckSize, setDeckSize] = useState<number>(15);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Mastery Tracking
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [needsPracticeIds, setNeedsPracticeIds] = useState<Set<string>>(new Set());
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [isDeckFinished, setIsDeckFinished] = useState<boolean>(false);

  // Deck generation
  const [activeDeck, setActiveDeck] = useState<Question[]>([]);

  // Filter and build initial deck
  const eligibleQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedBattery === 'all') return true;
      return q.battery === selectedBattery;
    });
  }, [questions, selectedBattery]);

  // Shuffle & re-init deck
  const initDeck = (customPool?: Question[]) => {
    const pool = customPool || eligibleQuestions;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const sliced = shuffled.slice(0, Math.min(deckSize, shuffled.length));
    setActiveDeck(sliced);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds(new Set());
    setNeedsPracticeIds(new Set());
    setCurrentStreak(0);
    setIsDeckFinished(false);
  };

  useEffect(() => {
    if (isOpen) {
      initDeck();
    }
  }, [isOpen, selectedBattery, deckSize]);

  // Keyboard navigation: Space = Flip, 1/Left = Study, 2/Right = Mastered
  useEffect(() => {
    if (!isOpen || isDeckFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === '1' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleMark(false);
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleMark(true);
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        initDeck();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, activeDeck, isFlipped, isDeckFinished]);

  if (!isOpen) return null;

  const currentCard = activeDeck[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMark = (isKnown: boolean) => {
    if (!currentCard) return;

    if (isKnown) {
      setMasteredIds((prev) => new Set([...prev, currentCard.id]));
      setCurrentStreak((s) => {
        const next = s + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      setNeedsPracticeIds((prev) => new Set([...prev, currentCard.id]));
      setCurrentStreak(0);
    }

    // Advance to next card or complete
    if (currentIndex < activeDeck.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((idx) => idx + 1);
    } else {
      setIsDeckFinished(true);
    }
  };

  const handleReviewDifficult = () => {
    const difficultQuestions = questions.filter((q) => needsPracticeIds.has(q.id));
    if (difficultQuestions.length > 0) {
      initDeck(difficultQuestions);
    } else {
      initDeck();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#1E293B] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Sparkles className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold">Quick Review Flashcards</h2>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 uppercase tracking-wide">
                  Speed Drill
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Fast-paced pattern memorization & cognitive rule drills
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 border border-slate-600 text-xs font-bold text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Streak: {currentStreak}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        {!isDeckFinished && (
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-500">Filter:</span>
              <select
                value={selectedBattery}
                onChange={(e) => setSelectedBattery(e.target.value)}
                className="py-1 px-2.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700"
              >
                <option value="all">All Batteries ({questions.length})</option>
                <option value="Non-Verbal">Non-Verbal Reasoning</option>
                <option value="Verbal">Verbal Reasoning</option>
                <option value="Quantitative">Quantitative Reasoning</option>
                <option value="Spatial">Spatial Reasoning</option>
                <option value="Science & Math">Science & Math</option>
              </select>

              <select
                value={deckSize}
                onChange={(e) => setDeckSize(parseInt(e.target.value))}
                className="py-1 px-2.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700"
              >
                <option value={10}>10 Cards</option>
                <option value={15}>15 Cards</option>
                <option value={25}>25 Cards</option>
                <option value={50}>50 Cards</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold">
                Card {currentIndex + 1} of {activeDeck.length}
              </span>
              <button
                onClick={() => initDeck()}
                title="Shuffle Deck"
                className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {!isDeckFinished && (
          <div className="w-full bg-slate-200 h-1.5 overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{
                width: `${(masteredIds.size / (activeDeck.length || 1)) * 100}%`,
              }}
            />
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{
                width: `${(needsPracticeIds.size / (activeDeck.length || 1)) * 100}%`,
              }}
            />
          </div>
        )}

        {/* Main Body */}
        <div className="p-6 overflow-y-auto flex-grow flex flex-col justify-between">
          {!isDeckFinished && currentCard ? (
            <div className="space-y-6 flex-grow flex flex-col justify-between">
              {/* THE 3D FLIP CARD CONTAINER */}
              <div
                onClick={handleFlip}
                className="relative min-h-[320px] sm:min-h-[350px] w-full rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group select-none"
              >
                {/* Top Badge on Card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      {currentCard.battery} &bull; Subtest {currentCard.subtestId}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {currentCard.subtestName}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-400 group-hover:text-teal-600 transition-colors flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isFlipped ? 'Show Question' : 'Click to Flip'}</span>
                  </span>
                </div>

                {/* CARD CONTENT */}
                <div className="my-auto py-4">
                  {!isFlipped ? (
                    /* FRONT OF CARD (Question & Options) */
                    <div className="space-y-4 animate-fade-in text-center">
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-relaxed">
                        {currentCard.stem}
                      </h3>

                      {currentCard.diagramSvg && (
                        <div
                          className="p-3 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto flex justify-center shadow-inner overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: currentCard.diagramSvg }}
                        />
                      )}

                      {/* Options Preview */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left max-w-lg mx-auto pt-2">
                        {currentCard.options.map((opt) => (
                          <div
                            key={opt.label}
                            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs flex items-center gap-2.5 font-medium text-slate-700"
                          >
                            <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-bold text-[11px] text-slate-800 shadow-xs">
                              {opt.label}
                            </span>
                            <span className="truncate">{opt.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] text-slate-400 pt-2 flex items-center justify-center gap-1.5 font-medium">
                        <span>Tip: Press</span>
                        <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] text-slate-600">
                          Spacebar
                        </kbd>
                        <span>or click card to reveal answer</span>
                      </div>
                    </div>
                  ) : (
                    /* BACK OF CARD (Answer & Deep Explanation) */
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
                          {currentCard.correctAnswer}
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                            Correct Option
                          </span>
                          <div className="font-extrabold text-emerald-950 text-sm">
                            {
                              currentCard.options.find(
                                (o) => o.label === currentCard.correctAnswer
                              )?.text
                            }
                          </div>
                        </div>
                      </div>

                      {/* Cognitive Pattern Rule */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <HelpCircle className="w-4 h-4 text-teal-600" />
                          <span>Cognitive Pattern Rule & Logic:</span>
                        </div>
                        <p className="leading-relaxed">{currentCard.explanation}</p>
                      </div>

                      {currentCard.hint && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 font-medium">
                          <strong>Memory & Strategy Shortcut:</strong> {currentCard.hint}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer */}
                <div className="text-center text-[11px] text-slate-400 font-medium border-t border-slate-100 pt-2">
                  <span>Press 1 / ← for Study Again &bull; Press 2 / → for Mastered</span>
                </div>
              </div>

              {/* ACTION BUTTONS (Needs Practice vs Mastered) */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleMark(false)}
                  className="py-3 px-4 rounded-2xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-xs transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-xs"
                >
                  <XCircle className="w-4 h-4 text-amber-600" />
                  <span>Study Again (1)</span>
                </button>

                <button
                  onClick={() => handleMark(true)}
                  className="py-3 px-4 rounded-2xl bg-[#0F766E] hover:bg-teal-700 text-white font-extrabold text-xs transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-200" />
                  <span>Mastered! (2)</span>
                </button>
              </div>
            </div>
          ) : (
            /* COMPLETION DECK SUMMARY SCREEN */
            <div className="p-6 text-center space-y-6 my-auto animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Flashcard Drill Complete!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  You reviewed {activeDeck.length} reasoning pattern cards in this session.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="text-2xl font-black text-emerald-700">
                    {masteredIds.size}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-900 uppercase">Mastered</div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
                  <div className="text-2xl font-black text-amber-700">
                    {needsPracticeIds.size}
                  </div>
                  <div className="text-[10px] font-bold text-amber-900 uppercase">Study Again</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="text-2xl font-black text-slate-800">{bestStreak}</div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase">Best Streak</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                {needsPracticeIds.size > 0 && (
                  <button
                    onClick={handleReviewDifficult}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-transform hover:scale-105"
                  >
                    Drill {needsPracticeIds.size} Difficult Cards
                  </button>
                )}

                <button
                  onClick={() => initDeck()}
                  className="px-5 py-2.5 bg-[#0F766E] hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow-md transition-transform hover:scale-105"
                >
                  Start Fresh Shuffled Deck
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Pattern Recognition Drill &bull; {masteredIds.size} of {activeDeck.length} Mastered
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
