import { defineStore } from "pinia";
import { ExperimentConfiguration } from "./ExperimentConfiguration";
import generateExperiment from "./generate-experiment";
import { CompleteData, TaskResult, YourExperience, YourFeedback, yourFeedbackCategories } from "./Typing";

export type StoreState = {
  tasks: ExperimentConfiguration[];
  data: CompleteData;
};


export const vueStore = defineStore('main', {
  state: (): StoreState => ({
    tasks: [],
    data: {
      profile: { prof: "", ttlexp: "", schemaexp: "" },
      tasks: [],
      feedback: {
        toohard: "",
        equaldifficulty: "",
        succeed: "",
        exp1usefull: "",
        exp2usefull: "",
        prefer1: "",
        typingisok: "",
        freetext: "",
        freewhy: ""
      }
    }
  }),
  actions: {
    updateExperience(ref: YourExperience) {
      this.data.profile.prof = ref.prof;
      this.data.profile.schemaexp = ref.schemaexp;
      this.data.profile.ttlexp = ref.ttlexp;
    },

    updateFeedback(ref: YourFeedback) {
      for (const key of yourFeedbackCategories) {
        if (ref[key] !== undefined) {
          this.data.feedback[key] = ref[key];
        }
      }
    },

    async decideTasks() {
      const expe = await generateExperiment();
      this.tasks.push(...expe);
    },

    addTask(taskResult: TaskResult) {
      this.data.tasks.push(taskResult);
    },

    getShacledTurleExprimentNumber(): number | null {
      if (this.tasks.length === 0) return null;

      const x = this.tasks.findIndex(t => (
        t.schemaname.endsWith("schema-shacledturtle.ttl")
        || t.schemaname.endsWith("schema-restricted.ttl")
        || t.schemaname.endsWith("foaf-shacledturtle.ttl")
      ));

      if (x === -1) return null;
      return x;
    }
  }
});
