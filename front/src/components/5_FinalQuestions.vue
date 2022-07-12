<template lang="pug">
div(class="box container")
  h2(class="subtitle is-2") Final questionnaire

  p(class="content")
    | The autocompletion engine was powered by our autocompletion CodeMirror extension.
    | We would like to get your feedback with the experiment.


  table(class="table has-text-centered")
    tr
      th
      th(style="width: 7em;") Strongly agree
      th(style="width: 7em;") Agree
      th(style="width: 7em;") Neutral
      th(style="width: 7em;") Disagree
      th(style="width: 7em;") Strongly disagree
    LikertRow(
      question="At least one of the tasks was hard"
      fieldname="toohard"
      v-on:changelling="changedValue($event)"
    )
    LikertRow(
      question="The two given texts were of equal difficulty (regardless of the completion engine)"
      fieldname="equaldifficulty"
      v-on:changelling="changedValue($event)"
    )
    LikertRow(
      question="I think I succeeded in the given tasks"
      fieldname="succeed"
      v-on:changelling="changedValue($event)"
    )
    LikertRow(
      question="The suggestions provided in the first experiment were useful"
      fieldname="exp1usefull"
      v-on:changelling="changedValue($event)"
    )
    LikertRow(
      question="The suggestions provided in the second experiment were useful"
      fieldname="exp2usefull"
      v-on:changelling="changedValue($event)"
    )
    LikertRow(
      question="I preferred the autocompletion provided by the first experiment rather than the second"
      fieldname="prefer1"
      v-on:changelling="changedValue($event)"
    )
    LikertRow(
      :question="'I was frustrated in experiment ' + shacledturtlenumber + ' to sometimes get no recommendation at all'"
      fieldname="typingisok"
      v-on:changelling="changedValue($event)"
    )

  o-field(
    label="If you preferred one of the suggestion engines, explain which and why"
  )
    o-input(type="textarea" v-model="freewhy")
  
  o-field(
    label="If you have any other comments, feel free to write them"
  )
    o-input(type="textarea" v-model="freetext")

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { YourFeedback, YourFeedBackCategory } from '../Typing';
import LikertRow from './briks/LikertRow.vue';
import { vueStore } from "../Store";

export default defineComponent({
  components: {
    LikertRow
  },
  data(): { data: YourFeedback, freewhy: string, freetext: string } {
    return {
      data: {
        "toohard": "",
        "equaldifficulty": "",
        "succeed": "",
        "exp1usefull": "",
        "exp2usefull": "",
        "prefer1": "",
        "typingisok": "",
        "freewhy": "",
        "freetext": ""
      },
      freewhy: "",
      freetext: ""
    }
  },
  methods: {
    changedValue({ value, field }: { value: string, field: YourFeedBackCategory }) {
      this.data[field] = value;
      vueStore().updateFeedback(this.data);
    }
  },
  watch: {
    freewhy() {
      this.data.freewhy = this.freewhy;
      vueStore().updateFeedback(this.data);
    },
    freetext() {
      this.data.freetext = this.freetext;
      vueStore().updateFeedback(this.data);
    },
  },
  computed: {
    shacledturtlenumber() {
      const id = vueStore().getShacledTurleExprimentNumber();

      if (id === null) return "???";
      return (id + 1).toString();
    }
  }
})
</script>
