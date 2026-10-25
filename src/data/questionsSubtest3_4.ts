import { Question, ComplexityLevel } from '../types/exam';

/**
 * Subtest 3: Verbal Classification (100 Questions)
 * Subtest 4: Verbal Analogies (100 Questions)
 * Strictly stratified across 4 international complexity levels:
 * - Beginner (Level 1: Q1-25) -> Foundation / Key Stage 2 Everyday Vocabulary
 * - Standard (Level 2: Q26-50) -> Intermediate / Grade 5 Curriculum Taxonomy
 * - Advanced (Level 3: Q51-75) -> Proficient / High Stanine 7-8 Academic & Literary Concepts
 * - Expert (Level 4: Q76-100) -> Mastery / Stanine 9 Scientific, Philosophical & Olympiad Lexicon
 */

interface VerbalClassificationSpec {
  triad: [string, string, string];
  category: string;
  options: [string, string, string, string, string];
  correctIndex: number;
  explanation: string;
}

const BEGINNER_VC_DATA: VerbalClassificationSpec[] = [
  { triad: ['Apple', 'Banana', 'Cherry'], category: 'Common edible orchard fruits', options: ['Pear', 'Carrot', 'Bread', 'Milk', 'Spoon'], correctIndex: 0, explanation: 'Apple, banana, and cherry are all fruits. Pear is also a fruit.' },
  { triad: ['Red', 'Blue', 'Yellow'], category: 'Primary pigment colors', options: ['Green', 'Square', 'Loud', 'Sweet', 'Soft'], correctIndex: 0, explanation: 'Red, blue, and yellow are colors. Green is the only color option among the choices.' },
  { triad: ['Shirt', 'Jacket', 'Sweater'], category: 'Upper-body clothing garments', options: ['Coat', 'Shoe', 'Sock', 'Belt', 'Watch'], correctIndex: 0, explanation: 'Shirt, jacket, and sweater are garments worn on the upper body. A coat is also worn on the upper body.' },
  { triad: ['Monday', 'Wednesday', 'Friday'], category: 'Days of the week', options: ['Tuesday', 'January', 'Summer', 'Morning', 'Century'], correctIndex: 0, explanation: 'Monday, Wednesday, and Friday are days of the week. Tuesday is also a day of the week.' },
  { triad: ['Oak', 'Pine', 'Maple'], category: 'Common species of trees', options: ['Birch', 'Daisy', 'Grass', 'Moss', 'Pebble'], correctIndex: 0, explanation: 'Oak, pine, and maple are trees. Birch is also a tree.' },
  { triad: ['Car', 'Bus', 'Truck'], category: 'Wheeled road motor vehicles', options: ['Van', 'Boat', 'Airplane', 'Submarine', 'Helicopter'], correctIndex: 0, explanation: 'Car, bus, and truck are road vehicles that travel on highways. A van is also a road vehicle.' },
  { triad: ['Happy', 'Joyful', 'Cheerful'], category: 'Positive emotions synonyms meaning glad', options: ['Glad', 'Angry', 'Tired', 'Hungry', 'Silent'], correctIndex: 0, explanation: 'Happy, joyful, and cheerful all mean glad and upbeat.' },
];

