import Ajv, {JSONSchemaType} from "ajv";
import * as T from "../Typing";

const ajv = new Ajv();

export const YourExperienceSchema: JSONSchemaType<T.YourExperience> = {
  type: "object",
  properties: {
    prof: { type: "string" },
    ttlexp: { type: "string" },
    schemaexp: { type: "string" }
  },
  required: ["prof", "ttlexp", "schemaexp"],
  additionalProperties: false
}

// export const YourExperienceCheck = ajv.compile(YourExperienceSchema);

export const CompletionStalkSchema: JSONSchemaType<T.CompletionStalk> = {
  type: "object",
  properties: {
    show: { type: "number" },
    click: { type: "number" },
    explicitelyAsked: { type: "number" }
  },
  required: ["show", "click", "explicitelyAsked"],
  additionalProperties: false
};

export const TaskResultSchema: JSONSchemaType<T.TaskResult> = {
  type: "object",
  properties: {
    id: { type: "number" },
    schema: { type: "string" },
    corpus: { type: "string" },
    time: { type: "integer" },
    writtenText: { type: "string" },
    stats: CompletionStalkSchema
  },
  required: ["id", "schema", "corpus", "time", "writtenText"]
};

// export const TaskResultCheck = ajv.compile(TaskResultSchema);

export const FeedbackSchema: JSONSchemaType<T.YourFeedback> = {
  type: "object",
  properties: {
    toohard: { type: "string" },
    equaldifficulty: { type: "string" },
    succeed: { type: "string" },
    exp1usefull: { type: "string" },
    exp2usefull: { type: "string" },
    prefer1: { type: "string" },
    typingisok: { type: "string" },
    freewhy: { type: "string" },
    freetext: { type: "string" }
  },
  required: T.yourFeedbackCategories,
  additionalProperties: false
}

export const schema: JSONSchemaType<T.CompleteData> = {
  type: "object",
  properties: {
    profile: YourExperienceSchema,
    tasks: {
      type: "array", minItems: 2, maxItems: 200, 
      items: TaskResultSchema,
    },
    feedback: FeedbackSchema
  },
  required: ["profile", "tasks", "feedback"],
  additionalProperties: false
};

export const check = ajv.compile(schema);

export type Answer = T.CompleteData;
