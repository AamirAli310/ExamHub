# CAT4 Cognitive Abilities Test & STEM Olympiad Practice Platform

A comprehensive, interactive **GL Assessment CAT4 (Level D / Year 7 Entry / 11+)** and **Science & Math Olympiad** cognitive preparation platform. Designed for students, parents, and educators, the application delivers authentic timed subtest simulations, an **840-question stratified question bank**, multi-tier complexity configuration, and detailed post-exam psychometric analytics.

---

## Key Features

### 1. Stratified 840-Question Bank (Zero Repeats)
- **800 CAT4 Questions**: **100 unique questions per subtest** across all 8 official CAT4 subtests (`8 × 100 = 800`), strictly partitioned into **4 international complexity tiers** (25 Beginner, 25 Standard, 25 Advanced, 25 Expert per subtest).
- **40 Science & Math Olympiad Questions**: Dedicated analytical and problem-solving questions for STEM preparation.
- **Session-Wide De-Duplication**: Unseen questions are prioritized and Fisher–Yates shuffled so every full exam, battery drill, or custom test loads unique items without repeats.

### 2. International 4-Tier Complexity System & 3-Mode Linking
Questions are genuinely differentiated by cognitive load, rule depth, and visual geometry across four international educational benchmark levels:
- **Beginner — Foundation Tier** *(Introductory & Scaffolded Recognition)*
- **Standard — Core Benchmark** *(Age-Expected National & International Curriculum Level)*
- **Advanced — Higher-Order Application** *(Multi-Step Analytical & Abstract Synthesis)*
- **Expert — Mastery & Olympiad Tier** *(High-Ceiling Extension & Gifted/Scholarship Standard)*
- **Mixed — Balanced All-Levels** *(Proportional sampling across all 4 tiers)*

**Flexible 3-Mode Complexity Linking:**
1. **Main Module Level**: Apply a single global complexity tier across the entire 168-question exam or custom test.
2. **Section (Battery) Level**: Assign independent complexity tiers to *Non-Verbal*, *Verbal*, *Quantitative*, and *Spatial* batteries.
3. **Individual Subsection Level**: Fine-tune complexity individually for each of the 8 CAT4 subtests.

---

### 3. Complete Coverage of All 8 Official CAT4 Subtests

| Part / Battery | Subtest | Official Exam Items | Bank Pool | Cognitive Focus & Tier Stratification |
| :--- | :--- | :---: | :---: | :--- |
| **Part 1: Non-Verbal Reasoning** | **1. Figure Classification** | 24 | 100 | Shape attributes, rotation, shading, symmetry, and compound parity rules |
| **Part 1: Non-Verbal Reasoning** | **2. Figure Matrices** | 24 | 100 | 2×2 and 3×3 visual analogies, progressive rotations, and multi-axis state shifts |
| **Part 2: Verbal Reasoning** | **3. Verbal Classification** | 24 | 100 | Semantic groupings from concrete everyday categories (Beginner) to abstract epistemological & rhetorical concepts (Expert) |
| **Part 2: Verbal Reasoning** | **4. Verbal Analogies** | 24 | 100 | Relational word bridges (`A : B :: C : ?`) spanning functional, causal, structural, and etymological links |
| **Part 3: Quantitative Reasoning** | **5. Number Analogies** | 18 | 100 | Single-step arithmetic (Beginner), two-step linear (Standard), quadratic (Advanced), and cubic/factorials (Expert) |
| **Part 3: Quantitative Reasoning** | **6. Number Series** | 18 | 100 | Arithmetic, interleaved alternating, Fibonacci-variant, and recursive polynomial sequences |
| **Part 4: Spatial Reasoning** | **7. Figure Analysis** | 18 | 100 | Paper folding & hole punching from 1-fold/2-layer symmetry (Beginner) to 3–4 fold/8–16 layer octant grids (Expert) |
| **Part 4: Spatial Reasoning** | **8. Figure Recognition** | 18 | 100 | Target polygon recognition within complex wireframe meshes from 3–4 vertex convex shapes (Beginner) to 7–10 vertex non-convex polyforms (Expert) |

