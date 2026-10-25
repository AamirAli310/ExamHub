import { Question, ComplexityLevel } from '../types/exam';

/**
 * Subtest 1: Figure Classification (100 Questions)
 * Subtest 2: Figure Matrices (100 Questions)
 * Distributed across 4 international complexity levels:
 * - Beginner (Level 1: Q1-25) -> Foundation
 * - Standard (Level 2: Q26-50) -> Intermediate
 * - Advanced (Level 3: Q51-75) -> Proficient
 * - Expert (Level 4: Q76-100) -> Mastery & STEM Olympiad
 */

export const SUBTEST_1_QUESTIONS: Question[] = Array.from({ length: 100 }, (_, i) => {
  const qNum = i + 1;
  const id = `cat4-s1-${qNum}`;
  const complexityLevel: ComplexityLevel =
    qNum <= 25 ? 'Beginner' : qNum <= 50 ? 'Standard' : qNum <= 75 ? 'Advanced' : 'Expert';

  if (qNum <= 12) {
    // Beginner Category 1: Polygon side count parity & specific geometric vertex rules
    const sideRule = (qNum % 4) + 3; // 3, 4, 5, 6
    const targetSides = sideRule;
    return {
      id,
      subtestId: 1,
      battery: 'Non-Verbal',
      subtestName: 'Figure Classification',
      stem: `Look at the group of shapes. They share a strict geometric rule. Which option belongs with them? (Rule: Polygons with exactly ${targetSides} straight edges and vertices)`,
      diagramSvg: `
        <div class="flex items-center justify-center gap-3 p-3 bg-slate-50 border rounded-xl">
          <svg width="60" height="60" viewBox="0 0 100 100"><polygon points="50,15 85,85 15,85" fill="#fbcfe8" stroke="#db2777" stroke-width="5"/></svg>
          <svg width="60" height="60" viewBox="0 0 100 100"><polygon points="20,20 20,80 80,80" fill="#fbcfe8" stroke="#db2777" stroke-width="5"/></svg>
          <svg width="60" height="60" viewBox="0 0 100 100"><polygon points="50,85 85,15 15,15" fill="#fbcfe8" stroke="#db2777" stroke-width="5"/></svg>
        </div>
      `,
      options: [
        { label: 'A', text: `Regular Polygon with ${targetSides} vertices` },
        { label: 'B', text: `Curved Oval (0 vertices)` },
        { label: 'C', text: `Octagon (8 vertices)` },
        { label: 'D', text: `Decagon (10 vertices)` },
        { label: 'E', text: `Heptagon (7 vertices)` },
      ],
      correctAnswer: 'A',
      explanation: `All figures in the target group are polygons possessing exactly ${targetSides} straight sides. Option A is the only choice with ${targetSides} vertices.`,
      hint: 'Count the exterior straight line segments and corners.',
      difficulty: complexityLevel,
      complexityLevel,
      topicTag: 'Figure Classification - Vertex Count',
    };
  } else if (qNum <= 25) {
    // Beginner Category 2: Internal element count & dot ratios
    const dotCount = (qNum % 5) + 1;
    return {
      id,
      subtestId: 1,
      battery: 'Non-Verbal',
      subtestName: 'Figure Classification',
      stem: `Target Rule: Each closed figure contains exactly ${dotCount} solid circular dot(s) and 1 crossed line. Which option belongs in the set?`,
      diagramSvg: `
        <div class="flex items-center justify-center gap-3 p-3 bg-slate-50 border rounded-xl">
          <svg width="60" height="60" viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="none" stroke="#0f766e" stroke-width="4"/><line x1="15" y1="50" x2="85" y2="50" stroke="#0f766e" stroke-width="3"/><circle cx="50" cy="30" r="6" fill="#0f766e"/></svg>
          <svg width="60" height="60" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="none" stroke="#0f766e" stroke-width="4"/><line x1="15" y1="50" x2="85" y2="50" stroke="#0f766e" stroke-width="3"/><circle cx="50" cy="30" r="6" fill="#0f766e"/></svg>
        </div>
      `,
      options: [
        { label: 'A', text: 'Enclosed figure with 0 dots' },
        { label: 'B', text: `Enclosed figure with exactly ${dotCount} solid dot(s) and 1 bisecting line` },
        { label: 'C', text: 'Figure with 4 external square nodes' },
        { label: 'D', text: 'Three concentric dashed circles' },
        { label: 'E', text: 'Open curve with 2 dots outside' },
      ],
      correctAnswer: 'B',
      explanation: `The classification rule requires an outer enclosed shape containing exactly ${dotCount} internal dot(s) and a straight bisector. Option B strictly matches.`,
      hint: 'Count internal components vs external components.',
      difficulty: complexityLevel,
      complexityLevel,
      topicTag: 'Figure Classification - Internal Elements',
    };
  } else if (qNum <= 38) {
    // Standard Category 3: Rotational & Reflective Symmetry
    const symTypes = [
      'exactly 1 vertical line of reflective symmetry',
      'exactly 2 perpendicular lines of symmetry',
      'rotational symmetry of order 2 (180° invariance)',
      'completely asymmetric irregular outline',
    ];
    const chosenSym = symTypes[qNum % symTypes.length];
    return {
      id,
      subtestId: 1,
      battery: 'Non-Verbal',
      subtestName: 'Figure Classification',
      stem: `Which shape belongs with the target group? (Rule: Geometric shapes displaying ${chosenSym})`,
      diagramSvg: `
        <div class="flex items-center justify-center gap-3 p-3 bg-slate-50 border rounded-xl">
          <svg width="60" height="60" viewBox="0 0 100 100"><polygon points="50,15 90,85 10,85" fill="none" stroke="#4338ca" stroke-width="4"/></svg>
          <svg width="60" height="60" viewBox="0 0 100 100"><polygon points="30,20 70,20 85,80 15,80" fill="none" stroke="#4338ca" stroke-width="4"/></svg>
        </div>
      `,
      options: [
        { label: 'A', text: 'Shape with 4 diagonal symmetry lines' },
        { label: 'B', text: 'Irregular spiral with no symmetry' },
        { label: 'C', text: `Target matching shape displaying ${chosenSym}` },
        { label: 'D', text: 'Circle with infinite axes of symmetry' },
        { label: 'E', text: 'Right angled scalene triangle' },
      ],
      correctAnswer: 'C',
      explanation: `Every shape in the target group exhibits ${chosenSym}. Choice C satisfies this reflectional/rotational property.`,
      hint: 'Imagine folding the shape in half along the vertical or horizontal axis.',
      difficulty: complexityLevel,
      complexityLevel,
      topicTag: 'Figure Classification - Symmetry',
    };
  } else if (qNum <= 50) {
    // Standard Category 4: Shading patterns & Texture rules
    const fillRule = (qNum % 3 === 0) ? 'diagonal 45° stripe hatching' : (qNum % 3 === 1) ? '50% half-shaded split' : 'solid dark fill surrounded by hollow ring';
    return {
      id,
      subtestId: 1,
      battery: 'Non-Verbal',
      subtestName: 'Figure Classification',
      stem: `Identify the shading pattern rule shared by the group and pick the conforming shape: (Rule: ${fillRule})`,
      diagramSvg: `
        <div class="flex items-center justify-center gap-3 p-3 bg-slate-50 border rounded-xl">
          <svg width="60" height="60" viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="#cbd5e1" stroke="#0f172a" stroke-width="4"/></svg>
          <svg width="60" height="60" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="#cbd5e1" stroke="#0f172a" stroke-width="4"/></svg>
        </div>
      `,
      options: [
        { label: 'A', text: 'Completely unshaded outline' },
        { label: 'B', text: 'Spotted polka-dot fill' },
        { label: 'C', text: 'Checkerboard pattern' },
        { label: 'D', text: `Conforming figure with ${fillRule}` },
        { label: 'E', text: 'Solid black outer border only' },
      ],
      correctAnswer: 'D',
      explanation: `The shared visual rule is ${fillRule}. Option D reproduces this exact internal shading syntax.`,
      hint: 'Examine whether the shading is solid, partitioned, or hatched.',
      difficulty: complexityLevel,
      complexityLevel,
      topicTag: 'Figure Classification - Shading Rules',
    };
  } else if (qNum <= 63) {
    // Advanced Category 5: Intersecting geometry & overlapping region rules
    const overlapCount = (qNum % 3) + 2; // 2, 3, or 4
    return {
      id,
      subtestId: 1,
      battery: 'Non-Verbal',
      subtestName: 'Figure Classification',
      stem: `Rule: Shapes are composed of overlapping polygons producing exactly ${overlapCount} distinct bounded interior regions. Which shape belongs?`,
      diagramSvg: `
        <div class="flex items-center justify-center gap-3 p-3 bg-slate-50 border rounded-xl">
          <svg width="60" height="60" viewBox="0 0 100 100"><circle cx="40" cy="50" r="25" fill="none" stroke="#b45309" stroke-width="3"/><circle cx="60" cy="50" r="25" fill="none" stroke="#b45309" stroke-width="3"/></svg>
        </div>
      `,
      options: [
        { label: 'A', text: 'Single isolated rectangle (1 region)' },
        { label: 'B', text: 'Four disconnected circles (4 disjoint regions)' },
        { label: 'C', text: 'Concentric rings with 6 sub-bands' },
        { label: 'D', text: 'Open spiral line (0 closed regions)' },
        { label: 'E', text: `Intersecting arrangement containing exactly ${overlapCount} closed sub-regions` },
      ],
      correctAnswer: 'E',
      explanation: `Counting the partitioned cells shows each target figure forms exactly ${overlapCount} separate closed regions. Option E matches.`,
      hint: 'Count the enclosed areas formed where borders cross.',
      difficulty: complexityLevel,
      complexityLevel,
      topicTag: 'Figure Classification - Overlapping Regions',
    };
  } else if (qNum <= 75) {
    // Advanced Category 6: Arrow directions, orientation vectors & rotational angular progression
    const angle = ((qNum * 45) % 360);
    return {
      id,
      subtestId: 1,
      battery: 'Non-Verbal',
      subtestName: 'Figure Classification',
      stem: `Rule: In each figure, the prominent pointer arrow points precisely in direction: ${angle}° (measured clockwise from 12 o'clock). Which option belongs?`,
      diagramSvg: `
        <div class="flex items-center justify-center gap-3 p-3 bg-slate-50 border rounded-xl">
          <svg width="60" height="60" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#7e22ce" stroke-width="3"/><line x1="50" y1="50" x2="${50 + 30 * Math.sin(angle * Math.PI / 180)}" y2="${50 - 30 * Math.cos(angle * Math.PI / 180)}" stroke="#7e22ce" stroke-width="4"/></svg>
        </div>
      `,
      options: [
        { label: 'A', text: `Target matching figure pointing towards ${angle}° orientation` },
        { label: 'B', text: 'Opposite arrow pointing 180° away' },
        { label: 'C', text: 'Two orthogonal bidirectional arrows' },
        { label: 'D', text: 'Horizontal arrow pointing due East (90°)' },
        { label: 'E', text: 'Vertical arrow pointing due South (180°)' },
      ],
      correctAnswer: 'A',
      explanation: `All sample figures share an identical directional orientation of ${angle}°. Option A is the only option pointing in this orientation.`,
      hint: 'Note the clock face hour position or degree of tilt.',
      difficulty: complexityLevel,
      complexityLevel,
      topicTag: 'Figure Classification - Vector Orientation',
    };
  } else if (qNum <= 88) {
    // Expert Category 7: Composite dual-rule figures
    const parity = qNum % 2 === 0 ? 'even' : 'odd';
    return {
      id,
      subtestId: 1,
      battery: 'Non-Verbal',
      subtestName: 'Figure Classification',
      stem: `Expert Pattern Rule: The outer polygon has an ${parity} number of vertices, and the inner shape has exactly 1 fewer side than the outer polygon. Which choice satisfies both constraints?`,
      diagramSvg: `
        <div class="flex items-center justify-center gap-3 p-3 bg-slate-50 border rounded-xl">
          <svg width="60" height="60" viewBox="0 0 100 100"><polygon points="20,20 80,20 80,80 20,80" fill="none" stroke="#be123c" stroke-width="4"/><polygon points="50,30 70,70 30,70" fill="#fecdd3" stroke="#be123c" stroke-width="3"/></svg>
        </div>
      `,
      options: [
        { label: 'A', text: 'Outer circle with inner square' },
        { label: 'B', text: `Outer ${parity}-vertex polygon enclosing a polygon with exactly (sides - 1)` },
        { label: 'C', text: 'Outer triangle enclosing a hexagon' },
        { label: 'D', text: 'Two identical squares nested without reduction' },
        { label: 'E', text: 'Irregular trapezoid enclosing 5 disconnected dots' },
      ],
      correctAnswer: 'B',
      explanation: `Both conditions must be simultaneously satisfied: outer polygon vertices must be ${parity}, and the inner polygon must have (outer - 1) sides. Option B strictly fits.`,
      hint: 'Check both the outer perimeter vertex count and inner perimeter vertex count simultaneously.',
      difficulty: complexityLevel,
      complexityLevel,
      topicTag: 'Figure Classification - Dual Invariants',
    };
  } else {
    // Expert Category 8: Topological genus, enclosed holes & tangency points
    const touchPoints = (qNum % 3) + 2; // 2, 3, or 4 contact tangency points
    return {
      id,
      subtestId: 1,
      battery: 'Non-Verbal',
      subtestName: 'Figure Classification',
      stem: `Mastery Level: Each figure consists of distinct geometric curves that touch at exactly ${touchPoints} external points of tangency without intersecting. Which option conforms?`,
      diagramSvg: `
        <div class="flex items-center justify-center gap-3 p-3 bg-slate-50 border rounded-xl">
          <svg width="60" height="60" viewBox="0 0 100 100"><circle cx="35" cy="50" r="20" fill="none" stroke="#047857" stroke-width="3"/><circle cx="65" cy="50" r="10" fill="none" stroke="#047857" stroke-width="3"/></svg>
        </div>
      `,
      options: [
        { label: 'A', text: 'Interlocking rings that overlap in 4 points' },
        { label: 'B', text: 'Concentric non-touching circles' },
        { label: 'C', text: `Geometric configuration with exactly ${touchPoints} tangent contact points` },
        { label: 'D', text: 'Single continuous polygon line' },
        { label: 'E', text: 'Crossed straight lines forming an X' },
      ],
      correctAnswer: 'C',
      explanation: `The classification invariant is exactly ${touchPoints} points of external tangency (touching without crossing). Option C is the only matching geometry.`,
      hint: 'Count only where boundaries meet and touch at a point.',
      difficulty: complexityLevel,
      complexityLevel,
      topicTag: 'Figure Classification - Tangency',
    };
  }
});

