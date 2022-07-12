<template lang="pug">
section(class="section")
  div(class="container box")
    h1(class="title") Shacled Turtle Evaluation Platform
    
    GeneralContext
    AboutExperiment
    AboutYou(v-on:completed="complete('initialForm')")
    Evaluation(
      :taskid=1
      :showif="step != 'initialForm'"
      v-on:completed="complete('experiment1')"
    )
    Evaluation(
      :taskid=2
      :showif="step != 'initialForm' && step != 'experiment1'"
      v-on:completed="complete('experiment2')"
    )
    FinalQuestions(:isok="step == 'finalFeedback'")
    SendTheData(:isok="step == 'finalFeedback'")
    ThankYou()
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import GeneralContext from "./1_GeneralContext.vue";
import AboutExperiment from "./2_AboutExperiment.vue";
import AboutYou from "./3_AboutYou.vue";
import Evaluation from "./4_Evaluation.vue";
import FinalQuestions from "./5_FinalQuestions.vue";
import SendTheData from "./6_SendTheData.vue";
import ThankYou from './7_ThankYou.vue';

type GlobalState = {
  step: "initialForm" | "experiment1" | "experiment2" | "finalFeedback"
};

export default defineComponent({
  components: {
    GeneralContext, AboutExperiment, AboutYou,
    Evaluation, FinalQuestions, SendTheData, ThankYou
  },
  data(): GlobalState {
    return {
      step: "initialForm"
    };
  },
  methods: {
    complete(step: "initialForm" | "experiment1" | "experiment2") {
      if (step === "initialForm") {
        this.step = "experiment1";
      } else if (step === 'experiment1') {
        this.step = "experiment2";
      } else if (step === "experiment2") {
        this.step = "finalFeedback";
      }
    }
  }
});
</script>
