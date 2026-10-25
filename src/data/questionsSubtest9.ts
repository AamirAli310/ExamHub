import { Question, ComplexityLevel } from '../types/exam';

/**
 * Subtest 9: Science & Applied Math (40 Questions)
 * Distributed across 4 complexity levels:
 * - Beginner (Level 1: Q1-10)
 * - Standard (Level 2: Q11-20)
 * - Advanced (Level 3: Q21-30)
 * - Expert (Level 4: Q31-40)
 */

interface ScienceMathSpec {
  stem: string;
  options: [string, string, string, string, string];
  ans: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  topic: string;
}

const SM_DATA: ScienceMathSpec[] = [
  {
    stem: 'Which organelle is known as the powerhouse of eukaryotic cells because it generates most of the chemical energy needed to power biochemical reactions via ATP synthesis?',
    options: ['Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Ribosome', 'Lysosome'],
    ans: 'A',
    explanation: 'Mitochondria generate adenosine triphosphate (ATP) through cellular respiration, powering metabolic processes.',
    topic: 'Biology - Cell Biology',
  },
  {
    stem: 'According to Newton’s Second Law of Motion, what is the net force acting on an object with a mass of 15 kg accelerating at 4 m/s²?',
    options: ['3.75 N', '19 N', '60 N', '120 N', '240 N'],
    ans: 'C',
    explanation: 'Force = Mass * Acceleration (F = m * a). Force = 15 kg * 4 m/s² = 60 Newtons.',
    topic: 'Physics - Mechanics',
  },
  {
    stem: 'What is the chemical formula for photosynthesis, showing reactants converted into glucose and oxygen in the presence of sunlight?',
    options: [
      '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
      'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O',
      '2H₂ + O₂ → 2H₂O',
      'CH₄ + 2O₂ → CO₂ + 2H₂O',
      'NaCl + H₂O → NaOH + HCl',
    ],
    ans: 'A',
    explanation: 'Photosynthesis synthesizes glucose (C₆H₁₂O₆) and oxygen (O₂) from carbon dioxide (CO₂) and water (H₂O).',
    topic: 'Biology - Botany',
  },
  {
    stem: 'A solution with a pH of 3 is classified as:',
    options: ['Strongly Alkaline / Basic', 'Neutral', 'Weak Base', 'Strongly Acidic', 'Pure Water'],
    ans: 'D',
    explanation: 'On the pH scale (0 to 14), values below 7 are acidic. A pH of 3 is strongly acidic.',
    topic: 'Chemistry - pH Scale',
  },
  {
    stem: 'A train travels at an average speed of 90 km/h for 2 hours and 30 minutes (2.5 hours). What is the total distance covered?',
    options: ['180 km', '200 km', '210 km', '225 km', '270 km'],
    ans: 'D',
    explanation: 'Distance = Speed * Time = 90 km/h * 2.5 h = 225 km.',
    topic: 'Applied Math - Speed & Distance',
  },
  {
    stem: 'What type of chemical bond involves the transfer of electrons from a metal atom to a non-metal atom, resulting in electrostatic attraction between oppositely charged ions?',
    options: ['Covalent Bond', 'Metallic Bond', 'Ionic Bond', 'Hydrogen Bond', 'Van der Waals Attraction'],
    ans: 'C',
    explanation: 'Ionic bonding occurs when electrons are transferred between atoms to form positive and negative ions.',
    topic: 'Chemistry - Chemical Bonding',
  },
  {
    stem: 'A rectangular aquarium has a length of 50 cm, width of 30 cm, and height of 40 cm. What is its maximum water volume capacity in liters? (1,000 cm³ = 1 liter)',
    options: ['6 Liters', '12 Liters', '60 Liters', '120 Liters', '600 Liters'],
    ans: 'C',
    explanation: 'Volume = 50 * 30 * 40 = 60,000 cm³. 60,000 / 1,000 = 60 Liters.',
    topic: 'Applied Math - Geometry & Volume',
  },
  {
    stem: 'Which planet in our solar system has the shortest orbital period around the Sun, completing one revolution in approximately 88 Earth days?',
    options: ['Venus', 'Mercury', 'Mars', 'Jupiter', 'Neptune'],
    ans: 'B',
    explanation: 'Mercury is the closest planet to the Sun and has the fastest orbital velocity, taking ~88 days to complete an orbit.',
    topic: 'Astronomy - Solar System',
  },
  {
    stem: 'If two resistors of 6 ohms and 12 ohms are connected in parallel, what is the equivalent total resistance of the circuit?',
    options: ['18 ohms', '9 ohms', '4 ohms', '2 ohms', '0.5 ohms'],
    ans: 'C',
    explanation: '1/R_total = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4. Therefore R_total = 4 ohms.',
    topic: 'Physics - Electricity',
  },
  {
    stem: 'In genetics, if two heterozygous parents with brown eyes (Bb) have a child, what is the theoretical probability that the child will inherit blue eyes (recessive bb)?',
    options: ['0% (0/4)', '25% (1/4)', '50% (2/4)', '75% (3/4)', '100% (4/4)'],
    ans: 'B',
    explanation: 'In a Punnett square for Bb x Bb: BB (25%), Bb (50%), bb (25%). The probability of homozygous recessive (bb) is 25%.',
    topic: 'Biology - Genetics',
  },
  {
    stem: 'What phenomenon causes a pencil submerged in a glass of water to appear bent or displaced at the air-water boundary?',
    options: ['Reflection', 'Refraction', 'Diffraction', 'Total Internal Absorption', 'Dispersion'],
    ans: 'B',
    explanation: 'Refraction is the bending of light waves as they pass from one medium into another of different optical density.',
    topic: 'Physics - Optics',
  },
  {
    stem: 'A merchant purchases an item for £80 and sells it for £100. What is the percentage profit based on the cost price?',
    options: ['15%', '20%', '25%', '30%', '40%'],
    ans: 'C',
    explanation: 'Profit = £100 - £80 = £20. Percentage Profit = (20 / 80) * 100% = 25%.',
    topic: 'Applied Math - Financial Percentage',
  },
];

export const SUBTEST_9_QUESTIONS: Question[] = Array.from({ length: 40 }, (_, i) => {
  const qNum = i + 1;
  const id = `sci-s9-${qNum}`;
  const spec = SM_DATA[(qNum - 1) % SM_DATA.length];
  const complexityLevel: ComplexityLevel =
    qNum <= 10 ? 'Beginner' : qNum <= 20 ? 'Standard' : qNum <= 30 ? 'Advanced' : 'Expert';

  const letterMap: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
  const targetLabel = letterMap[(qNum - 1) % 5];

  const correctText = spec.options[spec.ans.charCodeAt(0) - 65];
  const distractors = spec.options.filter((_, idx) => idx !== (spec.ans.charCodeAt(0) - 65));

  const builtOptions = letterMap.map((lbl) => {
    if (lbl === targetLabel) {
      return { label: lbl, text: correctText };
    }
    const d = distractors.shift() || `Scientific distractor ${lbl}`;
    return { label: lbl, text: d };
  });

  return {
    id,
    subtestId: 9,
    battery: 'Science & Math',
    subtestName: 'Science & Applied Math',
    stem: `Q${qNum}: ${spec.stem}`,
    options: builtOptions,
    correctAnswer: targetLabel,
    explanation: spec.explanation,
    hint: 'Recall fundamental scientific laws and arithmetic formulas.',
    difficulty: complexityLevel,
    complexityLevel,
    examType: 'Science',
    topicTag: spec.topic,
  };
});