const STANDARD_VC_DATA: VerbalClassificationSpec[] = [
  { triad: ['Mercury', 'Mars', 'Jupiter'], category: 'Planets orbiting our solar system', options: ['Saturn', 'Moon', 'Sun', 'Sirius', 'Halley'], correctIndex: 0, explanation: 'Mercury, Mars, and Jupiter are all planets orbiting the Sun. Saturn is also a planet.' },
  { triad: ['Oboe', 'Clarinet', 'Bassoon'], category: 'Woodwind orchestral instruments', options: ['Flute', 'Trombone', 'Timpani', 'Violin', 'Cymbal'], correctIndex: 0, explanation: 'Oboe, clarinet, and bassoon belong to the woodwind family. Flute is also a woodwind instrument.' },
  { triad: ['Eagle', 'Falcon', 'Hawk'], category: 'Diurnal raptors / birds of prey', options: ['Sparrow', 'Osprey', 'Penguin', 'Hummingbird', 'Pigeon'], correctIndex: 1, explanation: 'Eagle, falcon, and hawk are birds of prey (raptors). An osprey is also a bird of prey.' },
  { triad: ['Cube', 'Sphere', 'Cylinder'], category: 'Three-dimensional geometric solids', options: ['Cone', 'Square', 'Circle', 'Triangle', 'Parallelogram'], correctIndex: 0, explanation: 'Cube, sphere, and cylinder are 3D geometric solids. A cone is also a 3D solid.' },
  { triad: ['Carrot', 'Beetroot', 'Radish'], category: 'Edible subterranean root vegetables', options: ['Turnip', 'Tomato', 'Cabbage', 'Lettuce', 'Celery'], correctIndex: 0, explanation: 'Carrot, beetroot, and radish are root vegetables. A turnip is also a root vegetable.' },
  { triad: ['Peninsula', 'Isthmus', 'Archipelago'], category: 'Coastal and maritime geographical landforms', options: ['Strait', 'Cloud', 'Prairie', 'Glacier', 'Dune'], correctIndex: 0, explanation: 'Peninsula, isthmus, and archipelago are maritime coastal features. A strait is also a coastal waterway feature.' },
  { triad: ['Triangle', 'Pentagon', 'Heptagon'], category: 'Polygons with an odd number of sides (3, 5, 7)', options: ['Square', 'Hexagon', 'Nonagon', 'Octagon', 'Decagon'], correctIndex: 2, explanation: 'Triangle (3), Pentagon (5), and Heptagon (7) have odd side counts. Nonagon (9) is also an odd-sided polygon.' },
];

const ADVANCED_VC_DATA: VerbalClassificationSpec[] = [
  { triad: ['Metaphor', 'Simile', 'Personification'], category: 'Rhetorical figures of speech and figurative tropes', options: ['Hyperbole', 'Stanza', 'Paragraph', 'Syntax', 'Bibliography'], correctIndex: 0, explanation: 'Metaphor, simile, and personification are figurative language tropes. Hyperbole is also a figure of speech.' },
  { triad: ['Igneous', 'Sedimentary', 'Metamorphic'], category: 'Petriological rock classifications', options: ['Basalt', 'Fossil', 'Magma', 'Quartzite', 'Lithosphere'], correctIndex: 3, explanation: 'Igneous, sedimentary, and metamorphic define rock origins; Quartzite/Basalt represent lithological rock formations.' },
  { triad: ['Bronze', 'Brass', 'Steel'], category: 'Engineered metallic alloys composed of multiple elements', options: ['Pewter', 'Copper', 'Iron', 'Tin', 'Zinc'], correctIndex: 0, explanation: 'Bronze, brass, and steel are metal alloys rather than pure elements. Pewter is also an alloy.' },
  { triad: ['Sonnet', 'Haiku', 'Limerick'], category: 'Fixed-meter poetic verse structures', options: ['Villanelle', 'Biography', 'Lexicon', 'Prologue', 'Treatise'], correctIndex: 0, explanation: 'Sonnet, haiku, and limerick are strict poetic forms. A villanelle is also a fixed-form poem.' },
  { triad: ['Monarchy', 'Oligarchy', 'Democracy'], category: 'Classical political regimes of state governance', options: ['Republic', 'Currency', 'Treaty', 'Embassy', 'Tariff'], correctIndex: 0, explanation: 'Monarchy, oligarchy, and democracy are systems of political rule. A republic is also a form of governance.' },
  { triad: ['Hemoglobin', 'Insulin', 'Keratin'], category: 'Functional and structural polypeptide proteins', options: ['Collagen', 'Glucose', 'Glycogen', 'Cholesterol', 'Fructose'], correctIndex: 0, explanation: 'Hemoglobin, insulin, and keratin are biological proteins. Collagen is also a protein.' },
  { triad: ['Plateau', 'Mesa', 'Butte'], category: 'Flat-topped elevated arid landforms sculpted by differential erosion', options: ['Canyon', 'Escarpment', 'Atoll', 'Moraine', 'Estuary'], correctIndex: 1, explanation: 'Plateau, mesa, and butte are steep-sided tablelands bordered by an escarpment.' },
];

