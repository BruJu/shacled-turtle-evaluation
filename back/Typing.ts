

export type CompleteData = {
  profile: YourExperience;
  tasks: TaskResult[];
  feedback: YourFeedback;
};

export type YourExperience = {
  prof: string;
  ttlexp: string;
  schemaexp: string;
};

export type TaskResult = {
  id: number;
  schema: string;
  corpus: string;
  time: number;
  writtenText: string;
  stats: CompletionStalk;
}

export type CompletionStalk = {
  show: number;
  click: number;
  explicitelyAsked: number;
}

export const yourFeedbackCategories = [
  "toohard",
  "equaldifficulty",
  "succeed",
  "exp1usefull",
  "exp2usefull",
  "prefer1",
  "typingisok",
  "freewhy",
  "freetext"
] as const;

// ElementType from https://github.com/microsoft/TypeScript/issues/28046
type ElementType < T extends ReadonlyArray < unknown > > = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;

export type YourFeedBackCategory = ElementType<typeof yourFeedbackCategories>;

export type YourFeedback = {[key in YourFeedBackCategory]: string};
