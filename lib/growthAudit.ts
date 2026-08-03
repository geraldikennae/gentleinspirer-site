// Shared between the client UI (live scoring as someone answers) and the
// API route (authoritative server-side recomputation -- client-submitted
// scores are never trusted directly). Order of STAGES matters: it is the
// tie-break when two stages come out with the same percentage, and it is
// the order later stages depend on (a Clarity gap makes Structure look
// broken even when Structure itself is fine).

export const STAGES = ["Clarity", "Structure", "Execution", "Discipline", "Evolution"] as const;
export type Stage = (typeof STAGES)[number];

export interface Question {
  stage: Stage;
  text: string;
}

export const QUESTIONS: Question[] = [
  { stage: "Clarity", text: "I can say what I am trying to achieve right now in one sentence." },
  { stage: "Clarity", text: "The people closest to me would say the same thing I just said." },
  { stage: "Clarity", text: "I know what I have said no to this year, and why." },
  { stage: "Structure", text: "The work that matters has a set time. It does not wait until I remember it." },
  { stage: "Structure", text: "If I were away for a week, the important things would still get done." },
  { stage: "Structure", text: "Everyone knows who makes which decision. Nothing waits for me by default." },
  { stage: "Execution", text: "I finish one thing before I start the next." },
  { stage: "Execution", text: "I could show you exactly what changed in the last thirty days." },
  { stage: "Discipline", text: "I do the important work on days I do not feel like it." },
  { stage: "Discipline", text: "A bad week does not break my routine." },
  { stage: "Evolution", text: "I look back on a set rhythm, not only when something goes wrong." },
  { stage: "Evolution", text: "The way I work today is genuinely different from a year ago." },
];

export interface Band {
  name: string;
  min: number;
  max: number;
  line: string;
}

export const BANDS: Band[] = [
  { name: "Reacting", min: 0, max: 39, line: "Effort is going sideways. Start at Clarity." },
  { name: "Building", min: 40, max: 59, line: "The intent is there. The structure is not yet." },
  { name: "Holding", min: 60, max: 79, line: "It works when you are watching. Test what happens when you are not." },
  { name: "Compounding", min: 80, max: 100, line: "Protect the rhythm and lengthen your horizon." },
];

/** "Your score reveals you are Holding. That means it works when you are watching..." -- shared by the result page and the result email so the phrasing never drifts apart. */
export function bandExplanation(band: Band): string {
  return `Your score reveals you are ${band.name}. That means ${band.line.charAt(0).toLowerCase()}${band.line.slice(1)}`;
}

export function bandFor(overallPercent: number): Band {
  return BANDS.find((b) => overallPercent >= b.min && overallPercent <= b.max) ?? BANDS[0];
}

export interface ScoreResult {
  stagePercents: Record<Stage, number>;
  overallPercent: number;
  weakestStage: Stage;
  band: Band;
}

/** answers is a 12-length array aligned to QUESTIONS' index order, each 1-5. */
export function computeScores(answers: number[]): ScoreResult {
  const stagePercents = {} as Record<Stage, number>;
  for (const stage of STAGES) {
    const idx = QUESTIONS.map((q, i) => (q.stage === stage ? i : -1)).filter((i) => i >= 0);
    const sum = idx.reduce((acc, i) => acc + answers[i], 0);
    stagePercents[stage] = Math.round((sum / (5 * idx.length)) * 100);
  }

  const totalSum = answers.reduce((acc, v) => acc + v, 0);
  const overallPercent = Math.round((totalSum / (5 * QUESTIONS.length)) * 100);

  let weakestStage: Stage = STAGES[0];
  for (const stage of STAGES) {
    if (stagePercents[stage] < stagePercents[weakestStage]) weakestStage = stage;
  }

  return { stagePercents, overallPercent, weakestStage, band: bandFor(overallPercent) };
}

export function isValidAnswers(x: unknown): x is number[] {
  return Array.isArray(x) && x.length === QUESTIONS.length && x.every((v) => Number.isInteger(v) && v >= 1 && v <= 5);
}

export function isPlausibleEmail(x: unknown): x is string {
  return typeof x === "string" && x.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.trim());
}