const EXPERT_VC_DATA: VerbalClassificationSpec[] = [
  { triad: ['Velocity', 'Acceleration', 'Momentum'], category: 'Physical vector quantities possessing both magnitude and direction', options: ['Displacement', 'Mass', 'Temperature', 'Entropy', 'Capacitance'], correctIndex: 0, explanation: 'Velocity, acceleration, and momentum are vector quantities, whereas mass, temperature, entropy, and capacitance are scalars. Displacement is a vector.' },
  { triad: ['Proton', 'Neutron', 'Baryon'], category: 'Composite subatomic hadrons composed of three quarks', options: ['Meson', 'Hyperon', 'Electron', 'Photon', 'Neutrino'], correctIndex: 1, explanation: 'Protons and neutrons are three-quark baryons; a hyperon is also a three-quark baryon (unlike leptons or gauge bosons).' },
  { triad: ['Celsius', 'Fahrenheit', 'Kelvin'], category: 'Empirical and absolute thermodynamic temperature scales', options: ['Rankine', 'Becquerel', 'Sievert', 'Weber', 'Candela'], correctIndex: 0, explanation: 'Celsius, Fahrenheit, and Kelvin measure thermodynamic temperature. Rankine is also an absolute temperature scale.' },
  { triad: ['Syllogism', 'Modus Ponens', 'Contraposition'], category: 'Formal deductive inference structures in propositional logic', options: ['Tautology', 'Anecdote', 'Conjecture', 'Heuristic', 'Fallacy'], correctIndex: 0, explanation: 'Syllogism, modus ponens, and contraposition are formal deductive logic constructs, as is a logical tautology.' },
  { triad: ['Mitosis', 'Meiosis', 'Binary Fission'], category: 'Cellular genome replication and division mechanisms', options: ['Cytokinesis', 'Osmosis', 'Transpiration', 'Peristalsis', 'Homeostasis'], correctIndex: 0, explanation: 'Mitosis, meiosis, and binary fission are mechanisms of cellular division paired with cytokinesis.' },
  { triad: ['Convex', 'Concave', 'Parabolic'], category: 'Optical refracting/reflecting surface curvature profiles', options: ['Aspheric', 'Opaque', 'Luminescent', 'Dichroic', 'Refractive'], correctIndex: 0, explanation: 'Convex, concave, and parabolic define geometric surface curvature profiles for lenses/mirrors, as does aspheric.' },
  { triad: ['Epistemology', 'Ontology', 'Axiology'], category: 'Foundational branches of formal philosophical inquiry', options: ['Metaphysics', 'Astrology', 'Numismatics', 'Philately', 'Cartography'], correctIndex: 0, explanation: 'Epistemology, ontology, and axiology are core branches of philosophy, alongside metaphysics.' },
];

