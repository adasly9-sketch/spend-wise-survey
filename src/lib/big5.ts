// IPIP-50 (International Personality Item Pool) 50-item Big Five measure.
// Each item maps to a trait; "reverse" items are scored as 6 - value.

export type Trait =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "neuroticism";

export interface Big5Item {
  id: number;
  text: string;
  trait: Trait;
  reverse: boolean;
}

export const BIG5_ITEMS: Big5Item[] = [
  { id: 1, text: "I am the life of the party.", trait: "extraversion", reverse: false },
  { id: 2, text: "I feel little concern for others.", trait: "agreeableness", reverse: true },
  { id: 3, text: "I am always prepared.", trait: "conscientiousness", reverse: false },
  { id: 4, text: "I get stressed out easily.", trait: "neuroticism", reverse: false },
  { id: 5, text: "I have a rich vocabulary.", trait: "openness", reverse: false },
  { id: 6, text: "I don't talk a lot.", trait: "extraversion", reverse: true },
  { id: 7, text: "I am interested in people.", trait: "agreeableness", reverse: false },
  { id: 8, text: "I leave my belongings around.", trait: "conscientiousness", reverse: true },
  { id: 9, text: "I am relaxed most of the time.", trait: "neuroticism", reverse: true },
  { id: 10, text: "I have difficulty understanding abstract ideas.", trait: "openness", reverse: true },
  { id: 11, text: "I feel comfortable around people.", trait: "extraversion", reverse: false },
  { id: 12, text: "I insult people.", trait: "agreeableness", reverse: true },
  { id: 13, text: "I pay attention to details.", trait: "conscientiousness", reverse: false },
  { id: 14, text: "I worry about things.", trait: "neuroticism", reverse: false },
  { id: 15, text: "I have a vivid imagination.", trait: "openness", reverse: false },
  { id: 16, text: "I keep in the background.", trait: "extraversion", reverse: true },
  { id: 17, text: "I sympathize with others' feelings.", trait: "agreeableness", reverse: false },
  { id: 18, text: "I make a mess of things.", trait: "conscientiousness", reverse: true },
  { id: 19, text: "I seldom feel blue.", trait: "neuroticism", reverse: true },
  { id: 20, text: "I am not interested in abstract ideas.", trait: "openness", reverse: true },
  { id: 21, text: "I start conversations.", trait: "extraversion", reverse: false },
  { id: 22, text: "I am not interested in other people's problems.", trait: "agreeableness", reverse: true },
  { id: 23, text: "I get chores done right away.", trait: "conscientiousness", reverse: false },
  { id: 24, text: "I am easily disturbed.", trait: "neuroticism", reverse: false },
  { id: 25, text: "I have excellent ideas.", trait: "openness", reverse: false },
  { id: 26, text: "I have little to say.", trait: "extraversion", reverse: true },
  { id: 27, text: "I have a soft heart.", trait: "agreeableness", reverse: false },
  { id: 28, text: "I often forget to put things back in their proper place.", trait: "conscientiousness", reverse: true },
  { id: 29, text: "I get upset easily.", trait: "neuroticism", reverse: false },
  { id: 30, text: "I do not have a good imagination.", trait: "openness", reverse: true },
  { id: 31, text: "I talk to a lot of different people at parties.", trait: "extraversion", reverse: false },
  { id: 32, text: "I am not really interested in others.", trait: "agreeableness", reverse: true },
  { id: 33, text: "I like order.", trait: "conscientiousness", reverse: false },
  { id: 34, text: "I change my mood a lot.", trait: "neuroticism", reverse: false },
  { id: 35, text: "I am quick to understand things.", trait: "openness", reverse: false },
  { id: 36, text: "I don't like to draw attention to myself.", trait: "extraversion", reverse: true },
  { id: 37, text: "I take time out for others.", trait: "agreeableness", reverse: false },
  { id: 38, text: "I shirk my duties.", trait: "conscientiousness", reverse: true },
  { id: 39, text: "I have frequent mood swings.", trait: "neuroticism", reverse: false },
  { id: 40, text: "I use difficult words.", trait: "openness", reverse: false },
  { id: 41, text: "I don't mind being the center of attention.", trait: "extraversion", reverse: false },
  { id: 42, text: "I feel others' emotions.", trait: "agreeableness", reverse: false },
  { id: 43, text: "I follow a schedule.", trait: "conscientiousness", reverse: false },
  { id: 44, text: "I get irritated easily.", trait: "neuroticism", reverse: false },
  { id: 45, text: "I spend time reflecting on things.", trait: "openness", reverse: false },
  { id: 46, text: "I am quiet around strangers.", trait: "extraversion", reverse: true },
  { id: 47, text: "I make people feel at ease.", trait: "agreeableness", reverse: false },
  { id: 48, text: "I am exacting in my work.", trait: "conscientiousness", reverse: false },
  { id: 49, text: "I often feel blue.", trait: "neuroticism", reverse: false },
  { id: 50, text: "I am full of ideas.", trait: "openness", reverse: false },
];

export type Answers = Record<number, number>;

export interface Big5Scores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export function computeScores(answers: Answers): Big5Scores {
  const totals: Big5Scores = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  };
  for (const item of BIG5_ITEMS) {
    const raw = answers[item.id];
    if (typeof raw !== "number") continue;
    totals[item.trait] += item.reverse ? 6 - raw : raw;
  }
  return totals;
}

export const LIKERT_OPTIONS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
] as const;
