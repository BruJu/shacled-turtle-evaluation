<template lang="pug">
div
  div(class="section")
    div(class="container content")
      h1 Shacled Turtle Experiment - Collected results

      h2 Coloring in Likert answers ("Thinking" column)
      ul 
        li Text is the raw answer of the volunteer: ++ means "Strongly agree", + means "Agree", "=" means Neutral, "-" means "Disagree", "--" means "Strongly Disagree"
        li
          | Red = We are not happy with this answer (the user agrees that the
          | exercice was hard, the user finds the naive approach very good, the user
          | prefers the naive approach ...). Green = We are happy with the answer
          | (The user disagrees that the exercices were hard, the user finds the
          | naive approach bad, the user prefers Shacled Turtle, ...).
        li In a perfect world, all answers are green
      
      h2 Collected answers


  table(class="table is-bordered is-striped is-hoverable")
    tr
      th <input type="checkbox" v-model="hidecol.a" /> <span v-on:click="hidecol.a = !hidecol.a" v-if="!hidecol.a">Identifier</span>
      th <input type="checkbox" v-model="hidecol.b" /> <span v-on:click="hidecol.b = !hidecol.b" v-if="!hidecol.b">Proficiency</span>
      th <input type="checkbox" v-model="hidecol.c" /> <span v-on:click="hidecol.c = !hidecol.c" v-if="!hidecol.c">We are</span>
      th <input type="checkbox" v-model="hidecol.d" /> <span v-on:click="hidecol.d = !hidecol.d" v-if="!hidecol.d">Experiment 1</span>
      th <input type="checkbox" v-model="hidecol.e" /> <span v-on:click="hidecol.e = !hidecol.e" v-if="!hidecol.e">Experiment 2</span>
      th <input type="checkbox" v-model="hidecol.f" /> <span v-on:click="hidecol.f = !hidecol.f" v-if="!hidecol.f">Thinking</span>
      th <input type="checkbox" v-model="hidecol.g" /> <span v-on:click="hidecol.g = !hidecol.g" v-if="!hidecol.g">Why prefer</span>
      th <input type="checkbox" v-model="hidecol.h" /> <span v-on:click="hidecol.h = !hidecol.h" v-if="!hidecol.h">Extra comments</span>
    tbody(
      v-for="line in lines"
      v-bind:key="line._id"
    )
      Result(:data="line" :hidecol="hidecol")

</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import linesJson from "./data.json";
import Result from "./Result.vue";
import { StoredInfo } from '../back/src/FileDataStorage';

type Line = StoredInfo & { _id: string };

export default defineComponent({
  components: { Result },
  setup() {
    const lines = ref<Line[]>([]);
    lines.value = linesJson.sort((a, b) => a.date - b.date);

    const hidecol = ref({
      "a": false,
      "b": false,
      "c": false,
      "d": false,
      "e": false,
      "f": false,
      "g": false,
      "h": false,
    })
    return { lines: lines, hidecol: hidecol }
  }
})

</script>