export const SUBTEST_3_QUESTIONS: Question[] = Array.from({ length: 100 }, (_, i) => {
  const qNum = i + 1;
  const id = `cat4-s3-${qNum}`;
  const complexityLevel: ComplexityLevel =
    qNum <= 25 ? 'Beginner' : qNum <= 50 ? 'Standard' : qNum <= 75 ? 'Advanced' : 'Expert';

  const pool =
    complexityLevel === 'Beginner'
      ? BEGINNER_VC_DATA
      : complexityLevel === 'Standard'
      ? STANDARD_VC_DATA
      : complexityLevel === 'Advanced'
      ? ADVANCED_VC_DATA
      : EXPERT_VC_DATA;

  const tierIdx = (qNum - 1) % 25;
  const spec = pool[tierIdx % pool.length];
  const contextNum = Math.floor(tierIdx / pool.length) + 1;

  const letterMap: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
  const targetLabel = letterMap[(qNum - 1) % 5];

  const correctItem = spec.options[spec.correctIndex];
  const distractors = spec.options.filter((_, idx) => idx !== spec.correctIndex);

  const builtOptions = letterMap.map((lbl) => {
    if (lbl === targetLabel) {
      return { label: lbl, text: `${correctItem}` };
    }
    const distractorText = distractors.shift() || `Distractor ${lbl}`;
    return { label: lbl, text: distractorText };
  });

  return {
    id,
    subtestId: 3,
    battery: 'Verbal',
    subtestName: 'Verbal Classification',
    stem: `[${complexityLevel} Tier — Set ${contextNum}] Look at the three words in bold: [${spec.triad[0]}, ${spec.triad[1]}, ${spec.triad[2]}]. They share a specific ${complexityLevel.toLowerCase()}-level taxonomic link (${spec.category}). Which option belongs with them?`,
    options: builtOptions,
    correctAnswer: targetLabel,
    explanation: `[${complexityLevel} Verbal Analysis] ${spec.triad.join(', ')} all belong to: ${spec.category}. '${correctItem}' belongs to this exact same classification.`,
    hint: `Identify the ${complexityLevel.toLowerCase()} category linking [${spec.triad.join(', ')}].`,
    difficulty: complexityLevel,
    complexityLevel,
    topicTag: `Verbal Classification - ${complexityLevel} (${spec.category.split(' ')[0]})`,
  };
});

interface VerbalAnalogySpec {
  pairA: [string, string];
  promptC: string;
  answerD: string;
  relationship: string;
  distractors: [string, string, string, string];
}

const BEGINNER_VA_DATA: VerbalAnalogySpec[] = [
  { pairA: ['Puppy', 'Dog'], promptC: 'Kitten', answerD: 'Cat', relationship: 'Young animal to adult animal', distractors: ['Mouse', 'Fur', 'Milk', 'Bark'] },
  { pairA: ['Hot', 'Cold'], promptC: 'Tall', answerD: 'Short', relationship: 'Direct everyday opposites (antonyms)', distractors: ['High', 'Big', 'Wide', 'Long'] },
  { pairA: ['Bird', 'Nest'], promptC: 'Bee', answerD: 'Hive', relationship: 'Animal to its natural home', distractors: ['Honey', 'Flower', 'Wing', 'Sting'] },
  { pairA: ['Hand', 'Glove'], promptC: 'Foot', answerD: 'Sock', relationship: 'Body part to clothing worn on it', distractors: ['Leg', 'Walk', 'Hat', 'Scarf'] },
  { pairA: ['Brush', 'Paint'], promptC: 'Pen', answerD: 'Write', relationship: 'Everyday tool to its primary action', distractors: ['Paper', 'Book', 'Desk', 'Read'] },
  { pairA: ['Day', 'Sun'], promptC: 'Night', answerD: 'Moon', relationship: 'Time of day to brightest sky object', distractors: ['Sleep', 'Dark', 'Bed', 'Cloud'] },
  { pairA: ['Fish', 'Swim'], promptC: 'Bird', answerD: 'Fly', relationship: 'Creature to its primary mode of movement', distractors: ['Feather', 'Tree', 'Beak', 'Egg'] },
];

