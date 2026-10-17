import { Question } from '../types/exam';

export const DEFAULT_QUESTIONS: Question[] = [
  // ==========================================
  // SUBTEST 1: Figure Classification (Non-Verbal) - 6 Questions
  // ==========================================
  {
    id: 'fc-101',
    subtestId: 1,
    battery: 'Non-Verbal',
    subtestName: 'Figure Classification',
    stem: 'Look at the first group of three shapes. They share a specific geometric rule. Which of the options (A-E) belongs with them?',
    diagramSvg: `
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Group (Rule: Shapes with 3 straight sides)</span>
        <div class="flex items-center justify-center gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <svg width="70" height="70" viewBox="0 0 100 100" class="drop-shadow-sm">
            <polygon points="50,15 85,85 15,85" fill="#fbcfe8" stroke="#db2777" stroke-width="6"/>
          </svg>
          <svg width="70" height="70" viewBox="0 0 100 100" class="drop-shadow-sm">
            <polygon points="20,20 20,80 80,80" fill="#fbcfe8" stroke="#db2777" stroke-width="6"/>
          </svg>
          <svg width="70" height="70" viewBox="0 0 100 100" class="drop-shadow-sm">
            <polygon points="50,85 85,15 15,15" fill="#fbcfe8" stroke="#db2777" stroke-width="6"/>
          </svg>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Square (4 sides)' },
      { label: 'B', text: 'Equilateral Triangle (3 sides)' },
      { label: 'C', text: 'Circle (0 straight sides)' },
      { label: 'D', text: 'Pentagon (5 sides)' },
      { label: 'E', text: 'Hexagon (6 sides)' },
    ],
    correctAnswer: 'B',
    explanation: 'Every shape in the target group is a three-sided polygon (triangle). Option B is an equilateral triangle, which has exactly 3 straight sides.',
    hint: 'Count the number of vertices and straight line segments in each figure.',
    difficulty: 'Foundation',
  },
  {
    id: 'fc-102',
    subtestId: 1,
    battery: 'Non-Verbal',
    subtestName: 'Figure Classification',
    stem: 'Which shape belongs with the target group? Identify the shading and border relationship.',
    diagramSvg: `
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Group (Rule: Outer shape unshaded, exactly 2 solid black dots inside)</span>
        <div class="flex items-center justify-center gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <!-- Square with 2 dots -->
          <svg width="70" height="70" viewBox="0 0 100 100">
            <rect x="15" y="15" width="70" height="70" fill="none" stroke="#1e293b" stroke-width="5" rx="8"/>
            <circle cx="35" cy="50" r="7" fill="#1e293b"/>
            <circle cx="65" cy="50" r="7" fill="#1e293b"/>
          </svg>
          <!-- Circle with 2 dots -->
          <svg width="70" height="70" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#1e293b" stroke-width="5"/>
            <circle cx="50" cy="35" r="7" fill="#1e293b"/>
            <circle cx="50" cy="65" r="7" fill="#1e293b"/>
          </svg>
          <!-- Triangle with 2 dots -->
          <svg width="70" height="70" viewBox="0 0 100 100">
            <polygon points="50,15 85,80 15,80" fill="none" stroke="#1e293b" stroke-width="5"/>
            <circle cx="42" cy="62" r="7" fill="#1e293b"/>
            <circle cx="58" cy="62" r="7" fill="#1e293b"/>
          </svg>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Hexagon containing 3 solid black dots' },
      { label: 'B', text: 'Pentagon with no dots' },
      { label: 'C', text: 'Diamond containing exactly 2 solid black dots' },
      { label: 'D', text: 'Shaded circle with 1 white dot' },
      { label: 'E', text: 'Square with 4 corner dots' },
    ],
    correctAnswer: 'C',
    explanation: 'The common rule across all three target shapes is that they are hollow outlines containing exactly 2 filled black dots. Option C matches this rule.',
    hint: 'Observe both the fill of the container shape and the quantity of inner items.',
    difficulty: 'Standard',
  },
  {
    id: 'fc-103',
    subtestId: 1,
    battery: 'Non-Verbal',
    subtestName: 'Figure Classification',
    stem: 'Determine which figure belongs in the given set based on symmetry and line types.',
    diagramSvg: `
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Group (Rule: Divided vertically in half, left side striped, right side blank)</span>
        <div class="flex items-center justify-center gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <svg width="70" height="70" viewBox="0 0 100 100">
            <rect x="20" y="20" width="30" height="60" fill="#cbd5e1" stroke="#334155" stroke-width="4"/>
            <rect x="50" y="20" width="30" height="60" fill="white" stroke="#334155" stroke-width="4"/>
          </svg>
          <svg width="70" height="70" viewBox="0 0 100 100">
            <path d="M50,15 A35,35 0 0,0 50,85 Z" fill="#cbd5e1" stroke="#334155" stroke-width="4"/>
            <path d="M50,15 A35,35 0 0,1 50,85 Z" fill="white" stroke="#334155" stroke-width="4"/>
          </svg>
          <svg width="70" height="70" viewBox="0 0 100 100">
            <polygon points="50,15 20,85 50,85" fill="#cbd5e1" stroke="#334155" stroke-width="4"/>
            <polygon points="50,15 80,85 50,85" fill="white" stroke="#334155" stroke-width="4"/>
          </svg>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Oval with top shaded, bottom blank' },
      { label: 'B', text: 'Hexagon with left half shaded, right half blank' },
      { label: 'C', text: 'Entirely shaded square' },
      { label: 'D', text: 'Shape with right half shaded, left half blank' },
      { label: 'E', text: 'Star with center circle shaded' },
    ],
    correctAnswer: 'B',
    explanation: 'Each target shape is bisected along a vertical line of symmetry, with the left half shaded and the right half unshaded. Option B adheres to this exact orientation and pattern.',
    hint: 'Check which side of the vertical dividing line is shaded.',
    difficulty: 'Standard',
  },
  {
    id: 'fc-104',
    subtestId: 1,
    battery: 'Non-Verbal',
    subtestName: 'Figure Classification',
    stem: 'Which figure belongs with this group? (Focus on line intersections and open vs closed paths)',
    diagramSvg: `
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Group (Rule: Closed shapes with curved boundaries only, no straight lines)</span>
        <div class="flex items-center justify-center gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <svg width="70" height="70" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#db2777" stroke-width="6"/>
          </svg>
          <svg width="70" height="70" viewBox="0 0 100 100">
            <ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke="#db2777" stroke-width="6"/>
          </svg>
          <svg width="70" height="70" viewBox="0 0 100 100">
            <path d="M50,20 C70,10 90,40 75,75 C60,90 40,85 25,70 C10,50 30,25 50,20 Z" fill="none" stroke="#db2777" stroke-width="6"/>
          </svg>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Crescent Moon (smooth curve boundary, no corners)' },
      { label: 'B', text: 'Semicircle with a straight bottom diameter' },
      { label: 'C', text: 'Octagon' },
      { label: 'D', text: 'Chevron Arrow' },
      { label: 'E', text: 'Right Triangle' },
    ],
    correctAnswer: 'A',
    explanation: 'All shapes in the group are completely smooth closed curved boundaries without any straight edges or vertices. The Crescent Moon (Option A) is enclosed exclusively by smooth curved lines.',
    hint: 'Make sure there are no straight lines or sharp vertices.',
    difficulty: 'Advanced',
  },
  {
    id: 'fc-105',
    subtestId: 1,
    battery: 'Non-Verbal',
    subtestName: 'Figure Classification',
    stem: 'Which option matches the geometric progression rule of nested shapes?',
    diagramSvg: `
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Group (Rule: Inner shape has exactly 1 MORE side than outer shape)</span>
        <div class="flex items-center justify-center gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <!-- Triangle (3) inside nothing, Square (4) inside Triangle (3) -->
          <svg width="75" height="75" viewBox="0 0 100 100">
            <polygon points="50,10 90,85 10,85" fill="none" stroke="#0f172a" stroke-width="4"/>
            <rect x="35" y="45" width="30" height="30" fill="#f43f5e" stroke="#0f172a" stroke-width="3"/>
          </svg>
          <!-- Pentagon (5) inside Square (4) -->
          <svg width="75" height="75" viewBox="0 0 100 100">
            <rect x="15" y="15" width="70" height="70" fill="none" stroke="#0f172a" stroke-width="4"/>
            <polygon points="50,30 75,48 65,75 35,75 25,48" fill="#f43f5e" stroke="#0f172a" stroke-width="3"/>
          </svg>
          <!-- Hexagon (6) inside Pentagon (5) -->
          <svg width="75" height="75" viewBox="0 0 100 100">
            <polygon points="50,15 85,38 75,80 25,80 15,38" fill="none" stroke="#0f172a" stroke-width="4"/>
            <polygon points="50,35 68,45 68,65 50,75 32,65 32,45" fill="#f43f5e" stroke="#0f172a" stroke-width="3"/>
          </svg>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Triangle inside a Hexagon' },
      { label: 'B', text: 'Heptagon (7 sides) inside a Hexagon (6 sides)' },
      { label: 'C', text: 'Square inside a Square' },
      { label: 'D', text: 'Circle inside a Triangle' },
      { label: 'E', text: 'Square inside an Octagon' },
    ],
    correctAnswer: 'B',
    explanation: 'Rule: The inner shape has N+1 sides where the outer shape has N sides (Triangle 3 -> Square 4; Square 4 -> Pentagon 5; Pentagon 5 -> Hexagon 6). A Heptagon (7) inside a Hexagon (6) follows this exact relationship (6 + 1 = 7).',
    hint: 'Compare the number of sides: Inner sides = Outer sides + 1.',
    difficulty: 'Advanced',
  },
  {
    id: 'fc-106',
    subtestId: 1,
    battery: 'Non-Verbal',
    subtestName: 'Figure Classification',
    stem: 'Which shape belongs with this group based on orientation and arrows?',
    diagramSvg: `
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Group (Rule: Clockwise circular motion arrows)</span>
        <div class="flex items-center justify-center gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <svg width="70" height="70" viewBox="0 0 100 100">
            <path d="M30,30 A30,30 0 0,1 75,40" fill="none" stroke="#db2777" stroke-width="5" marker-end="url(#arrow)"/>
            <polygon points="75,45 85,35 70,30" fill="#db2777"/>
          </svg>
          <svg width="70" height="70" viewBox="0 0 100 100">
            <path d="M70,70 A30,30 0 0,1 25,60" fill="none" stroke="#db2777" stroke-width="5"/>
            <polygon points="25,55 15,65 30,70" fill="#db2777"/>
          </svg>
          <svg width="70" height="70" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="4,4"/>
            <polygon points="50,15 65,22 55,27" fill="#db2777"/>
          </svg>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Curved arrow pointing clockwise around a circle' },
      { label: 'B', text: 'Curved arrow pointing counter-clockwise' },
      { label: 'C', text: 'Straight vertical arrow pointing downward' },
      { label: 'D', text: 'Double-headed arrow pointing left and right' },
      { label: 'E', text: 'Crossed diagonal arrows' },
    ],
    correctAnswer: 'A',
    explanation: 'All arrows in the prompt indicate rotation in a clockwise direction. Option A is the only choice that continues the clockwise rotational rule.',
    hint: 'Trace the motion of a clock hand (top to right, bottom to left).',
    difficulty: 'Standard',
  },

  // ==========================================
  // SUBTEST 2: Figure Matrices (Non-Verbal) - 6 Questions
  // ==========================================
  {
    id: 'fm-201',
    subtestId: 2,
    battery: 'Non-Verbal',
    subtestName: 'Figure Matrices',
    stem: 'Complete the 2x2 matrix analogy. Top row shows: Unshaded Square becomes Shaded Square. Bottom row: Unshaded Circle becomes ?',
    diagramSvg: `
      <div class="flex justify-center p-4">
        <div class="grid grid-cols-2 gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <!-- Top Left -->
          <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center bg-white">
            <svg width="50" height="50" viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="none" stroke="#0f172a" stroke-width="6"/></svg>
          </div>
          <!-- Top Right -->
          <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center bg-white">
            <svg width="50" height="50" viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="#0f766e" stroke="#0f172a" stroke-width="6"/></svg>
          </div>
          <!-- Bottom Left -->
          <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center bg-white">
            <svg width="50" height="50" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="none" stroke="#0f172a" stroke-width="6"/></svg>
          </div>
          <!-- Bottom Right (Target) -->
          <div class="w-20 h-20 border-2 border-teal-500 bg-teal-50 rounded-lg flex items-center justify-center font-bold text-2xl text-teal-700">
            ?
          </div>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Shaded Triangle' },
      { label: 'B', text: 'Solid Shaded Circle' },
      { label: 'C', text: 'Unshaded Square' },
      { label: 'D', text: 'Circle with a horizontal line' },
      { label: 'E', text: 'Two small concentric circles' },
    ],
    correctAnswer: 'B',
    explanation: 'Rule: The shape remains identical in geometry and size, but transitions from empty outline to completely shaded fill. A hollow circle transforms into a solid shaded circle.',
    hint: 'Look horizontally from left to right to see what changed.',
    difficulty: 'Foundation',
  },
  {
    id: 'fm-202',
    subtestId: 2,
    battery: 'Non-Verbal',
    subtestName: 'Figure Matrices',
    stem: 'Identify the transformation rule across rows: Direction reflection and inversion.',
    diagramSvg: `
      <div class="flex justify-center p-4">
        <div class="grid grid-cols-2 gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <!-- Top Left: Arrow Up -->
          <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center bg-white">
            <svg width="50" height="50" viewBox="0 0 100 100"><line x1="50" y1="80" x2="50" y2="20" stroke="#1e293b" stroke-width="6"/><polygon points="50,15 35,35 65,35" fill="#1e293b"/></svg>
          </div>
          <!-- Top Right: Arrow Down -->
          <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center bg-white">
            <svg width="50" height="50" viewBox="0 0 100 100"><line x1="50" y1="20" x2="50" y2="80" stroke="#1e293b" stroke-width="6"/><polygon points="50,85 35,65 65,65" fill="#1e293b"/></svg>
          </div>
          <!-- Bottom Left: Arrow Right -->
          <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center bg-white">
            <svg width="50" height="50" viewBox="0 0 100 100"><line x1="20" y1="50" x2="80" y2="50" stroke="#1e293b" stroke-width="6"/><polygon points="85,50 65,35 65,65" fill="#1e293b"/></svg>
          </div>
          <!-- Bottom Right (Target) -->
          <div class="w-20 h-20 border-2 border-teal-500 bg-teal-50 rounded-lg flex items-center justify-center font-bold text-2xl text-teal-700">
            ?
          </div>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Arrow pointing Left' },
      { label: 'B', text: 'Arrow pointing Up' },
      { label: 'C', text: 'Arrow pointing Diagonally' },
      { label: 'D', text: 'Double Arrow pointing Up and Down' },
      { label: 'E', text: 'Arrow pointing Right with circle base' },
    ],
    correctAnswer: 'A',
    explanation: 'The transformation across row 1 is a 180-degree reflection (Up reverses to Down). Applying 180-degree reversal to Right Arrow produces an Arrow pointing Left.',
    hint: 'The arrow reverses its direction by 180 degrees.',
    difficulty: 'Standard',
  },
  {
    id: 'fm-203',
    subtestId: 2,
    battery: 'Non-Verbal',
    subtestName: 'Figure Matrices',
    stem: 'Which figure completes the 2x2 matrix? Observe rotation and internal components.',
    diagramSvg: `
      <div class="flex justify-center p-4">
        <div class="grid grid-cols-2 gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <!-- Top Left: Triangle with dot at apex -->
          <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center bg-white">
            <svg width="55" height="55" viewBox="0 0 100 100"><polygon points="50,20 85,80 15,80" fill="none" stroke="#334155" stroke-width="5"/><circle cx="50" cy="35" r="6" fill="#334155"/></svg>
          </div>
          <!-- Top Right: Triangle rotated 90 deg clockwise with dot -->
          <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center bg-white">
            <svg width="55" height="55" viewBox="0 0 100 100"><polygon points="80,50 20,85 20,15" fill="none" stroke="#334155" stroke-width="5"/><circle cx="65" cy="50" r="6" fill="#334155"/></svg>
          </div>
          <!-- Bottom Left: L-shape pointing Up-Right -->
          <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center bg-white">
            <svg width="55" height="55" viewBox="0 0 100 100"><path d="M30,20 L30,80 L80,80" fill="none" stroke="#334155" stroke-width="6"/><circle cx="30" cy="25" r="6" fill="#334155"/></svg>
          </div>
          <!-- Bottom Right (Target) -->
          <div class="w-20 h-20 border-2 border-teal-500 bg-teal-50 rounded-lg flex items-center justify-center font-bold text-2xl text-teal-700">
            ?
          </div>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'L-shape rotated 90° clockwise with dot at the tip' },
      { label: 'B', text: 'L-shape flipped horizontally with no dot' },
      { label: 'C', text: 'Upside-down T-shape' },
      { label: 'D', text: 'L-shape rotated 180°' },
      { label: 'E', text: 'Square with center dot' },
    ],
    correctAnswer: 'A',
    explanation: 'The figure rotates 90 degrees clockwise while retaining the dot position at the leading tip. Rotating the L-shape 90 degrees clockwise yields Option A.',
    hint: 'Rotate the entire figure clockwise by 90 degrees.',
    difficulty: 'Standard',
  },
  {
    id: 'fm-204',
    subtestId: 2,
    battery: 'Non-Verbal',
    subtestName: 'Figure Matrices',
    stem: 'Solve the matrix analogy: Combining shapes and boolean overlap rules.',
    diagramSvg: `
      <div class="flex justify-center p-4">
        <div class="grid grid-cols-2 gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <div class="w-20 h-20 border border-slate-300 rounded flex items-center justify-center bg-white text-xs font-semibold text-slate-700">Outer Square + Inner Circle</div>
          <div class="w-20 h-20 border border-slate-300 rounded flex items-center justify-center bg-white text-xs font-semibold text-slate-700">Outer Circle + Inner Square (Inverted)</div>
          <div class="w-20 h-20 border border-slate-300 rounded flex items-center justify-center bg-white text-xs font-semibold text-slate-700">Outer Triangle + Inner Hexagon</div>
          <div class="w-20 h-20 border-2 border-teal-500 bg-teal-50 rounded flex items-center justify-center font-bold text-2xl text-teal-700">?</div>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Outer Hexagon + Inner Triangle' },
      { label: 'B', text: 'Outer Circle + Inner Triangle' },
      { label: 'C', text: 'Two Hexagons' },
      { label: 'D', text: 'Two Triangles' },
      { label: 'E', text: 'Outer Square + Inner Hexagon' },
    ],
    correctAnswer: 'A',
    explanation: 'The rule is role reversal: the outer container and inner contained shape swap roles. Outer Triangle + Inner Hexagon swaps to become Outer Hexagon + Inner Triangle.',
    hint: 'Inner becomes outer, outer becomes inner.',
    difficulty: 'Standard',
  },
  {
    id: 'fm-205',
    subtestId: 2,
    battery: 'Non-Verbal',
    subtestName: 'Figure Matrices',
    stem: 'Matrix completion: Counting line elements and subtractive rules.',
    diagramSvg: `
      <div class="flex justify-center p-4">
        <div class="grid grid-cols-2 gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
          <div class="w-20 h-20 border border-slate-300 rounded flex items-center justify-center bg-white text-xs font-bold">4 Spokes in Wheel</div>
          <div class="w-20 h-20 border border-slate-300 rounded flex items-center justify-center bg-white text-xs font-bold">3 Spokes in Wheel (-1)</div>
          <div class="w-20 h-20 border border-slate-300 rounded flex items-center justify-center bg-white text-xs font-bold">5 Petals in Flower</div>
          <div class="w-20 h-20 border-2 border-teal-500 bg-teal-50 rounded flex items-center justify-center font-bold text-2xl text-teal-700">?</div>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: '3 Petals in Flower' },
      { label: 'B', text: '4 Petals in Flower' },
      { label: 'C', text: '6 Petals in Flower' },
      { label: 'D', text: '5 Spokes in Wheel' },
      { label: 'E', text: 'No Petals' },
    ],
    correctAnswer: 'B',
    explanation: 'The operation across rows reduces the constituent repeating components by exactly 1 (4 spokes -> 3 spokes). Therefore, 5 petals reduce by 1 to 4 petals.',
    hint: 'Count the components and subtract 1.',
    difficulty: 'Foundation',
  },
  {
    id: 'fm-206',
    subtestId: 2,
    battery: 'Non-Verbal',
    subtestName: 'Figure Matrices',
    stem: 'Complete the 3x3 pattern matrix rule: Horizontal addition of features.',
    diagramSvg: `
      <div class="flex justify-center p-4">
        <div class="p-4 bg-slate-50 border-2 border-slate-300 rounded-xl text-center">
          <p class="text-xs font-bold text-slate-600 mb-2">Row 1: [Circle] + [Horizontal Line] = [Circle with line through it]</p>
          <p class="text-xs font-bold text-slate-600 mb-2">Row 2: [Square] + [Diagonal Line] = [Square with diagonal slash]</p>
          <p class="text-xs font-bold text-teal-700">Row 3: [Diamond] + [Plus Sign (+)] = [ ? ]</p>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Diamond with Plus Sign (+) centered inside' },
      { label: 'B', text: 'Diamond with single horizontal line' },
      { label: 'C', text: 'Square with plus sign' },
      { label: 'D', text: 'Empty Diamond' },
      { label: 'E', text: 'Circle with plus sign' },
    ],
    correctAnswer: 'A',
    explanation: 'The transformation superimposes (adds) the second shape onto the interior of the first shape. A Diamond combined with a Plus Sign yields a Diamond with a Plus Sign centered inside.',
    hint: 'Superimpose the second element onto the first element.',
    difficulty: 'Standard',
  },

  // ==========================================
  // SUBTEST 3: Verbal Classification (Verbal) - 6 Questions
  // ==========================================
  {
    id: 'vc-301',
    subtestId: 3,
    battery: 'Verbal',
    subtestName: 'Verbal Classification',
    stem: 'Which word belongs with the first three: OAK, PINE, BIRCH',
    options: [
      { label: 'A', text: 'Rose' },
      { label: 'B', text: 'Willow' },
      { label: 'C', text: 'Grass' },
      { label: 'D', text: 'Acorn' },
      { label: 'E', text: 'Branch' },
    ],
    correctAnswer: 'B',
    explanation: 'Oak, Pine, and Birch are all species of deciduous or coniferous trees. Willow is also a species of tree. Rose is a flowering shrub; grass is lawn/turf; acorn and branch are parts of trees rather than entire tree species.',
    hint: 'Group by botanical category: these are all species of trees.',
    difficulty: 'Foundation',
  },
  {
    id: 'vc-302',
    subtestId: 3,
    battery: 'Verbal',
    subtestName: 'Verbal Classification',
    stem: 'Which word goes with: GUITAR, VIOLIN, CELLO',
    options: [
      { label: 'A', text: 'Drum' },
      { label: 'B', text: 'Flute' },
      { label: 'C', text: 'Harp' },
      { label: 'D', text: 'Trumpet' },
      { label: 'E', text: 'Piano' },
    ],
    correctAnswer: 'C',
    explanation: 'Guitar, Violin, and Cello are stringed acoustic instruments. A Harp is also a stringed acoustic instrument. Drums are percussion; flute and trumpet are wind/brass instruments.',
    hint: 'Think about how the musical sound is produced (vibrating strings).',
    difficulty: 'Foundation',
  },
  {
    id: 'vc-303',
    subtestId: 3,
    battery: 'Verbal',
    subtestName: 'Verbal Classification',
    stem: 'Which word belongs with the given group: ATOM, MOLECULE, CELL',
    options: [
      { label: 'A', text: 'Organism' },
      { label: 'B', text: 'Microscope' },
      { label: 'C', text: 'Laboratory' },
      { label: 'D', text: 'Experiment' },
      { label: 'E', text: 'Science' },
    ],
    correctAnswer: 'A',
    explanation: 'Atom, Molecule, and Cell represent biological/physical levels of structural organization in ascending order. Organism is the biological structural entity in this hierarchy. The others are tools, settings, or abstract subjects.',
    hint: 'Levels of biological and matter organization.',
    difficulty: 'Standard',
  },
  {
    id: 'vc-304',
    subtestId: 3,
    battery: 'Verbal',
    subtestName: 'Verbal Classification',
    stem: 'Which word goes with: SPRINT, JOG, GALLOP',
    options: [
      { label: 'A', text: 'Rest' },
      { label: 'B', text: 'Stride' },
      { label: 'C', text: 'Stationary' },
      { label: 'D', text: 'Bicycle' },
      { label: 'E', text: 'Track' },
    ],
    correctAnswer: 'B',
    explanation: 'Sprint, Jog, and Gallop are all gaits or modes of rapid biological locomotion on foot. Stride is also a mode of forward walking/running movement.',
    hint: 'Words describing modes of moving on foot.',
    difficulty: 'Standard',
  },
  {
    id: 'vc-305',
    subtestId: 3,
    battery: 'Verbal',
    subtestName: 'Verbal Classification',
    stem: 'Which word belongs with: COMPASS, PROTRACTOR, RULER',
    options: [
      { label: 'A', text: 'Book' },
      { label: 'B', text: 'Set Square' },
      { label: 'C', text: 'Eraser' },
      { label: 'D', text: 'Ink' },
      { label: 'E', text: 'Backpack' },
    ],
    correctAnswer: 'B',
    explanation: 'Compass, Protractor, and Ruler are geometric drawing and measurement instruments. A Set Square is also an instrument used for geometric angle and line construction.',
    hint: 'Geometry drawing and measurement tools.',
    difficulty: 'Standard',
  },
  {
    id: 'vc-306',
    subtestId: 3,
    battery: 'Verbal',
    subtestName: 'Verbal Classification',
    stem: 'Which word belongs with: OXYGEN, NITROGEN, HELIUM',
    options: [
      { label: 'A', text: 'Water' },
      { label: 'B', text: 'Argon' },
      { label: 'C', text: 'Iron' },
      { label: 'D', text: 'Carbon Dioxide' },
      { label: 'E', text: 'Salt' },
    ],
    correctAnswer: 'B',
    explanation: 'Oxygen, Nitrogen, and Helium are elemental gases at room temperature. Argon is also a noble elemental gas. Water and Carbon Dioxide are chemical compounds; Iron is a solid metallic element.',
    hint: 'Pure chemical elements that are gases under standard conditions.',
    difficulty: 'Advanced',
  },

  // ==========================================
  // SUBTEST 4: Verbal Analogies (Verbal) - 6 Questions
  // ==========================================
  {
    id: 'va-401',
    subtestId: 4,
    battery: 'Verbal',
    subtestName: 'Verbal Analogies',
    stem: 'TEACHER is to SCHOOL as SURGEON is to...',
    options: [
      { label: 'A', text: 'Medicine' },
      { label: 'B', text: 'Hospital' },
      { label: 'C', text: 'Patient' },
      { label: 'D', text: 'Scalpel' },
      { label: 'E', text: 'Ambulance' },
    ],
    correctAnswer: 'B',
    explanation: 'Relationship: Professional to primary workplace. A Teacher works in a School; a Surgeon works in a Hospital. (Scalpel is a tool, patient is a recipient, medicine is the field).',
    hint: 'Say: "A teacher works inside a school, so a surgeon works inside a..."',
    difficulty: 'Foundation',
  },
  {
    id: 'va-402',
    subtestId: 4,
    battery: 'Verbal',
    subtestName: 'Verbal Analogies',
    stem: 'THIRST is to WATER as HUNGER is to...',
    options: [
      { label: 'A', text: 'Kitchen' },
      { label: 'B', text: 'Food' },
      { label: 'C', text: 'Cooking' },
      { label: 'D', text: 'Plate' },
      { label: 'E', text: 'Appetite' },
    ],
    correctAnswer: 'B',
    explanation: 'Relationship: Physiological need to its specific satisfier. Thirst is satisfied by water; hunger is satisfied by food.',
    hint: 'What directly quenches or satisfies the sensation?',
    difficulty: 'Foundation',
  },
  {
    id: 'va-403',
    subtestId: 4,
    battery: 'Verbal',
    subtestName: 'Verbal Analogies',
    stem: 'MICROSCOPE is to BIOLOGIST as TELESCOPE is to...',
    options: [
      { label: 'A', text: 'Stars' },
      { label: 'B', text: 'Astronomer' },
      { label: 'C', text: 'Night' },
      { label: 'D', text: 'Planetarium' },
      { label: 'E', text: 'Geologist' },
    ],
    correctAnswer: 'B',
    explanation: 'Relationship: Primary observational instrument to the scientist who uses it. A microscope is the primary optical instrument of a biologist; a telescope is the primary optical instrument of an astronomer.',
    hint: 'Tool is to specialist profession.',
    difficulty: 'Standard',
  },
  {
    id: 'va-404',
    subtestId: 4,
    battery: 'Verbal',
    subtestName: 'Verbal Analogies',
    stem: 'ANCHOR is to SHIP as BRAKE is to...',
    options: [
      { label: 'A', text: 'Wheel' },
      { label: 'B', text: 'Automobile' },
      { label: 'C', text: 'Speed' },
      { label: 'D', text: 'Engine' },
      { label: 'E', text: 'Pedal' },
    ],
    correctAnswer: 'B',
    explanation: 'Relationship: Stopping/securing mechanism to vehicle. An anchor stops and holds a ship; a brake stops and holds an automobile (car).',
    hint: 'Device used to halt or secure the vehicle.',
    difficulty: 'Standard',
  },
  {
    id: 'va-405',
    subtestId: 4,
    battery: 'Verbal',
    subtestName: 'Verbal Analogies',
    stem: 'EPILOGUE is to NOVEL as CODA is to...',
    options: [
      { label: 'A', text: 'Symphony' },
      { label: 'B', text: 'Poem' },
      { label: 'C', text: 'Sculpture' },
      { label: 'D', text: 'Painting' },
      { label: 'E', text: 'Dance' },
    ],
    correctAnswer: 'A',
    explanation: 'Relationship: Concluding thematic passage to artistic medium. An epilogue is the concluding section of a novel/book; a coda is the concluding musical passage of a musical composition or symphony.',
    hint: 'Ending section of a literary work vs ending section of a musical work.',
    difficulty: 'Advanced',
  },
  {
    id: 'va-406',
    subtestId: 4,
    battery: 'Verbal',
    subtestName: 'Verbal Analogies',
    stem: 'CONSTELLATION is to STAR as ARCHIPELAGO is to...',
    options: [
      { label: 'A', text: 'Ocean' },
      { label: 'B', text: 'Island' },
      { label: 'C', text: 'Coast' },
      { label: 'D', text: 'Continent' },
      { label: 'E', text: 'Wave' },
    ],
    correctAnswer: 'B',
    explanation: 'Relationship: Collective group name to individual constituent unit. A constellation is a grouping of stars; an archipelago is a cluster or chain of islands.',
    hint: 'Whole collection is to its individual member units.',
    difficulty: 'Advanced',
  },

  // ==========================================
  // SUBTEST 5: Number Series (Quantitative) - 6 Questions
  // ==========================================
  {
    id: 'ns-501',
    subtestId: 5,
    battery: 'Quantitative',
    subtestName: 'Number Series',
    stem: 'Find the next number in the series: 4, 7, 10, 13, 16, ?',
    options: [
      { label: 'A', text: '18' },
      { label: 'B', text: '19' },
      { label: 'C', text: '20' },
      { label: 'D', text: '21' },
      { label: 'E', text: '22' },
    ],
    correctAnswer: 'B',
    explanation: 'Rule: Arithmetic progression with a constant common difference of +3. 4 + 3 = 7, 7 + 3 = 10, 10 + 3 = 13, 13 + 3 = 16, so 16 + 3 = 19.',
    hint: 'Check the difference between consecutive numbers.',
    difficulty: 'Foundation',
  },
  {
    id: 'ns-502',
    subtestId: 5,
    battery: 'Quantitative',
    subtestName: 'Number Series',
    stem: 'Find the next number in the series: 3, 6, 12, 24, 48, ?',
    options: [
      { label: 'A', text: '60' },
      { label: 'B', text: '72' },
      { label: 'C', text: '96' },
      { label: 'D', text: '84' },
      { label: 'E', text: '100' },
    ],
    correctAnswer: 'C',
    explanation: 'Rule: Geometric progression multiplying by 2 at each step (doubling rule). 48 * 2 = 96.',
    hint: 'Each number is twice the preceding one.',
    difficulty: 'Foundation',
  },
  {
    id: 'ns-503',
    subtestId: 5,
    battery: 'Quantitative',
    subtestName: 'Number Series',
    stem: 'Find the missing number in the sequence: 50, 48, 44, 38, 30, ?',
    options: [
      { label: 'A', text: '20' },
      { label: 'B', text: '22' },
      { label: 'C', text: '24' },
      { label: 'D', text: '18' },
      { label: 'E', text: '26' },
    ],
    correctAnswer: 'A',
    explanation: 'Rule: The subtractor increases by 2 with each step. 50 - 2 = 48, 48 - 4 = 44, 44 - 6 = 38, 38 - 8 = 30. The next step subtracts 10: 30 - 10 = 20.',
    hint: 'Differences between terms are: -2, -4, -6, -8, ...',
    difficulty: 'Standard',
  },
  {
    id: 'ns-504',
    subtestId: 5,
    battery: 'Quantitative',
    subtestName: 'Number Series',
    stem: 'Find the next number: 2, 3, 5, 8, 12, 17, ?',
    options: [
      { label: 'A', text: '21' },
      { label: 'B', text: '22' },
      { label: 'C', text: '23' },
      { label: 'D', text: '24' },
      { label: 'E', text: '25' },
    ],
    correctAnswer: 'C',
    explanation: 'Rule: The increment increases by 1 each time (+1, +2, +3, +4, +5, +6). 17 + 6 = 23.',
    hint: 'Add 1, then add 2, then add 3...',
    difficulty: 'Standard',
  },
  {
    id: 'ns-505',
    subtestId: 5,
    battery: 'Quantitative',
    subtestName: 'Number Series',
    stem: 'Find the next number in the alternating sequence: 5, 20, 8, 17, 11, 14, 14, ?',
    options: [
      { label: 'A', text: '11' },
      { label: 'B', text: '12' },
      { label: 'C', text: '13' },
      { label: 'D', text: '10' },
      { label: 'E', text: '17' },
    ],
    correctAnswer: 'A',
    explanation: 'Rule: Two alternating sub-series intertwined. Series 1 (odd positions): 5, 8, 11, 14 (+3). Series 2 (even positions): 20, 17, 14, ? (-3). 14 - 3 = 11.',
    hint: 'Look at alternating numbers: 20, 17, 14...',
    difficulty: 'Advanced',
  },
  {
    id: 'ns-506',
    subtestId: 5,
    battery: 'Quantitative',
    subtestName: 'Number Series',
    stem: 'Find the next number in the series: 1, 4, 9, 16, 25, 36, ?',
    options: [
      { label: 'A', text: '42' },
      { label: 'B', text: '45' },
      { label: 'C', text: '48' },
      { label: 'D', text: '49' },
      { label: 'E', text: '54' },
    ],
    correctAnswer: 'D',
    explanation: 'Rule: Perfect squares (n^2). 1^2=1, 2^2=4, 3^2=9, 4^2=16, 5^2=25, 6^2=36, 7^2=49. (Alternatively, consecutive odd additions: +3, +5, +7, +9, +11, +13 => 36 + 13 = 49).',
    hint: 'Square numbers: 1*1, 2*2, 3*3, 4*4, 5*5, 6*6, 7*7.',
    difficulty: 'Standard',
  },

  // ==========================================
  // SUBTEST 6: Number Analogies (Quantitative) - 6 Questions
  // ==========================================
  {
    id: 'na-601',
    subtestId: 6,
    battery: 'Quantitative',
    subtestName: 'Number Analogies',
    stem: '[4 ➔ 16] is related in the same way as [6 ➔ 36] and [7 ➔ ?]',
    options: [
      { label: 'A', text: '42' },
      { label: 'B', text: '49' },
      { label: 'C', text: '56' },
      { label: 'D', text: '28' },
      { label: 'E', text: '64' },
    ],
    correctAnswer: 'B',
    explanation: 'Rule: Square the input number (n ➔ n^2). 4^2 = 16, 6^2 = 36. For 7, 7^2 = 49.',
    hint: 'Multiply the number by itself.',
    difficulty: 'Foundation',
  },
  {
    id: 'na-602',
    subtestId: 6,
    battery: 'Quantitative',
    subtestName: 'Number Analogies',
    stem: '[3 ➔ 7] is related in the same way as [5 ➔ 11] and [8 ➔ ?]',
    options: [
      { label: 'A', text: '16' },
      { label: 'B', text: '17' },
      { label: 'C', text: '18' },
      { label: 'D', text: '19' },
      { label: 'E', text: '20' },
    ],
    correctAnswer: 'B',
    explanation: 'Rule: Multiply by 2 and add 1 (2n + 1). 3 * 2 + 1 = 7; 5 * 2 + 1 = 11. For 8: 8 * 2 + 1 = 17.',
    hint: 'Multiply by two, then add one.',
    difficulty: 'Standard',
  },
  {
    id: 'na-603',
    subtestId: 6,
    battery: 'Quantitative',
    subtestName: 'Number Analogies',
    stem: '[24 ➔ 6] is related in the same way as [40 ➔ 10] and [32 ➔ ?]',
    options: [
      { label: 'A', text: '7' },
      { label: 'B', text: '8' },
      { label: 'C', text: '9' },
      { label: 'D', text: '12' },
      { label: 'E', text: '16' },
    ],
    correctAnswer: 'B',
    explanation: 'Rule: Divide by 4 (n ÷ 4). 24 ÷ 4 = 6; 40 ÷ 4 = 10. For 32: 32 ÷ 4 = 8.',
    hint: 'Divide the first number by 4.',
    difficulty: 'Foundation',
  },
  {
    id: 'na-604',
    subtestId: 6,
    battery: 'Quantitative',
    subtestName: 'Number Analogies',
    stem: '[2 ➔ 9] is related in the same way as [4 ➔ 17] and [6 ➔ ?]',
    options: [
      { label: 'A', text: '23' },
      { label: 'B', text: '24' },
      { label: 'C', text: '25' },
      { label: 'D', text: '27' },
      { label: 'E', text: '36' },
    ],
    correctAnswer: 'C',
    explanation: 'Rule: Multiply by 4 and add 1 (4n + 1). 2 * 4 + 1 = 9; 4 * 4 + 1 = 17. For 6: 6 * 4 + 1 = 25.',
    hint: 'Times 4, plus 1.',
    difficulty: 'Standard',
  },
  {
    id: 'na-605',
    subtestId: 6,
    battery: 'Quantitative',
    subtestName: 'Number Analogies',
    stem: '[15 ➔ 5] is related in the same way as [21 ➔ 7] and [33 ➔ ?]',
    options: [
      { label: 'A', text: '9' },
      { label: 'B', text: '10' },
      { label: 'C', text: '11' },
      { label: 'D', text: '12' },
      { label: 'E', text: '13' },
    ],
    correctAnswer: 'C',
    explanation: 'Rule: Divide by 3 (n ÷ 3). 15 ÷ 3 = 5; 21 ÷ 3 = 7. For 33: 33 ÷ 3 = 11.',
    hint: 'One-third of each number.',
    difficulty: 'Foundation',
  },
  {
    id: 'na-606',
    subtestId: 6,
    battery: 'Quantitative',
    subtestName: 'Number Analogies',
    stem: '[5 ➔ 24] is related in the same way as [7 ➔ 48] and [9 ➔ ?]',
    options: [
      { label: 'A', text: '72' },
      { label: 'B', text: '80' },
      { label: 'C', text: '81' },
      { label: 'D', text: '82' },
      { label: 'E', text: '90' },
    ],
    correctAnswer: 'B',
    explanation: 'Rule: Square the number and subtract 1 (n^2 - 1). 5^2 - 1 = 25 - 1 = 24. 7^2 - 1 = 49 - 1 = 48. For 9: 9^2 - 1 = 81 - 1 = 80.',
    hint: 'Square the input number and subtract 1.',
    difficulty: 'Advanced',
  },

  // ==========================================
  // SUBTEST 7: Figure Analysis (Spatial: Paper Folding & Hole Punch) - 6 Questions
  // ==========================================
  {
    id: 'fa-701',
    subtestId: 7,
    battery: 'Spatial',
    subtestName: 'Figure Analysis (Hole Punching)',
    stem: 'A square sheet of paper is folded in half from left to right along the dashed line. A single hole is punched in the center. When fully unfolded, what does the paper look like?',
    diagramSvg: `
      <div class="flex items-center justify-center gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-center">
          <span class="text-xs font-bold text-slate-500 block mb-1">Step 1: Fold in Half</span>
          <svg width="70" height="70" viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" fill="#f8fafc" stroke="#334155" stroke-width="3"/>
            <line x1="50" y1="10" x2="50" y2="90" stroke="#0ea5e9" stroke-width="3" stroke-dasharray="4,4"/>
            <!-- Fold arrow -->
            <path d="M25,50 C25,35 45,35 45,45" fill="none" stroke="#0284c7" stroke-width="3"/>
          </svg>
        </div>
        <div class="text-xl font-bold text-slate-400">➔</div>
        <div class="text-center">
          <span class="text-xs font-bold text-slate-500 block mb-1">Step 2: Punch Hole</span>
          <svg width="70" height="70" viewBox="0 0 100 100">
            <rect x="50" y="10" width="40" height="80" fill="#f1f5f9" stroke="#334155" stroke-width="3"/>
            <circle cx="70" cy="50" r="8" fill="#ef4444"/>
          </svg>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'One hole in the exact center of the page' },
      { label: 'B', text: 'Two horizontally symmetric holes (one left, one right)' },
      { label: 'C', text: 'Four holes in the four corners' },
      { label: 'D', text: 'Two vertically stacked holes' },
      { label: 'E', text: 'Three holes forming a diagonal' },
    ],
    correctAnswer: 'B',
    explanation: 'The paper was folded in half horizontally (left to right), creating 2 layers. A punch in the center of the folded half penetrates both layers. Unfolding reflects the hole symmetrically across the vertical crease, yielding 2 horizontally symmetric holes.',
    hint: 'Reflect the punched hole across the vertical crease line.',
    difficulty: 'Foundation',
  },
  {
    id: 'fa-702',
    subtestId: 7,
    battery: 'Spatial',
    subtestName: 'Figure Analysis (Hole Punching)',
    stem: 'A square paper is folded in half horizontally, then in half vertically (into quarters). A single round hole is punched through the center. How many holes appear upon unfolding?',
    diagramSvg: `
      <div class="flex items-center justify-center gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-center">
          <span class="text-xs font-bold text-slate-500 block mb-1">Fold 1: Horizontal</span>
          <div class="w-16 h-16 border-2 border-dashed border-slate-400 bg-white flex items-center justify-center text-xs">Top to Bottom</div>
        </div>
        <div class="text-slate-400 font-bold">➔</div>
        <div class="text-center">
          <span class="text-xs font-bold text-slate-500 block mb-1">Fold 2: Vertical</span>
          <div class="w-16 h-16 border-2 border-dashed border-slate-400 bg-white flex items-center justify-center text-xs">Left to Right</div>
        </div>
        <div class="text-slate-400 font-bold">➔</div>
        <div class="text-center">
          <span class="text-xs font-bold text-slate-500 block mb-1">Punched Quarter</span>
          <div class="w-16 h-16 border-2 border-slate-700 bg-slate-100 flex items-center justify-center">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
          </div>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: '1 hole' },
      { label: 'B', text: '2 holes' },
      { label: 'C', text: '4 holes' },
      { label: 'D', text: '8 holes' },
      { label: 'E', text: '16 holes' },
    ],
    correctAnswer: 'C',
    explanation: 'Folding once creates 2 layers. Folding a second time doubles the layers to 4. Punching once through 4 layers penetrates each layer once. When completely unfolded, exactly 4 holes appear symmetrically across both axes.',
    hint: 'Multiply the number of layers: 2 * 2 = 4 layers.',
    difficulty: 'Foundation',
  },
  {
    id: 'fa-703',
    subtestId: 7,
    battery: 'Spatial',
    subtestName: 'Figure Analysis (Hole Punching)',
    stem: 'Quarter-folded square paper: A triangular cutout is cut on the outer edge (not the crease). What pattern forms when unfolded?',
    diagramSvg: `
      <div class="flex items-center justify-center gap-3 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-xs font-bold text-slate-600 bg-white p-3 border rounded shadow-sm">
          Folded into bottom-right quarter. Creases are Top & Left. Triangular notch cut on bottom edge.
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Two triangular notches on the top and bottom outer edges' },
      { label: 'B', text: 'One diamond hole in the center' },
      { label: 'C', text: 'Four corner notches' },
      { label: 'D', text: 'A circular hole in the center' },
      { label: 'E', text: 'Four triangular cuts on each of the four outer sides' },
    ],
    correctAnswer: 'A',
    explanation: 'The cut is made on an outer edge perpendicular to the vertical fold. When unfolded horizontally (left), the cut is reflected on the bottom edge. When unfolded vertically (top), the cut reflects onto the top outer edge. Thus, two symmetric notches appear on top and bottom outer perimeters.',
    hint: 'Pay close attention to which edges are folded creases vs raw open edges.',
    difficulty: 'Standard',
  },
  {
    id: 'fa-704',
    subtestId: 7,
    battery: 'Spatial',
    subtestName: 'Figure Analysis (Hole Punching)',
    stem: 'A paper is folded diagonally to form a triangle, then folded in half again. A punch is made right at the folded apex (point). Where do the holes appear when unfolded?',
    diagramSvg: `
      <div class="flex items-center justify-center p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-xs font-semibold text-slate-700 bg-white p-3 border rounded">
          Diagonal fold ➔ Second diagonal fold ➔ Punch through the central shared corner point.
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'One single central diamond/circular hole' },
      { label: 'B', text: 'Four holes in the four corners of the square' },
      { label: 'C', text: 'Two holes on the diagonals' },
      { label: 'D', text: 'Eight holes along the borders' },
      { label: 'E', text: 'No hole' },
    ],
    correctAnswer: 'A',
    explanation: 'The folded apex is the intersection of all diagonal crease folds—which corresponds directly to the exact geometric center of the original square sheet. Punching through this single confluence forms 1 unified central hole upon complete unfolding.',
    hint: 'All folds meet at the geometric center of the sheet.',
    difficulty: 'Advanced',
  },
  {
    id: 'fa-705',
    subtestId: 7,
    battery: 'Spatial',
    subtestName: 'Figure Analysis (Hole Punching)',
    stem: 'Folded along vertical line, then two punches made in a vertical column on the right side. How many holes upon unfolding?',
    diagramSvg: `
      <div class="flex items-center justify-center p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-xs font-semibold text-slate-700 bg-white p-3 border rounded">
          1 Vertical Fold ➔ 2 vertical punches on right half
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: '2 holes' },
      { label: 'B', text: '4 holes (2 on left, 2 on right in a 2x2 rectangular formation)' },
      { label: 'C', text: '6 holes' },
      { label: 'D', text: '1 hole' },
      { label: 'E', text: '8 holes' },
    ],
    correctAnswer: 'B',
    explanation: 'One fold means 2 layers of paper. 2 punches * 2 layers = 4 total holes. They reflect across the central vertical line to create a 2x2 rectangular arrangement.',
    hint: '2 punches multiplied by 2 layers of paper.',
    difficulty: 'Foundation',
  },
  {
    id: 'fa-706',
    subtestId: 7,
    battery: 'Spatial',
    subtestName: 'Figure Analysis (Hole Punching)',
    stem: 'Paper folded into quarters (horizontal then vertical). A diagonal slash is cut off the corner that represents the center of the sheet. What hole appears in the unfolded paper?',
    diagramSvg: `
      <div class="flex items-center justify-center p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-xs font-semibold text-slate-700 bg-white p-3 border rounded">
          Fold into quarters ➔ Cut off the central closed corner diagonally
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'A central Diamond (Rhombus) shaped hole' },
      { label: 'B', text: 'Four separate triangular holes' },
      { label: 'C', text: 'A circular hole' },
      { label: 'D', text: 'Four corner notches on the perimeter' },
      { label: 'E', text: 'A square hole aligned with the outer edges' },
    ],
    correctAnswer: 'A',
    explanation: 'The central corner consists of the 4 folded quarter layers meeting at the center point. Cutting a straight diagonal across this corner removes the corner point from all 4 quarters. When unfolded, the four 45-degree angled cuts meet to form a Diamond (Rhombus) hole in the center.',
    hint: 'Four diagonal cuts meeting at the center form a 4-sided diamond.',
    difficulty: 'Advanced',
  },

  // ==========================================
  // SUBTEST 8: Figure Recognition (Spatial: Hidden Shapes) - 6 Questions
  // ==========================================
  {
    id: 'fr-801',
    subtestId: 8,
    battery: 'Spatial',
    subtestName: 'Figure Recognition',
    stem: 'Which option contains the EXACT target shape (same proportions and orientation) completely embedded within it?',
    diagramSvg: `
      <div class="flex items-center justify-center gap-6 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-center p-3 bg-white border-2 border-sky-500 rounded-lg shadow-sm">
          <span class="text-xs font-bold text-sky-700 block mb-1">Target Figure: Right Triangle</span>
          <svg width="60" height="60" viewBox="0 0 100 100">
            <polygon points="20,20 20,80 80,80" fill="#0284c7" stroke="#0369a1" stroke-width="4"/>
          </svg>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Design A: Square with diagonal line connecting bottom-left to top-right' },
      { label: 'B', text: 'Design B: Hexagon with center circle' },
      { label: 'C', text: 'Design C: Nested concentric circles' },
      { label: 'D', text: 'Design D: Parallelogram with no right angles' },
      { label: 'E', text: 'Design E: Equilateral triangle with horizontal stripes' },
    ],
    correctAnswer: 'A',
    explanation: 'A square divided diagonally contains two right-angled isosceles triangles with the exact proportions and right angle at the corner as the target figure.',
    hint: 'Look for perpendicular lines meeting at a 90° angle.',
    difficulty: 'Foundation',
  },
  {
    id: 'fr-802',
    subtestId: 8,
    battery: 'Spatial',
    subtestName: 'Figure Recognition',
    stem: 'Target Shape: A bold Capital Letter "L". Which complex figure conceals this exact shape without rotation?',
    diagramSvg: `
      <div class="flex items-center justify-center gap-6 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-center p-3 bg-white border-2 border-sky-500 rounded-lg shadow-sm">
          <span class="text-xs font-bold text-sky-700 block mb-1">Target Figure</span>
          <svg width="50" height="50" viewBox="0 0 100 100">
            <path d="M30,15 L30,85 L85,85" fill="none" stroke="#0ea5e9" stroke-width="12" stroke-linecap="square"/>
          </svg>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Grid containing a rectangle where the left vertical and bottom horizontal borders form the L' },
      { label: 'B', text: 'Circle with an X inside' },
      { label: 'C', text: 'Diamond divided into 4 small triangles' },
      { label: 'D', text: 'Zig-zag horizontal lines' },
      { label: 'E', text: 'Concentric squares' },
    ],
    correctAnswer: 'A',
    explanation: 'The left vertical side and bottom horizontal baseline of a rectangular grid outline form the exact un-rotated Capital "L" target figure.',
    hint: 'Look for a vertical stem meeting a horizontal base at bottom-left.',
    difficulty: 'Foundation',
  },
  {
    id: 'fr-803',
    subtestId: 8,
    battery: 'Spatial',
    subtestName: 'Figure Recognition',
    stem: 'Target Shape: Trapezoid with horizontal parallel top and bottom sides. In which complex design is this figure embedded?',
    diagramSvg: `
      <div class="flex items-center justify-center gap-6 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-center p-3 bg-white border-2 border-sky-500 rounded-lg shadow-sm">
          <span class="text-xs font-bold text-sky-700 block mb-1">Target Figure</span>
          <svg width="60" height="60" viewBox="0 0 100 100">
            <polygon points="35,30 65,30 85,75 15,75" fill="#38bdf8" stroke="#0284c7" stroke-width="4"/>
          </svg>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'A large triangle sliced horizontally by a parallel line near the peak (the bottom section)' },
      { label: 'B', text: 'A circle with three vertical stripes' },
      { label: 'C', text: 'Two crossed perpendicular lines' },
      { label: 'D', text: 'A regular pentagon' },
      { label: 'E', text: 'A 5-point star' },
    ],
    correctAnswer: 'A',
    explanation: 'When an upright triangle is truncated horizontally by a line parallel to its base, the lower section forms an isosceles trapezoid with horizontal parallel edges, exactly matching the target shape.',
    hint: 'Truncated triangle base.',
    difficulty: 'Standard',
  },
  {
    id: 'fr-804',
    subtestId: 8,
    battery: 'Spatial',
    subtestName: 'Figure Recognition',
    stem: '3D Cube Visualization: Which 2D net can be folded into a closed 6-sided cube?',
    diagramSvg: `
      <div class="flex items-center justify-center p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-xs font-bold text-slate-700 bg-white p-3 border rounded">
          Evaluating 2D net configurations for 3D cube folding (Latin cross vs invalid overlapping nets).
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'A "T-shape" or Latin cross composed of 6 connected square faces' },
      { label: 'B', text: 'A straight single line of 6 squares in a row' },
      { label: 'C', text: 'A 2x3 block of 6 squares' },
      { label: 'D', text: 'A row of 5 squares with 1 square attached to the end' },
      { label: 'E', text: '5 squares connected in a cross' },
    ],
    correctAnswer: 'A',
    explanation: 'A Latin Cross (4 squares in a vertical spine, with 1 square on the left and 1 square on the right of the second square) folds into a complete 6-sided 3D cube with zero overlapping faces and no open gaps.',
    hint: 'A valid cube net must have 6 faces with opposite pairs that don’t collide.',
    difficulty: 'Standard',
  },
  {
    id: 'fr-805',
    subtestId: 8,
    battery: 'Spatial',
    subtestName: 'Figure Recognition',
    stem: '3D Block Rotation: A 3D object shaped like a sofa (stepped block) is viewed from the FRONT. Which 2D outline represents its view from the TOP (Bird\'s Eye View)?',
    diagramSvg: `
      <div class="flex items-center justify-center p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-xs font-bold text-slate-700 bg-white p-3 border rounded">
          3D block with a tall back-wall (height 2) and a low front-step (height 1), width 3.
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'A plain 2x3 rectangular outline divided into two horizontal strips' },
      { label: 'B', text: 'A triangle' },
      { label: 'C', text: 'A single square' },
      { label: 'D', text: 'A circle' },
      { label: 'E', text: 'An L-shape outline' },
    ],
    correctAnswer: 'A',
    explanation: 'Looking straight down from directly above (orthographic plan view), heights collapse into horizontal depth planes. The top of the back rest and the seat together form a full rectangular boundary divided by the step line.',
    hint: 'Imagine shining a light straight down from the ceiling.',
    difficulty: 'Advanced',
  },
  {
    id: 'fr-806',
    subtestId: 8,
    battery: 'Spatial',
    subtestName: 'Figure Recognition',
    stem: 'Which geometric design contains a hidden regular Hexagon (6 equal sides)?',
    diagramSvg: `
      <div class="flex items-center justify-center p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-xs font-bold text-slate-700 bg-white p-3 border rounded">
          Target Figure: Regular Hexagon (6-sided symmetrical polygon)
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'A standard 6-pointed "Star of David" formed by two overlapping equilateral triangles' },
      { label: 'B', text: 'A square grid' },
      { label: 'C', text: 'Five concentric circles' },
      { label: 'D', text: 'A simple chevron pattern' },
      { label: 'E', text: 'An array of parallel diagonal lines' },
    ],
    correctAnswer: 'A',
    explanation: 'The internal central intersection of the two overlapping triangles in a 6-pointed star forms a perfect, regular 6-sided hexagon.',
    hint: 'Look at the center space where the two triangles intersect.',
    difficulty: 'Standard',
  },

  // ==========================================
  // SUBTEST 9: Science & Applied Math Reasoning - 10 Questions
  // ==========================================
  {
    id: 'sm-901',
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: 'Electrical Circuits: In the circuit diagram below, which condition will cause the light bulb to turn ON?',
    diagramSvg: `
      <div class="flex justify-center p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <svg width="220" height="120" viewBox="0 0 220 120">
          <!-- Battery -->
          <line x1="30" y1="60" x2="60" y2="60" stroke="#0f172a" stroke-width="4"/>
          <line x1="60" y1="40" x2="60" y2="80" stroke="#0f172a" stroke-width="6"/>
          <line x1="70" y1="48" x2="70" y2="72" stroke="#0f172a" stroke-width="3"/>
          <text x="50" y="32" font-size="12" font-weight="bold" fill="#0f172a">Battery</text>
          <!-- Wire to switch -->
          <line x1="70" y1="60" x2="110" y2="60" stroke="#0f172a" stroke-width="4"/>
          <!-- Switch -->
          <circle cx="110" cy="60" r="4" fill="#0f172a"/>
          <line x1="110" y1="60" x2="135" y2="45" stroke="#ef4444" stroke-width="4"/>
          <circle cx="140" cy="60" r="4" fill="#0f172a"/>
          <text x="110" y="32" font-size="12" font-weight="bold" fill="#ef4444">Switch S1</text>
          <!-- Wire to bulb -->
          <line x1="140" y1="60" x2="175" y2="60" stroke="#0f172a" stroke-width="4"/>
          <!-- Bulb -->
          <circle cx="175" cy="60" r="16" fill="#fef08a" stroke="#0f172a" stroke-width="3"/>
          <line x1="167" y1="52" x2="183" y2="68" stroke="#0f172a" stroke-width="2"/>
          <line x1="167" y1="68" x2="183" y2="52" stroke="#0f172a" stroke-width="2"/>
          <text x="165" y="95" font-size="12" font-weight="bold" fill="#0f172a">Bulb</text>
          <!-- Return wire -->
          <path d="M175,76 L175,105 L30,105 L30,60" fill="none" stroke="#0f172a" stroke-width="4"/>
        </svg>
      </div>
    `,
    options: [
      { label: 'A', text: 'Closing switch S1 to complete the continuous closed circuit' },
      { label: 'B', text: 'Removing the battery from the loop' },
      { label: 'C', text: 'Leaving the switch open so air can conduct the electricity' },
      { label: 'D', text: 'Replacing the copper wire with a plastic string' },
      { label: 'E', text: 'Disconnecting the return wire' },
    ],
    correctAnswer: 'A',
    explanation: 'Electric current requires an unbroken, closed conductive loop with an active voltage source (battery). Closing switch S1 completes the circuit, allowing electrons to flow through the filament and illuminate the bulb.',
    hint: 'A circuit must be complete (closed loop) for current to flow.',
    difficulty: 'Standard',
  },
  {
    id: 'sm-902',
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: 'Balance Scale Physics: If 2 Cubes balance 6 Spheres, how many Spheres are needed to balance 5 Cubes?',
    diagramSvg: `
      <div class="flex items-center justify-center p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-sm font-semibold text-slate-800 bg-white p-3 border rounded text-center">
          Scale 1: [ ■ ■ ]  ⚖️  [ ● ● ● ● ● ● ]<br/>
          Scale 2: [ ■ ■ ■ ■ ■ ]  ⚖️  [ ? ]
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: '10 Spheres' },
      { label: 'B', text: '12 Spheres' },
      { label: 'C', text: '15 Spheres' },
      { label: 'D', text: '18 Spheres' },
      { label: 'E', text: '20 Spheres' },
    ],
    correctAnswer: 'C',
    explanation: 'If 2 Cubes = 6 Spheres, then 1 Cube = 6 ÷ 2 = 3 Spheres. For 5 Cubes: 5 * 3 = 15 Spheres.',
    hint: 'Find the value of 1 cube first.',
    difficulty: 'Foundation',
  },
  {
    id: 'sm-903',
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: 'Photosynthesis: What are the two primary chemical inputs required by plant chloroplasts during photosynthesis?',
    options: [
      { label: 'A', text: 'Carbon Dioxide (CO₂) and Water (H₂O), driven by Sunlight' },
      { label: 'B', text: 'Oxygen (O₂) and Glucose' },
      { label: 'C', text: 'Nitrogen gas and Soil sand' },
      { label: 'D', text: 'Carbon Monoxide and Hydrogen gas' },
      { label: 'E', text: 'Ozone and Salt' },
    ],
    correctAnswer: 'A',
    explanation: 'Photosynthesis chemical formula: 6CO₂ + 6H₂O + Light energy ➔ C₆H₁₂O₆ (Glucose) + 6O₂. The inputs are Carbon Dioxide and Water.',
    hint: 'Plants absorb CO2 from the air and water through roots.',
    difficulty: 'Standard',
  },
  {
    id: 'sm-904',
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: 'Fractions & Proportions: In a school of 240 students, 3/8 participate in the Science Olympiad, and 1/4 participate in the Math League. How many students participate in the Science Olympiad?',
    options: [
      { label: 'A', text: '60 students' },
      { label: 'B', text: '80 students' },
      { label: 'C', text: '90 students' },
      { label: 'D', text: '100 students' },
      { label: 'E', text: '120 students' },
    ],
    correctAnswer: 'C',
    explanation: 'Total students = 240. Science Olympiad = 3/8 of 240. 240 ÷ 8 = 30. 30 * 3 = 90 students.',
    hint: 'Divide 240 by 8, then multiply by 3.',
    difficulty: 'Foundation',
  },
  {
    id: 'sm-905',
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: 'States of Matter: What physical process occurs when a substance changes directly from a Solid to a Gas without passing through a liquid state (e.g. Dry Ice)?',
    options: [
      { label: 'A', text: 'Condensation' },
      { label: 'B', text: 'Evaporation' },
      { label: 'C', text: 'Sublimation' },
      { label: 'D', text: 'Freezing' },
      { label: 'E', text: 'Deposition' },
    ],
    correctAnswer: 'C',
    explanation: 'Sublimation is the direct phase transition from solid to gas without entering the intermediate liquid phase. Deposition is the reverse (gas to solid).',
    hint: 'Sub- prefix, like dry ice transforming into vapor.',
    difficulty: 'Standard',
  },
  {
    id: 'sm-906',
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: 'Levers & Mechanical Advantage: In a first-class lever (like a see-saw), a 40 kg child sits 2 meters from the fulcrum. How far from the fulcrum must a 20 kg child sit to balance the lever?',
    diagramSvg: `
      <div class="flex items-center justify-center p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-xs font-semibold text-slate-800 bg-white p-3 border rounded text-center">
          Law of Moments: Force₁ × Distance₁ = Force₂ × Distance₂<br/>
          (40 kg × 2 m) = (20 kg × ? m)
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: '1 meter' },
      { label: 'B', text: '2 meters' },
      { label: 'C', text: '3 meters' },
      { label: 'D', text: '4 meters' },
      { label: 'E', text: '5 meters' },
    ],
    correctAnswer: 'D',
    explanation: 'Torque balance principle: Moment = Weight × Distance. Left side moment = 40 kg * 2 m = 80 kg·m. For balance, Right side moment must equal 80 kg·m. 80 ÷ 20 kg = 4 meters.',
    hint: 'Torque = Force x Distance.',
    difficulty: 'Advanced',
  },
  {
    id: 'sm-907',
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: 'Geometry: A rectangular garden has a perimeter of 40 meters. If its length is 12 meters, what is its area?',
    options: [
      { label: 'A', text: '96 square meters' },
      { label: 'B', text: '84 square meters' },
      { label: 'C', text: '120 square meters' },
      { label: 'D', text: '144 square meters' },
      { label: 'E', text: '72 square meters' },
    ],
    correctAnswer: 'A',
    explanation: 'Perimeter P = 2 * (Length + Width) = 40 m. Length + Width = 20 m. Given Length = 12 m, Width = 20 - 12 = 8 m. Area = Length * Width = 12 * 8 = 96 m².',
    hint: 'Find the width first from half the perimeter.',
    difficulty: 'Standard',
  },
  {
    id: 'sm-908',
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: 'Food Chains & Ecosystems: In an ecosystem, which organism is categorized as a "Primary Consumer"?',
    diagramSvg: `
      <div class="flex items-center justify-center p-4 bg-slate-50 border-2 border-slate-300 rounded-xl">
        <div class="text-xs font-semibold text-slate-700 bg-white p-3 border rounded text-center">
          Grass (Producer) ➔ Grasshopper ➔ Frog ➔ Snake ➔ Hawk
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: 'Grass' },
      { label: 'B', text: 'Grasshopper (Herbivore)' },
      { label: 'C', text: 'Frog (Carnivore)' },
      { label: 'D', text: 'Hawk (Apex Predator)' },
      { label: 'E', text: 'Fungi (Decomposer)' },
    ],
    correctAnswer: 'B',
    explanation: 'In trophic levels: Producers (Grass) produce biomass via photosynthesis. Primary consumers are herbivores that feed directly on producers (Grasshopper). Frogs are secondary consumers.',
    hint: 'The organism that eats the green plant producer directly.',
    difficulty: 'Foundation',
  },
  {
    id: 'sm-909',
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: 'Probability: A bag contains 4 red marbles, 5 blue marbles, and 6 green marbles. If one marble is drawn at random, what is the probability of selecting a blue marble?',
    options: [
      { label: 'A', text: '1/3' },
      { label: 'B', text: '1/4' },
      { label: 'C', text: '1/5' },
      { label: 'D', text: '5/11' },
      { label: 'E', text: '2/5' },
    ],
    correctAnswer: 'A',
    explanation: 'Total marbles = 4 + 5 + 6 = 15 marbles. Number of blue marbles = 5. Probability = 5 / 15 = 1/3.',
    hint: 'Favorable outcomes divided by total possible outcomes.',
    difficulty: 'Foundation',
  },
  {
    id: 'sm-910',
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: 'Speed, Distance & Time: A high-speed train travels at a steady speed of 180 km/h. How many kilometers does it travel in 40 minutes?',
    options: [
      { label: 'A', text: '100 km' },
      { label: 'B', text: '120 km' },
      { label: 'C', text: '140 km' },
      { label: 'D', text: '160 km' },
      { label: 'E', text: '90 km' },
    ],
    correctAnswer: 'B',
    explanation: '40 minutes = 40/60 hour = 2/3 hour. Distance = Speed * Time = 180 km/h * (2/3) h = 120 km.',
    hint: 'Convert 40 minutes into a fraction of an hour (40/60 = 2/3).',
    difficulty: 'Standard',
  },
];
