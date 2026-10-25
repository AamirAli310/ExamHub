import { Question, ComplexityLevel } from '../types/exam';

/**
 * Subtest 7: Figure Analysis / Hole Punching (100 Questions)
 * Subtest 8: Figure Recognition / Hidden Shapes (100 Questions)
 * Strictly stratified across 4 international complexity levels:
 * - Beginner (Level 1: Q1-25) -> 1 Single Fold (2 layers), 1 punch | Basic 3-4 sided shapes
 * - Standard (Level 2: Q26-50) -> 2 Orthogonal Folds (4 layers), 1 punch | 5-6 sided standard polygons
 * - Advanced (Level 3: Q51-75) -> 2-3 Diagonal/Pleat Folds + Edge Notches (4-6 layers) | Non-convex 6-8 vertex polygons
 * - Expert (Level 4: Q76-100) -> 3-4 Octant/Compound Folds (8 layers) + Multi-punches | Complex 8-12 vertex irregular polyforms
 */

interface FoldRule {
  tierTitle: string;
  description: string;
  foldCount: number;
  layerCount: number;
  creaseType: string;
  punchCount: number;
  resultingHoles: number;
  holesLayout: string;
  diagramSvg: string;
}

const BEGINNER_FA_RULES: FoldRule[] = [
  {
    tierTitle: 'Single Horizontal Fold (Top to Bottom)',
    description: 'A square sheet is folded in half ONCE horizontally (top edge meets bottom edge, 2 layers). One single hole is punched near the center.',
    foldCount: 1,
    layerCount: 2,
    creaseType: 'Single horizontal midline crease (2 layers)',
    punchCount: 1,
    resultingHoles: 2,
    holesLayout: '2 vertically aligned holes mirrored across the horizontal center line',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
        <div class="text-[10px] font-bold text-emerald-800 px-2 py-0.5 bg-emerald-100 rounded">1 Fold (2 Layers)</div>
        <svg width="65" height="65" viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="none" stroke="#059669" stroke-width="4"/><line x1="15" y1="50" x2="85" y2="50" stroke="#059669" stroke-dasharray="4,4" stroke-width="3"/></svg>
        <span class="text-xs font-bold text-slate-400">&rarr;</span>
        <svg width="65" height="35" viewBox="0 0 100 50"><rect x="15" y="5" width="70" height="40" fill="#a7f3d0" stroke="#059669" stroke-width="4"/><circle cx="50" cy="25" r="7" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Single Vertical Fold (Left to Right)',
    description: 'A square sheet is folded in half ONCE vertically (left edge meets right edge, 2 layers). One hole is punched on the right side.',
    foldCount: 1,
    layerCount: 2,
    creaseType: 'Single vertical midline crease (2 layers)',
    punchCount: 1,
    resultingHoles: 2,
    holesLayout: '2 horizontally aligned holes mirrored left-to-right across the vertical center line',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
        <div class="text-[10px] font-bold text-emerald-800 px-2 py-0.5 bg-emerald-100 rounded">1 Fold (2 Layers)</div>
        <svg width="65" height="65" viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="none" stroke="#059669" stroke-width="4"/><line x1="50" y1="15" x2="50" y2="85" stroke="#059669" stroke-dasharray="4,4" stroke-width="3"/></svg>
        <span class="text-xs font-bold text-slate-400">&rarr;</span>
        <svg width="40" height="65" viewBox="0 0 50 100"><rect x="5" y="15" width="40" height="70" fill="#a7f3d0" stroke="#059669" stroke-width="4"/><circle cx="28" cy="50" r="7" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Single Diagonal Fold (Bottom-Left to Top-Right)',
    description: 'A square sheet is folded ONCE along its main diagonal into a large 2-layer right triangle. One hole is punched near the outer corner.',
    foldCount: 1,
    layerCount: 2,
    creaseType: 'Single diagonal crease (2 layers)',
    punchCount: 1,
    resultingHoles: 2,
    holesLayout: '2 holes mirrored symmetrically across the diagonal axis in opposite corners',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
        <div class="text-[10px] font-bold text-emerald-800 px-2 py-0.5 bg-emerald-100 rounded">1 Diagonal Fold</div>
        <svg width="65" height="65" viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="none" stroke="#059669" stroke-width="4"/><line x1="15" y1="85" x2="85" y2="15" stroke="#059669" stroke-dasharray="4,4" stroke-width="3"/></svg>
        <span class="text-xs font-bold text-slate-400">&rarr;</span>
        <svg width="65" height="65" viewBox="0 0 100 100"><polygon points="15,15 85,15 85,85" fill="#a7f3d0" stroke="#059669" stroke-width="4"/><circle cx="65" cy="35" r="7" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Single Top-Flap Half Fold (Corner Punch)',
    description: 'A square sheet is folded ONCE horizontally in half (2 layers). One hole is punched in the top-left corner of the folded rectangle.',
    foldCount: 1,
    layerCount: 2,
    creaseType: 'Single horizontal crease with left-corner punch',
    punchCount: 1,
    resultingHoles: 2,
    holesLayout: '2 holes along the left edge (one near top-left, one near bottom-left)',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
        <div class="text-[10px] font-bold text-emerald-800 px-2 py-0.5 bg-emerald-100 rounded">1 Fold (Corner)</div>
        <svg width="65" height="35" viewBox="0 0 100 50"><rect x="15" y="5" width="70" height="40" fill="#a7f3d0" stroke="#059669" stroke-width="4"/><circle cx="28" cy="20" r="6" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Single Vertical Fold on Crease Line',
    description: 'A square sheet is folded ONCE vertically in half. A semi-circular notch is punched directly on the central vertical folded crease.',
    foldCount: 1,
    layerCount: 2,
    creaseType: 'Single vertical fold with crease-line punch',
    punchCount: 1,
    resultingHoles: 1,
    holesLayout: '1 single complete circular hole dead-center on the vertical midline',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
        <div class="text-[10px] font-bold text-emerald-800 px-2 py-0.5 bg-emerald-100 rounded">1 Fold (On Crease)</div>
        <svg width="45" height="65" viewBox="0 0 50 100"><rect x="5" y="15" width="40" height="70" fill="#a7f3d0" stroke="#059669" stroke-width="4"/><circle cx="5" cy="50" r="7" fill="#0f172a"/></svg>
      </div>
    `,
  },
];

const STANDARD_FA_RULES: FoldRule[] = [
  {
    tierTitle: 'Two Orthogonal Folds (Quarter-Square Center Punch)',
    description: 'Square paper folded TWICE: first horizontally in half, then vertically in half into a 4-layer quadrant. One punch is placed in the center of the quadrant.',
    foldCount: 2,
    layerCount: 4,
    creaseType: 'Two orthogonal folds (4-layer quadrant)',
    punchCount: 1,
    resultingHoles: 4,
    holesLayout: '4 holes forming a symmetric 2x2 square pattern (one in the center of each quadrant)',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-blue-50/60 border border-blue-200 rounded-xl">
        <div class="text-[10px] font-bold text-blue-800 px-2 py-0.5 bg-blue-100 rounded">2 Folds (4 Layers)</div>
        <svg width="65" height="65" viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="none" stroke="#2563eb" stroke-width="4"/><line x1="15" y1="50" x2="85" y2="50" stroke="#2563eb" stroke-dasharray="3,3"/><line x1="50" y1="15" x2="50" y2="85" stroke="#2563eb" stroke-dasharray="3,3"/></svg>
        <span class="text-xs font-bold text-slate-400">&rarr;</span>
        <svg width="40" height="40" viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><circle cx="25" cy="25" r="5" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Two Parallel Horizontal Folds (4-Layer Strip)',
    description: 'Square sheet folded horizontally in half, and then folded horizontally in half AGAIN in the same direction (4 horizontal strip layers). One hole is punched in the center.',
    foldCount: 2,
    layerCount: 4,
    creaseType: 'Two parallel horizontal folds (4 strip layers)',
    punchCount: 1,
    resultingHoles: 4,
    holesLayout: '4 holes arranged in a single vertical column down the center of the sheet',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-blue-50/60 border border-blue-200 rounded-xl">
        <div class="text-[10px] font-bold text-blue-800 px-2 py-0.5 bg-blue-100 rounded">2 Parallel Folds</div>
        <svg width="65" height="30" viewBox="0 0 100 35"><rect x="10" y="5" width="80" height="25" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><circle cx="50" cy="17" r="5" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Two Diagonal Folds (4-Layer Quarter Triangle)',
    description: 'Square sheet folded diagonally twice along both main diagonals to form a 4-layer small triangle. One hole is punched near the outer open hypotenuse edge.',
    foldCount: 2,
    layerCount: 4,
    creaseType: 'Two intersecting diagonal folds (4 layers)',
    punchCount: 1,
    resultingHoles: 4,
    holesLayout: '4 holes located near the midpoint of each of the 4 outer edges (North, South, East, West)',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-blue-50/60 border border-blue-200 rounded-xl">
        <div class="text-[10px] font-bold text-blue-800 px-2 py-0.5 bg-blue-100 rounded">2 Diagonal Folds</div>
        <svg width="55" height="55" viewBox="0 0 60 60"><polygon points="5,5 55,5 30,30" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><circle cx="30" cy="12" r="4.5" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Quarter-Square Fold with Outer Corner Punch',
    description: 'Square folded twice into a 4-layer quadrant. One hole is punched near the outer open corner (away from the folded center).',
    foldCount: 2,
    layerCount: 4,
    creaseType: 'Four-layer quadrant with outer corner punch',
    punchCount: 1,
    resultingHoles: 4,
    holesLayout: '4 holes positioned near the 4 extreme outer corners of the unfolded square',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-blue-50/60 border border-blue-200 rounded-xl">
        <div class="text-[10px] font-bold text-blue-800 px-2 py-0.5 bg-blue-100 rounded">2 Folds (Outer Corner)</div>
        <svg width="45" height="45" viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><circle cx="38" cy="38" r="5" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Accordion Tri-Fold (3 Equal Vertical Pleats)',
    description: 'Square sheet folded into 3 equal vertical panels like a Z-letter brochure (3 layers). Two holes are punched vertically.',
    foldCount: 2,
    layerCount: 3,
    creaseType: 'Tri-fold Z-pleat (3 vertical layers)',
    punchCount: 2,
    resultingHoles: 6,
    holesLayout: '6 holes arranged in 2 horizontal rows of 3 holes each across the sheet',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-blue-50/60 border border-blue-200 rounded-xl">
        <div class="text-[10px] font-bold text-blue-800 px-2 py-0.5 bg-blue-100 rounded">Tri-Fold (3 Layers)</div>
        <svg width="40" height="65" viewBox="0 0 40 70"><rect x="5" y="5" width="30" height="60" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><circle cx="20" cy="22" r="4" fill="#0f172a"/><circle cx="20" cy="48" r="4" fill="#0f172a"/></svg>
      </div>
    `,
  },
];