export const SUBTEST_2_QUESTIONS: Question[] = Array.from({ length: 100 }, (_, i) => {
  const qNum = i + 1;
  const id = `cat4-s2-${qNum}`;
  const complexityLevel: ComplexityLevel =
    qNum <= 25 ? 'Beginner' : qNum <= 50 ? 'Standard' : qNum <= 75 ? 'Advanced' : 'Expert';

  const beginnerTransforms = [
    { name: 'Single 90° Clockwise Turn', rule: 'Single-step: Rotates 90 degrees clockwise (1-variable change)', ans: 'B' },
    { name: 'Simple Left-Right Mirror Flip', rule: 'Single-step: Flips horizontally across vertical axis', ans: 'C' },
    { name: 'Basic White-to-Solid Shading Fill', rule: 'Single-step: Unshaded shape becomes solid filled', ans: 'A' },
    { name: 'Single +1 Dot Addition', rule: 'Single-step: Adds 1 internal dot inside the shape', ans: 'D' },
    { name: 'Simple Top-to-Bottom Flip', rule: 'Single-step: Reflects vertically across horizontal axis', ans: 'E' },
  ];

  const standardTransforms = [
    { name: 'Polygon +1 Side & Color Swap', rule: 'Two-step: Adds 1 polygon side (e.g. Square -> Pentagon) AND swaps fill color', ans: 'D' },
    { name: 'Outer-Inner Nesting Inversion', rule: 'Two-step: Outer shape shrinks to inside while inner shape expands to outside', ans: 'E' },
    { name: '180° Rotation + Dashed Border', rule: 'Two-step: Rotates 180° upside-down and changes solid outline to dashed', ans: 'B' },
    { name: 'Element Count Doubling (×2)', rule: 'Two-step: Number of internal elements doubles while rotating 90°', ans: 'C' },
    { name: 'Diagonal Reflection + Hatching', rule: 'Two-step: Reflects across 45° diagonal and applies stripe hatching', ans: 'A' },
  ];

  const advancedTransforms = [
    { name: '3x3 Row-Rotation + Column-Subtraction', rule: '3x3 Matrix Dual Rule: Row rotates +90° per cell; Column subtracts 1 interior line segment', ans: 'A' },
    { name: '3x3 XOR Symmetric Difference Overlay', rule: '3x3 Matrix Logic: Cell 3 = Cell 1 overlaid with Cell 2, erasing shared overlapping lines (XOR)', ans: 'C' },
    { name: '3x3 Cyclic Permutation of 3 Shapes', rule: '3x3 Latin Square Rule: Each row/column contains 1 Triangle, 1 Hexagon, 1 Circle with 3 distinct shadings', ans: 'B' },
    { name: 'Counter-Rotation of Inner vs Outer Rings', rule: 'Dual Vector Rule: Outer polygon rotates 45° CW while inner pointer rotates 90° CCW', ans: 'D' },
    { name: 'Vertex-to-Line-Count Conversion', rule: 'Abstract Mapping: Polygon with N sides transforms into N parallel intersecting bars', ans: 'E' },
  ];

  const expertTransforms = [
    { name: '3x3 Modulo-3 Composite Operator + Parity Inversion', rule: 'Mastery 3x3 Rule: (Vertices of Col 1 + Col 2) mod 5 + 3 determines Col 3 polygon; shading inverts if sum is odd', ans: 'E' },
    { name: 'Non-Linear Quaternion 3D Cube Projection Rotation', rule: 'Mastery Spatial-Matrix: Isometric cube rotates 90° pitch + 90° yaw simultaneously across row & column', ans: 'B' },
    { name: 'Recursive Fractal Subdivision + Alternating Polarity', rule: 'Mastery Rule: Each step subdivides interior into 4 sub-cells and inverts diagonal quadrant polarity', ans: 'D' },
    { name: 'Dual-Axis Shear + Topological Genus Conservation', rule: 'Mastery Rule: Preserves Euler hole count while applying 60° affine shear and cyclic color shift', ans: 'A' },
    { name: 'Boolean NAND Edge Operator + 135° Phase Shift', rule: 'Mastery Rule: Retains only non-shared perimeter edges and rotates composite glyph 135° clockwise', ans: 'C' },
  ];

  const pool =
    complexityLevel === 'Beginner'
      ? beginnerTransforms
      : complexityLevel === 'Standard'
      ? standardTransforms
      : complexityLevel === 'Advanced'
      ? advancedTransforms
      : expertTransforms;

  const tierIdx = (qNum - 1) % 25;
  const t = pool[tierIdx % pool.length];
  const matrixSize = complexityLevel === 'Beginner' || complexityLevel === 'Standard' ? '2x2 Matrix' : '3x3 High-Density Matrix';

  return {
    id,
    subtestId: 2,
    battery: 'Non-Verbal',
    subtestName: 'Figure Matrices',
    stem: `[${complexityLevel} Tier — ${matrixSize}] Matrix Item #${qNum}: Identify the ${complexityLevel.toLowerCase()} transformation rule (${t.name}) and select the figure that completes [Bottom Right ?]:`,
    diagramSvg: `
      <div class="flex items-center justify-center gap-4 p-3 bg-slate-50 border rounded-xl">
        <div class="flex flex-col items-center gap-1 border-r pr-4">
          <span class="text-[10px] font-bold text-slate-600 uppercase">${complexityLevel} (${matrixSize}): ${t.name}</span>
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 border-2 border-indigo-500 rounded flex items-center justify-center font-bold text-indigo-700 text-xs">A1</div>
            <span class="text-xs font-bold text-slate-400">&rarr;</span>
            <div class="w-10 h-10 border-2 border-indigo-500 rounded flex items-center justify-center font-bold text-indigo-700 text-xs transform rotate-90">A2</div>
          </div>
        </div>
        <div class="flex flex-col items-center gap-1">
          <span class="text-[10px] font-bold text-teal-700">TARGET ROW</span>
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 border-2 border-teal-600 rounded flex items-center justify-center font-bold text-teal-700 text-xs">B1</div>
            <span class="text-xs font-bold text-slate-400">&rarr;</span>
            <div class="w-10 h-10 border-2 border-dashed border-amber-500 bg-amber-50 rounded flex items-center justify-center font-black text-amber-700 text-sm">?</div>
          </div>
        </div>
      </div>
    `,
    options: [
      { label: 'A', text: t.ans === 'A' ? `Correct figure applying [${t.rule}]` : 'Figure with inverted orientation only (missing secondary rule)' },
      { label: 'B', text: t.ans === 'B' ? `Correct figure applying [${t.rule}]` : 'Rotated 45° off-axis without parity match' },
      { label: 'C', text: t.ans === 'C' ? `Correct figure applying [${t.rule}]` : 'Unchanged identity figure from column 1' },
      { label: 'D', text: t.ans === 'D' ? `Correct figure applying [${t.rule}]` : 'Scaled down decoy violating row transformation' },
      { label: 'E', text: t.ans === 'E' ? `Correct figure applying [${t.rule}]` : 'Reflected across wrong axis with mismatched shading' },
    ],
    correctAnswer: t.ans as any,
    explanation: `[${complexityLevel} Matrix Analysis] This ${matrixSize} is governed by: ${t.rule}. Applying this exact rule to the target row produces Option ${t.ans}.`,
    hint: `Look closely at the ${complexityLevel.toLowerCase()} rule: ${t.name}.`,
    difficulty: complexityLevel,
    complexityLevel,
    topicTag: `Figure Matrices - ${complexityLevel} (${t.name})`,
  };
});
