<template lang="pug">
tr
  td(class="is-size-7")
    div(v-if="!hidecol.a")
      | <em>ID:</em> {{ data._id }}
      | <br> {{ toDate(data.date) }}
  td
    table(v-if="!hidecol.b")
      tr
        td(class="is-size-7") SemWeb Exp
        td {{ getStr("prof", data.sent.profile.prof) }}
      tr
        td(class="is-size-7") Turtle Exp
        td {{ getStr("ttlexp", data.sent.profile.ttlexp) }}
      tr
        td(class="is-size-7") Schema Exp
        td {{ getStr("schemaexp", data.sent.profile.schemaexp) }}
  td 
    div(v-if="!hidecol.c") {{ weAre }}
  td
    Experiment(:task="data.sent.tasks[0]" v-if="!hidecol.d")
  td
    Experiment(:task="data.sent.tasks[1]" v-if="!hidecol.e")
  td
    div(v-if="!hidecol.f")
      |      <em class="is-size-7">{{ likertName("toohard")         }}</em> <strong :style="styleof('toohard', -1)"                 >{{ likertValue("toohard")         }}</strong>
      | <br> <em class="is-size-7">{{ likertName("equaldifficulty") }}</em> <strong :style="styleof('equaldifficulty', 1)"          >{{ likertValue("equaldifficulty") }}</strong>
      | <br> <em class="is-size-7">{{ likertName("succeed")         }}</em> <strong :style="styleof('succeed', 1)"                  >{{ likertValue("succeed")         }}</strong>
      | <br> <em class="is-size-7">{{ likertName("exp1usefull")     }}</em> <strong :style="styleof('exp1usefull', whatWeWant)"     >{{ likertValue("exp1usefull")     }}</strong>
      | <br> <em class="is-size-7">{{ likertName("exp2usefull")     }}</em> <strong :style="styleof('exp2usefull', whatWeWant * -1)">{{ likertValue("exp2usefull")     }}</strong>
      | <br> <em class="is-size-7">{{ likertName("prefer1")         }}</em> <strong :style="styleof('prefer1', whatWeWant)"         >{{ likertValue("prefer1")         }}</strong>
      | <br> <em class="is-size-7">{{ likertName("typingisok")      }}</em> <strong :style="styleof('typingisok', whatWeWant)" >{{ likertValue("typingisok")      }}</strong>
  td(style="width: 20em;")
    span(v-if="!hidecol.g")
      | {{ data.sent.feedback.freetext }}
  td(style="width: 20em;")
    span(v-if="!hidecol.h")
      | {{ data.sent.feedback.freewhy }}

</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import { StoredInfo } from '../back/src/FileDataStorage';
import { YourFeedBackCategory } from "../back/Typing";
import Experiment from "./Experiment.vue"

type Line = StoredInfo & { _id: string };

const youform = {
  prof: {
    "low": "Less than a year",
    "medium": "1-2 years",
    "high": "3-4 years",
    "veryhigh": "5+ years"
  },
  ttlexp: {
    "none": "No experience",
    "low": "Know the language",
    "medium": "Easility write files",
    "high": "On a daily basis"
  },
  schemaexp: {
    "none": "Do not know",
    "low": "Heard and browse a bit",
    "medium": "Used it",
    "high": "Expert"
  }
};

const likert = {
  toohard: "One of the task was hard",
  equaldifficulty: "Task are equal difficulty",
  succeed: "Succeeded in the task",
  exp1usefull: "First suggestion is usefull",
  exp2usefull: "Second suggestion is usefull",
  prefer1: "Prefered first",
  typingisok: "Frustration",
};



export default defineComponent({
  components: { Experiment },
  props: {
    data: {
      type: Object as PropType<Line>,
      required: true
    },
    hidecol: { type: Object, required: true }
  },
  computed: {
    weAre() {
      return this.data.sent.tasks.findIndex(
        task => task.schema == "data/foaf-shacledturtle.ttl"
          || task.schema == "data/schema-shacledturtle.ttl"
      ) + 1;
    },
    whatWeWant() {
      const v = this.data.sent.tasks.findIndex(
        task => task.schema == "data/foaf-shacledturtle.ttl"
          || task.schema == "data/schema-shacledturtle.ttl"
      );

      return v == 0 ? 1 : -1;
    },
    badnessStyle() {
      return this.data.sent.tasks.filter(t => t.writtenText.indexOf("schema:") != -1).length === 0
        ? "" : "color: red;"

    }
  },
  methods: {
    toDate(value: number): string {
      function pad(value: number, size: number) {
        return value.toString().padStart(size, "0");
      }

      const date = new Date(value);
      return pad(date.getFullYear(), 4)
        + "-" + pad(date.getMonth() + 1, 2)
        + "-" + pad(date.getDate(), 2)
        + " " + pad(date.getHours(), 2)
        + ":" + pad(date.getMinutes(), 2)
        + ":" + pad(date.getSeconds(), 2);
    },
    getStr(where: YourFeedBackCategory, content: string) {
      return youform[where][content];
    },
    likertName(where: YourFeedBackCategory) {
      return likert[where];
    },
    likertValue(where: YourFeedBackCategory) {
      return this.ranking(this.data.sent.feedback[where]);
    },
    styleof(where: string, expect: 1 | -1) {
      const val = -(parseInt(this.data.sent.feedback[where]) - 3);
      if (val == 0) return "color: olive; background-color: white;"
      if (val < 0 && expect > 0) return "color: green; background-color: lightgreen;"
      if (val > 0 && expect < 0) return "color: green; background-color: lightgreen;"
      return "color: red; background-color: pink;"
    },
    ranking(x: string | number) {
      switch (x) {
        case "5":
        case 5:
          return "++";
        case "4":
        case 4:
          return "+";
        case "3":
        case 3:
          return "=";
        case "2":
        case 2:
          return "-";
        case "1":
        case 1:
          return "--";
        default:
          return "?";
      }
    }
  }
});

</script>