const ADVANCED_FA_RULES: FoldRule[] = [
  {
    tierTitle: 'Quarter-Square Fold + Dual Asymmetric Punches & Edge Notch',
    description: 'Folded twice into a 4-layer quadrant. One circular punch is made inside the quadrant AND a triangular V-notch is cut through the folded inner crease.',
    foldCount: 2,
    layerCount: 4,
    creaseType: '4-layer quadrant + interior crease notch',
    punchCount: 2,
    resultingHoles: 6,
    holesLayout: '4 circular quadrant holes PLUS 2 diamond-shaped cutouts along the central axis',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-amber-50/70 border border-amber-300 rounded-xl">
        <div class="text-[10px] font-bold text-amber-900 px-2 py-0.5 bg-amber-200 rounded">Advanced: Crease Notch + Punch</div>
        <svg width="50" height="50" viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" fill="#fde68a" stroke="#d97706" stroke-width="3"/><circle cx="30" cy="30" r="4.5" fill="#0f172a"/><polygon points="5,20 12,25 5,30" fill="#ffffff" stroke="#d97706" stroke-width="2"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Three Folds: Horizontal, Vertical & Diagonal (6-Layer Asymmetric Overlap)',
    description: 'Sheet folded horizontally (2 layers), then right half folded vertically (4 layers), then top corner folded diagonally (6 layers in overlap zone). Punched through the 6-layer region.',
    foldCount: 3,
    layerCount: 6,
    creaseType: '3 Asymmetric mixed folds (6-layer zone)',
    punchCount: 1,
    resultingHoles: 6,
    holesLayout: '6 holes: 4 symmetric quadrant holes plus 2 diagonally reflected upper-quadrant holes',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-amber-50/70 border border-amber-300 rounded-xl">
        <div class="text-[10px] font-bold text-amber-900 px-2 py-0.5 bg-amber-200 rounded">3 Folds (6 Layers)</div>
        <svg width="50" height="50" viewBox="0 0 50 50"><polygon points="5,5 45,5 45,45 5,25" fill="#fde68a" stroke="#d97706" stroke-width="3"/><circle cx="28" cy="18" r="4.5" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Four-Corner Inward Envelope Fold + 2 Offset Punches',
    description: 'All 4 corners of the square are folded inward to meet at the center (envelope fold). Two punches are made: one piercing the folded corner flaps and base, one piercing only the center.',
    foldCount: 4,
    layerCount: 5,
    creaseType: '4 Inward diagonal corner creases',
    punchCount: 2,
    resultingHoles: 5,
    holesLayout: '1 central hole surrounded by 4 outer corner-flap holes reflected across the 45° diagonals',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-amber-50/70 border border-amber-300 rounded-xl">
        <div class="text-[10px] font-bold text-amber-900 px-2 py-0.5 bg-amber-200 rounded">Envelope Diagonal Fold</div>
        <svg width="55" height="55" viewBox="0 0 60 60"><polygon points="30,5 55,30 30,55 5,30" fill="#fde68a" stroke="#d97706" stroke-width="3"/><circle cx="30" cy="30" r="4" fill="#0f172a"/><circle cx="30" cy="16" r="4" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Quarter Fold with Center-Apex & Diagonal Pair Punches',
    description: 'Folded into quarters (4 layers). One quarter-circle notch is cut out of the central 4-fold apex corner, and two off-axis holes are punched along the diagonal.',
    foldCount: 2,
    layerCount: 4,
    creaseType: 'Quadrant fold with apex cutout + 2 off-axis punches',
    punchCount: 3,
    resultingHoles: 9,
    holesLayout: '9 holes: 1 large central circular hole surrounded by 8 symmetric diagonal holes',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-amber-50/70 border border-amber-300 rounded-xl">
        <div class="text-[10px] font-bold text-amber-900 px-2 py-0.5 bg-amber-200 rounded">2 Folds + 3 Punches (9 Holes)</div>
        <svg width="50" height="50" viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" fill="#fde68a" stroke="#d97706" stroke-width="3"/><path d="M5,5 A8,8 0 0,1 13,5 L5,13 Z" fill="#0f172a"/><circle cx="22" cy="22" r="3.5" fill="#0f172a"/><circle cx="36" cy="36" r="3.5" fill="#0f172a"/></svg>
      </div>
    `,
  },
];

const EXPERT_FA_RULES: FoldRule[] = [
  {
    tierTitle: 'Three-Stage 8-Layer Octant Fold + Dual Radial Punches',
    description: 'Square folded horizontally (2 layers), vertically (4 layers), and diagonally across the quadrant (8 layers). Two distinct punches are made at different radii inside the octant.',
    foldCount: 3,
    layerCount: 8,
    creaseType: '8-layer triangular octant fold (horizontal + vertical + 45° diagonal)',
    punchCount: 2,
    resultingHoles: 16,
    holesLayout: '16 holes arranged in 2 concentric octagonal rings (8 inner ring holes + 8 outer ring holes)',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-purple-50/80 border border-purple-300 rounded-xl">
        <div class="text-[10px] font-black text-purple-900 px-2 py-0.5 bg-purple-200 rounded">EXPERT: 3 Folds (8 Layers &rarr; 16 Holes)</div>
        <svg width="55" height="55" viewBox="0 0 50 50"><polygon points="5,5 45,5 45,45" fill="#e9d5ff" stroke="#7e22ce" stroke-width="3"/><circle cx="24" cy="14" r="3.5" fill="#0f172a"/><circle cx="37" cy="22" r="3.5" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: '8-Layer Octant Fold + Hypotenuse Crease Notch & Interior Punch',
    description: 'Folded 3 times into an 8-layer right triangle octant. One circular punch is made in the interior (8 layers) AND one semi-circular notch is cut on the diagonal crease line.',
    foldCount: 3,
    layerCount: 8,
    creaseType: '8-layer octant with diagonal crease-line notch + interior punch',
    punchCount: 2,
    resultingHoles: 12,
    holesLayout: '12 holes: 8 octagonal interior holes PLUS 4 holes located directly on the main diagonals',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-purple-50/80 border border-purple-300 rounded-xl">
        <div class="text-[10px] font-black text-purple-900 px-2 py-0.5 bg-purple-200 rounded">EXPERT: 8 Layers + Diagonal Crease (12 Holes)</div>
        <svg width="55" height="55" viewBox="0 0 50 50"><polygon points="5,5 45,5 45,45" fill="#e9d5ff" stroke="#7e22ce" stroke-width="3"/><circle cx="32" cy="15" r="3.5" fill="#0f172a"/><circle cx="25" cy="25" r="4" fill="#be123c"/></svg>
      </div>
    `,
  },
  {
    tierTitle: 'Four-Stage 16-Layer Double-Pleat Grid Fold',
    description: 'Square folded twice horizontally (4 strips) and twice vertically (16-layer mini-square). One central punch is made through all 16 layers.',
    foldCount: 4,
    layerCount: 16,
    creaseType: '4 orthogonal folds creating a 4x4 grid (16 layers)',
    punchCount: 1,
    resultingHoles: 16,
    holesLayout: '16 evenly spaced holes forming a complete 4x4 matrix grid across the entire unfolded sheet',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-purple-50/80 border border-purple-300 rounded-xl">
        <div class="text-[10px] font-black text-purple-900 px-2 py-0.5 bg-purple-200 rounded">EXPERT: 4 Folds (16 Layers &rarr; 4x4 Grid)</div>
        <svg width="45" height="45" viewBox="0 0 40 40"><rect x="5" y="5" width="30" height="30" fill="#e9d5ff" stroke="#7e22ce" stroke-width="3"/><circle cx="20" cy="20" r="4" fill="#0f172a"/></svg>
      </div>
    `,
  },
  {
    tierTitle: '8-Layer Octant with Central Apex, Orthogonal Crease & Interior Punches',
    description: 'Folded 3 times into an 8-layer octant. Three cuts are made: (1) central apex tip (1 hole), (2) orthogonal folded edge (4 holes), and (3) interior body (8 holes).',
    foldCount: 3,
    layerCount: 8,
    creaseType: '8-layer octant with triple-boundary punches',
    punchCount: 3,
    resultingHoles: 13,
    holesLayout: '13 holes: 1 central hole + 4 axial cross holes + 8 octagonal ring holes',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-purple-50/80 border border-purple-300 rounded-xl">
        <div class="text-[10px] font-black text-purple-900 px-2 py-0.5 bg-purple-200 rounded">EXPERT: Triple-Boundary 8-Layer (13 Holes)</div>
        <svg width="55" height="55" viewBox="0 0 50 50"><polygon points="5,5 45,5 45,45" fill="#e9d5ff" stroke="#7e22ce" stroke-width="3"/><circle cx="5" cy="5" r="4" fill="#be123c"/><circle cx="25" cy="5" r="3.5" fill="#0f172a"/><circle cx="32" cy="18" r="3.5" fill="#0f172a"/></svg>
      </div>
    `,
  },
];