---

### 4. Authentic GL Assessment Exam Workspace
- **Section-Locked Timing**: Enforces official subtest countdown timers (8 to 10 minutes per subtest). Completed sections are locked so candidates cannot return to earlier subtests.
- **Subtest Orientation Briefings**: Dedicated pre-subtest instruction screens with worked examples and strategy tips before the timer begins.
- **Interactive Tools**:
  - **Elimination Strikethrough (`Right-Click` or `X` button)**: Cross out distractor options to narrow choices.
  - **Keyboard Shortcuts**: Select options with `A`–`E` or `1`–`5`, navigate with `←` / `→` or `Enter`, and flag items with `F`.
  - **Question Palette Drawer**: Visual overview of answered, unanswered, and flagged questions within the active subtest.
  - **Practice Hints & Live Complexity Badge**: Optional scaffolded hints and real-time display of each question's complexity tier.

### 5. Custom Test Creator & Interactive Question Bank Manager
- **Custom Test Builder**: Combine any CAT4 subtests or Science/Math Olympiad modules, customize question counts and timers, and link complexity at the Module, Section, or Subsection level.
- **Spreadsheet & JSON Importer/Exporter**: Upload custom questions via `.csv`, `.tsv`, or `.json` files, download a sample spreadsheet template, filter the bank by Battery, Subtest, Exam Type, or Complexity Level, or add single questions with custom SVG diagrams.

### 6. Psychometric Analytics & Score Reports
- **Standard Age Score (SAS) Estimation**: Calculates estimated SAS (mean 100, SD 15) and National Percentile Rank (NPR) across Verbal, Non-Verbal, Quantitative, and Spatial batteries.
- **Pacing & Accuracy Breakdown**: Subtest-by-subtest performance tables, time-per-question metrics, and full step-by-step explanations with visual SVG diagrams for every question.

---

## Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Diagrams**: Procedural high-precision inline SVG generators for Non-Verbal and Spatial Reasoning

---

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **bun**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <repo-folder>

# Install dependencies
npm install
```

### Running in Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:3000`.

### Building for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```text
├── src/
│   ├── components/
│   │   ├── ComplexityLevelModal.tsx    # 3-mode complexity configurator (Module, Section, Subsection)
│   │   ├── CustomTestCreatorModal.tsx  # Custom test builder with granular complexity & timer controls
│   │   ├── Dashboard.tsx               # Main hub, battery launchers, and subsection practice cards
│   │   ├── ExamWorkspace.tsx           # Timed exam runner, SVG renderer, and elimination tools
│   │   ├── PolicyEditorModal.tsx       # Exam policy & instructional briefing editor
│   │   ├── QuestionBankModal.tsx       # 840-item bank browser, complexity filter, and CSV/JSON uploader
│   │   └── ResultsView.tsx             # SAS/Stanine analytics and question-by-question review
│   ├── data/
│   │   ├── defaultPolicies.ts          # Official GL Assessment subtest metadata, timers, and briefings
│   │   ├── questionGenerator.ts        # Master bank assembler and complexity-aware unique sampler
│   │   ├── questionsSubtest1_2.ts      # Non-Verbal (Figure Classification & Figure Matrices — 200 items)
│   │   ├── questionsSubtest3_4.ts      # Verbal (Verbal Classification & Verbal Analogies — 200 items)
│   │   ├── questionsSubtest5_6.ts      # Quantitative (Number Analogies & Number Series — 200 items)
│   │   ├── questionsSubtest7_8.ts      # Spatial (Figure Analysis & Figure Recognition — 200 items)
│   │   ├── questionsScienceMath.ts     # Science & Math Olympiad supplement (40 items)
│   │   └── svgHelpers.ts               # Procedural SVG geometry engine for shapes, matrices & folds
│   ├── types/
│   │   └── exam.ts                     # TypeScript interfaces & international complexity metadata
│   ├── App.tsx                         # Application state, session persistence, and exam orchestration
│   └── main.tsx                        # React entry point
├── LICENSE                             # MIT License
├── README.md                           # Project documentation
└── package.json
```

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.