const STANDARD_VA_DATA: VerbalAnalogySpec[] = [
  { pairA: ['Scalpel', 'Surgeon'], promptC: 'Chisel', answerD: 'Sculptor', relationship: 'Precision tool to professional practitioner', distractors: ['Canvas', 'Clinic', 'Marble', 'Patient'] },
  { pairA: ['Petal', 'Flower'], promptC: 'Spoke', answerD: 'Wheel', relationship: 'Component part to integrated whole', distractors: ['Bicycle', 'Brake', 'Road', 'Axle'] },
  { pairA: ['Thermometer', 'Temperature'], promptC: 'Barometer', answerD: 'Atmospheric Pressure', relationship: 'Measuring instrument to physical property', distractors: ['Humidity', 'Altitude', 'Mercury', 'Weather'] },
  { pairA: ['Author', 'Novel'], promptC: 'Composer', answerD: 'Symphony', relationship: 'Creator to completed artistic work', distractors: ['Piano', 'Conductor', 'Orchestra', 'Music'] },
  { pairA: ['Flax', 'Linen'], promptC: 'Clay', answerD: 'Ceramics', relationship: 'Raw natural resource to finished craft material', distractors: ['Mud', 'Potter', 'Kiln', 'Earth'] },
  { pairA: ['Oasis', 'Desert'], promptC: 'Island', answerD: 'Ocean', relationship: 'Isolated area surrounded by vast expanse', distractors: ['Coast', 'Sand', 'Wave', 'Continent'] },
  { pairA: ['Clock', 'Time'], promptC: 'Odometer', answerD: 'Distance', relationship: 'Gauge to quantity measured', distractors: ['Speed', 'Engine', 'Highway', 'Fuel'] },
];

const ADVANCED_VA_DATA: VerbalAnalogySpec[] = [
  { pairA: ['Pebble', 'Boulder'], promptC: 'Whisper', answerD: 'Bellow', relationship: 'Micro-intensity to extreme macro-intensity', distractors: ['Voice', 'Sound', 'Quiet', 'Echo'] },
  { pairA: ['Frugal', 'Parsimonious'], promptC: 'Brave', answerD: 'Temerarious', relationship: 'Moderate trait to extreme/excessive degree', distractors: ['Cowardly', 'Heroic', 'Calm', 'Timid'] },
  { pairA: ['Insulator', 'Current'], promptC: 'Tourniquet', answerD: 'Circulation', relationship: 'Barrier apparatus to flow it arrests', distractors: ['Bandage', 'Artery', 'Hospital', 'Pulse'] },
  { pairA: ['Apiary', 'Bees'], promptC: 'Terrarium', answerD: 'Reptiles', relationship: 'Specialized artificial habitat to organism class', distractors: ['Aquarium', 'Soil', 'Glass', 'Birds'] },
  { pairA: ['Cartographer', 'Projection'], promptC: 'Lexicographer', answerD: 'Etymology', relationship: 'Scholar to technical analytical domain', distractors: ['Atlas', 'Compass', 'Grammar', 'Novel'] },
  { pairA: ['Prism', 'Dispersion'], promptC: 'Catalyst', answerD: 'Activation', relationship: 'Agent to physical/chemical mechanism triggered', distractors: ['Spectrum', 'Enzyme', 'Beaker', 'Solvent'] },
  { pairA: ['Leveret', 'Hare'], promptC: 'Elver', answerD: 'Eel', relationship: 'Specialized zoological juvenile term to adult species', distractors: ['Salmon', 'Tadpole', 'Cygnet', 'Trout'] },
];