export const SUBTEST_7_QUESTIONS: Question[] = Array.from({ length: 100 }, (_, i) => {
  const qNum = i + 1;
  const id = `cat4-s7-${qNum}`;
  const complexityLevel: ComplexityLevel =
    qNum <= 25 ? 'Beginner' : qNum <= 50 ? 'Standard' : qNum <= 75 ? 'Advanced' : 'Expert';

  const rulePool =
    complexityLevel === 'Beginner'
      ? BEGINNER_FA_RULES
      : complexityLevel === 'Standard'
      ? STANDARD_FA_RULES
      : complexityLevel === 'Advanced'
      ? ADVANCED_FA_RULES
      : EXPERT_FA_RULES;

  const tierIndex = (qNum - 1) % 25;
  const spec = rulePool[tierIndex % rulePool.length];
  const orientationVariant = ['North-South Axis', 'East-West Axis', 'Primary Diagonal', 'Counter-Diagonal', 'CenteredQuadrant'][Math.floor(tierIndex / rulePool.length) % 5];

  const letterMap: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
  const targetLabel = letterMap[(qNum - 1) % 5];

  const builtOptions = letterMap.map((lbl, idx) => {
    if (lbl === targetLabel) {
      return {
        label: lbl,
        text: `Unfolded sheet with exactly ${spec.resultingHoles} hole(s): ${spec.holesLayout} (${orientationVariant})`,
      };
    }
    const distractorHoles = [
      Math.max(1, spec.resultingHoles - 2),
      spec.resultingHoles + 2,
      Math.max(2, Math.floor(spec.resultingHoles / 2)),
      spec.resultingHoles + 4,
      spec.resultingHoles,
    ][idx];
    const distractorDesc =
      distractorHoles === spec.resultingHoles
        ? `Unfolded sheet with ${distractorHoles} hole(s) but rotated 45° out of symmetry alignment`
        : `Unfolded sheet showing ${distractorHoles} holes in an incomplete reflection pattern`;
    return {
      label: lbl,
      text: distractorDesc,
    };
  });

  return {
    id,
    subtestId: 7,
    battery: 'Spatial',
    subtestName: 'Figure Analysis',
    stem: `[${complexityLevel} Tier — ${spec.foldCount} Fold(s), ${spec.layerCount} Layers] ${spec.description} Variant: ${orientationVariant}. When completely unfolded, how will the holes appear?`,
    diagramSvg: spec.diagramSvg,
    options: builtOptions,
    correctAnswer: targetLabel,
    explanation: `[${complexityLevel} Level Analysis] Because this sheet underwent ${spec.foldCount} fold(s) (${spec.creaseType}, ${spec.layerCount} layers) and ${spec.punchCount} punch(es), unfolding reflects the perforations into ${spec.resultingHoles} hole(s): ${spec.holesLayout}.`,
    hint: `Count the paper layers (${spec.layerCount} layers) and mirror each punch step-by-step across the ${spec.foldCount} crease line(s).`,
    difficulty: complexityLevel,
    complexityLevel,
    topicTag: `Figure Analysis - ${complexityLevel} (${spec.layerCount} Layers)`,
  };
});

interface HiddenShapeSpec {
  targetName: string;
  vertexCount: number;
  targetSvg: string;
  hostDescription: string;
  ruleExplanation: string;
}

const BEGINNER_HS_RULES: HiddenShapeSpec[] = [
  {
    targetName: 'Simple Equilateral Triangle (3 equal sides)',
    vertexCount: 3,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="50,15 85,80 15,80" fill="#a7f3d0" stroke="#059669" stroke-width="6"/></svg>`,
    hostDescription: 'Simple 4-line rooftop frame containing an upright equilateral triangle in the center',
    ruleExplanation: 'Beginner Level: The upright 3-sided equilateral triangle is directly visible in the center of the simple 4-line frame without rotation.',
  },
  {
    targetName: 'Basic Upright Square (4 equal 90° sides)',
    vertexCount: 4,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" fill="#a7f3d0" stroke="#059669" stroke-width="6"/></svg>`,
    hostDescription: 'Simple 2x2 windowpane grid containing the exact 60x60 upright square',
    ruleExplanation: 'Beginner Level: The outer border of the windowpane quadrant forms the exact upright square.',
  },
  {
    targetName: 'Horizontal Rectangle (Width 2x Height)',
    vertexCount: 4,
    targetSvg: `<svg width="55" height="45" viewBox="0 0 100 80"><rect x="10" y="20" width="80" height="40" fill="#a7f3d0" stroke="#059669" stroke-width="6"/></svg>`,
    hostDescription: 'Simple brick-wall two-row outline containing the exact horizontal rectangle',
    ruleExplanation: 'Beginner Level: The lower course of the two-row frame matches the exact 2:1 horizontal rectangle.',
  },
  {
    targetName: 'Right-Angled Corner Triangle',
    vertexCount: 3,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="20,20 20,80 80,80" fill="#a7f3d0" stroke="#059669" stroke-width="6"/></svg>`,
    hostDescription: 'Square bisected by a single diagonal line from top-left to bottom-right',
    ruleExplanation: 'Beginner Level: The lower-left half of the bisected square forms the exact right-angled triangle.',
  },
  {
    targetName: 'Symmetric Diamond Rhombus',
    vertexCount: 4,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="50,15 85,50 50,85 15,50" fill="#a7f3d0" stroke="#059669" stroke-width="6"/></svg>`,
    hostDescription: 'Square with midpoints connected to form an inscribed diamond',
    ruleExplanation: 'Beginner Level: Connecting the 4 midpoints of the outer square forms the exact upright diamond rhombus.',
  },
];