const EXPERT_VA_DATA: VerbalAnalogySpec[] = [
  { pairA: ['Apex', 'Nadir'], promptC: 'Apogee', answerD: 'Perigee', relationship: 'Astronomical orbital maximum distance to minimum distance', distractors: ['Zenith', 'Eclipse', 'Equinox', 'Parallax'] },
  { pairA: ['Ephemeral', 'Perennial'], promptC: 'Diaphanous', answerD: 'Opaque', relationship: 'High-register academic antonym pair (transient:enduring :: sheer:impenetrable)', distractors: ['Translucent', 'Luminous', 'Fragile', 'Ethereal'] },
  { pairA: ['Mitochondria', 'Oxidative Phosphorylation'], promptC: 'Ribosome', answerD: 'Polypeptide Translation', relationship: 'Cellular organelle to exact molecular biosynthesis pathway', distractors: ['Transcription', 'Glycolysis', 'Mitosis', 'Osmosis'] },
  { pairA: ['Sycophant', 'Obsequious'], promptC: 'Iconoclast', answerD: 'Irreverent', relationship: 'Archetypal persona to defining behavioral adjective', distractors: ['Orthodox', 'Ascetic', 'Stoic', 'Dogmatic'] },
  { pairA: ['Axiom', 'Deduction'], promptC: 'Empirical Observation', answerD: 'Induction', relationship: 'Epistemological starting premise to corresponding logical reasoning method', distractors: ['Syllogism', 'Fallacy', 'Hypothesis', 'Paradox'] },
  { pairA: ['Anemometer', 'Wind Velocity'], promptC: 'Pyranometer', answerD: 'Solar Irradiance', relationship: 'Precision metrological sensor to radiative flux measured', distractors: ['Seismic Waves', 'Barometric Pressure', 'Relative Humidity', 'Magnetic Flux'] },
  { pairA: ['Panacea', 'Illness'], promptC: 'Solvent (Alkahest)', answerD: 'Matter', relationship: 'Universal theoretical remedy/agent to target domain dissolved or cured', distractors: ['Potion', 'Symptom', 'Catalyst', 'Precipitate'] },
];

export const SUBTEST_4_QUESTIONS: Question[] = Array.from({ length: 100 }, (_, i) => {
  const qNum = i + 1;
  const id = `cat4-s4-${qNum}`;
  const complexityLevel: ComplexityLevel =
    qNum <= 25 ? 'Beginner' : qNum <= 50 ? 'Standard' : qNum <= 75 ? 'Advanced' : 'Expert';

  const pool =
    complexityLevel === 'Beginner'
      ? BEGINNER_VA_DATA
      : complexityLevel === 'Standard'
      ? STANDARD_VA_DATA
      : complexityLevel === 'Advanced'
      ? ADVANCED_VA_DATA
      : EXPERT_VA_DATA;

  const tierIdx = (qNum - 1) % 25;
  const spec = pool[tierIdx % pool.length];
  const setNum = Math.floor(tierIdx / pool.length) + 1;

  const letterMap: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
  const targetLabel = letterMap[(qNum - 1) % 5];

  const distractors = [...spec.distractors];
  const builtOptions = letterMap.map((lbl) => {
    if (lbl === targetLabel) {
      return { label: lbl, text: spec.answerD };
    }
    const dText = distractors.shift() || `Alternative ${lbl}`;
    return { label: lbl, text: dText };
  });

  return {
    id,
    subtestId: 4,
    battery: 'Verbal',
    subtestName: 'Verbal Analogies',
    stem: `[${complexityLevel} Tier — Set ${setNum}] ${spec.pairA[0]} is to ${spec.pairA[1]} as ${spec.promptC} is to [ ? ] (Relationship: ${spec.relationship})`,
    options: builtOptions,
    correctAnswer: targetLabel,
    explanation: `[${complexityLevel} Analogy Analysis] '${spec.pairA[0]}' relates to '${spec.pairA[1]}' via: ${spec.relationship}. Applying this exact semantic bridge to '${spec.promptC}' yields '${spec.answerD}'.`,
    hint: `Form a precise ${complexityLevel.toLowerCase()}-level sentence linking ${spec.pairA[0]} and ${spec.pairA[1]}.`,
    difficulty: complexityLevel,
    complexityLevel,
    topicTag: `Verbal Analogies - ${complexityLevel} (${spec.relationship.split(' ')[0]})`,
  };
});