const STANDARD_HS_RULES: HiddenShapeSpec[] = [
  {
    targetName: 'Right-Angled Trapezoid (4 sides, 1 slanted edge)',
    vertexCount: 4,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="20,20 80,20 60,80 20,80" fill="#bfdbfe" stroke="#2563eb" stroke-width="6"/></svg>`,
    hostDescription: 'Standard bridge truss framework with vertical posts and 60° diagonal struts',
    ruleExplanation: 'Standard Level: One vertical post combined with an adjacent diagonal strut and horizontal chords forms the exact right-angled trapezoid.',
  },
  {
    targetName: 'Regular Pentagon Facet (5 equal sides)',
    vertexCount: 5,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="50,10 90,40 75,90 25,90 10,40" fill="#bfdbfe" stroke="#2563eb" stroke-width="6"/></svg>`,
    hostDescription: 'Standard geodesic dome 5-fold lattice',
    ruleExplanation: 'Standard Level: The central hub of the 5-fold geodesic lattice encloses the exact unrotated regular pentagon.',
  },
  {
    targetName: 'Symmetrical Regular Hexagon (6 sides)',
    vertexCount: 6,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="#bfdbfe" stroke="#2563eb" stroke-width="6"/></svg>`,
    hostDescription: 'Isometric triangular-hexagonal tiling grid',
    ruleExplanation: 'Standard Level: Six adjacent equilateral triangles around a vertex form the exact regular hexagon.',
  },
  {
    targetName: 'Slanted Parallelogram (Opposite sides parallel)',
    vertexCount: 4,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="30,25 85,25 70,75 15,75" fill="#bfdbfe" stroke="#2563eb" stroke-width="6"/></svg>`,
    hostDescription: 'Intersecting sets of parallel horizontal and 75°-slanted lines',
    ruleExplanation: 'Standard Level: Two horizontal lines crossed by two parallel slanted lines enclose this exact parallelogram.',
  },
  {
    targetName: 'Symmetric Geometric Kite (2 short, 2 long edges)',
    vertexCount: 4,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="50,12 80,42 50,88 20,42" fill="#bfdbfe" stroke="#2563eb" stroke-width="6"/></svg>`,
    hostDescription: 'Overlapping 8-pointed star polygon lattice',
    ruleExplanation: 'Standard Level: The upper-central facet of the star lattice matches the exact proportions of the geometric kite.',
  },
];

const ADVANCED_HS_RULES: HiddenShapeSpec[] = [
  {
    targetName: 'Concave Chevron / Re-entrant Arrowhead (4 sides, 1 reflex angle)',
    vertexCount: 4,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="50,12 88,85 50,62 12,85" fill="#fde68a" stroke="#d97706" stroke-width="6"/></svg>`,
    hostDescription: 'Dense herringbone parquet lattice with intersecting cross-diagonals',
    ruleExplanation: 'Advanced Level: Isolating the upper apex and inner reflex vertex within the herringbone lattice reveals the exact concave chevron.',
  },
  {
    targetName: 'Asymmetric L-Shaped Hexomino (6 orthogonal edges)',
    vertexCount: 6,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="20,15 50,15 50,55 85,55 85,85 20,85" fill="#fde68a" stroke="#d97706" stroke-width="6"/></svg>`,
    hostDescription: 'Complex Mondrian-style subdivided architectural floorplan grid',
    ruleExplanation: 'Advanced Level: Combining the left vertical bay with the bottom horizontal extension in the floorplan forms the exact 6-sided L-polygon.',
  },
  {
    targetName: 'Non-Convex Reflex Bowtie / Hourglass Polygon (6 vertices)',
    vertexCount: 6,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="20,15 80,15 62,50 80,85 20,85 38,50" fill="#fde68a" stroke="#d97706" stroke-width="6"/></svg>`,
    hostDescription: 'Multi-layered hyperboloid structural tower wireframe',
    ruleExplanation: 'Advanced Level: Tracing the waisted inner struts and horizontal ring beams isolates the exact 6-vertex concave hourglass.',
  },
  {
    targetName: 'Oblique Scalene Dart (Asymmetric 5-vertex polygon)',
    vertexCount: 5,
    targetSvg: `<svg width="45" height="45" viewBox="0 0 100 100"><polygon points="15,20 75,15 90,55 45,85 25,55" fill="#fde68a" stroke="#d97706" stroke-width="6"/></svg>`,
    hostDescription: 'Voronoi-style irregular polygonal crystal grain mesh',
    ruleExplanation: 'Advanced Level: Only Pattern C contains all 5 asymmetric edge lengths and exact internal angles without reflection.',
  },
];

const EXPERT_HS_RULES: HiddenShapeSpec[] = [
  {
    targetName: 'Stepped Z-Octagon Polyform (8 orthogonal vertices, 2 reflex corners)',
    vertexCount: 8,
    targetSvg: `<svg width="48" height="48" viewBox="0 0 100 100"><polygon points="15,20 60,20 60,45 85,45 85,80 40,80 40,55 15,55" fill="#e9d5ff" stroke="#7e22ce" stroke-width="5"/></svg>`,
    hostDescription: 'High-density VLSI integrated circuit multi-layer routing lattice with rotated decoys',
    ruleExplanation: 'Expert Level: You must verify both step offsets (45-unit upper span, 25-unit vertical drop, 45-unit lower span) amidst 90°-rotated decoy traces.',
  },
  {
    targetName: 'Asymmetric Re-Entrant Crown Heptagon (7 vertices, 2 concave notches)',
    vertexCount: 7,
    targetSvg: `<svg width="48" height="48" viewBox="0 0 100 100"><polygon points="15,80 15,25 40,50 55,15 75,50 90,30 85,80" fill="#e9d5ff" stroke="#7e22ce" stroke-width="5"/></svg>`,
    hostDescription: 'Overlapping Penrose aperiodic quasicrystal star-and-rhomb tessellation',
    ruleExplanation: 'Expert Level: The asymmetric 7-vertex crown profile requires simultaneous verification of two unequal valley angles (40,50 and 75,50) and the slanted right wall.',
  },
  {
    targetName: 'Compound 10-Vertex Asymmetric Cross-Tile',
    vertexCount: 10,
    targetSvg: `<svg width="48" height="48" viewBox="0 0 100 100"><polygon points="35,10 65,10 65,35 90,35 90,65 65,65 65,90 35,90 35,65 10,50" fill="#e9d5ff" stroke="#7e22ce" stroke-width="5"/></svg>`,
    hostDescription: 'Islamic geometric girih star-and-decagon interlace mesh with diagonal overpasses',
    ruleExplanation: 'Expert Level: Notice the left arm terminates in a 45° pointed apex (10,50) while the other three arms are flat-ended — eliminating the 4-way symmetric decoys.',
  },
  {
    targetName: 'Non-Convex 9-Vertex Sawtooth Claw Polygon',
    vertexCount: 9,
    targetSvg: `<svg width="48" height="48" viewBox="0 0 100 100"><polygon points="15,20 85,20 70,45 90,45 65,75 80,90 20,90 35,55 15,55" fill="#e9d5ff" stroke="#7e22ce" stroke-width="5"/></svg>`,
    hostDescription: 'Dense triangulated finite-element engineering stress mesh with 40+ overlapping edges',
    ruleExplanation: 'Expert Level: Tracing the double sawtooth overhang on the right edge and single step on the left edge isolates the exact 9-vertex boundary.',
  },
];

export const SUBTEST_8_QUESTIONS: Question[] = Array.from({ length: 100 }, (_, i) => {
  const qNum = i + 1;
  const id = `cat4-s8-${qNum}`;
  const complexityLevel: ComplexityLevel =
    qNum <= 25 ? 'Beginner' : qNum <= 50 ? 'Standard' : qNum <= 75 ? 'Advanced' : 'Expert';

  const rulePool =
    complexityLevel === 'Beginner'
      ? BEGINNER_HS_RULES
      : complexityLevel === 'Standard'
      ? STANDARD_HS_RULES
      : complexityLevel === 'Advanced'
      ? ADVANCED_HS_RULES
      : EXPERT_HS_RULES;

  const tierIndex = (qNum - 1) % 25;
  const spec = rulePool[tierIndex % rulePool.length];
  const gridSector = ['Top-Left Sector', 'Center-Right Sector', 'Lower-Central Sector', 'Upper-Right Quadrant', 'Inner Core Lattice'][Math.floor(tierIndex / rulePool.length) % 5];

  const letterMap: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
  const targetLabel = letterMap[(qNum - 1) % 5];

  const builtOptions = letterMap.map((lbl, idx) => {
    if (lbl === targetLabel) {
      return {
        label: lbl,
        text: `Pattern ${lbl}: ${spec.hostDescription} (Exact unrotated ${spec.vertexCount}-vertex match in ${gridSector})`,
      };
    }
    const distractorReasons = [
      `Pattern ${lbl}: Contains shape rotated 90° clockwise (orientation mismatch)`,
      `Pattern ${lbl}: Contains shape scaled to 75% size (proportion mismatch)`,
      `Pattern ${lbl}: Missing one internal closing segment (${spec.vertexCount - 1} edges only)`,
      `Pattern ${lbl}: Mirror-reflected horizontal decoy of the target polygon`,
      `Pattern ${lbl}: Skewed angles (+15° shear distortion)`,
    ];
    return { label: lbl, text: distractorReasons[idx] };
  });

  return {
    id,
    subtestId: 8,
    battery: 'Spatial',
    subtestName: 'Figure Recognition',
    stem: `[${complexityLevel} Tier — ${spec.vertexCount}-Vertex Target] Find the concealed shape: [${spec.targetName}]. In which complex figure (A–E) is this exact polygon embedded in the ${gridSector} without rotation, reflection, or scale change?`,
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-3 bg-slate-50 border rounded-xl">
        <div class="flex flex-col items-center gap-1">
          <span class="text-[10px] font-bold text-slate-700 uppercase">${complexityLevel} Target Shape (${spec.vertexCount} Vertices)</span>
          ${spec.targetSvg}
        </div>
      </div>
    `,
    options: builtOptions,
    correctAnswer: targetLabel,
    explanation: `${spec.ruleExplanation} In Pattern ${targetLabel} (${gridSector}), all ${spec.vertexCount} vertices and edge angles match 1:1 without rotation.`,
    hint: `Focus on the ${spec.vertexCount} vertices and distinctive angles of the [${spec.targetName}] without mentally rotating the figure.`,
    difficulty: complexityLevel,
    complexityLevel,
    topicTag: `Figure Recognition - ${complexityLevel} (${spec.vertexCount} Vertices)`,
  };
});
