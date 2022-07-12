<template lang="pug">
div(class="box container")
  h2(class="subtitle is-2") About you

  o-field(label="What is your experience with Semantic Web technologies?")
    ul
      li
        o-radio(v-model="prof" name="prof" native-value="low")
          |  Less than a year
      li
        o-radio(v-model="prof" name="prof" native-value="medium")
          |  1-2 years
      li
        o-radio(v-model="prof" name="prof" native-value="high")
          |  3-4 years
      li
        o-radio(v-model="prof" name="prof" native-value="veryhigh")
          |  5+ years

  o-field(label="What is your experience with the Turtle language?")
    ul
      li
        o-radio(v-model="ttlexp" name="ttlexp" native-value="none")
          |  No experience / I saw some documents written in Turtle
      li
        o-radio(v-model="ttlexp" name="ttlexp" native-value="low")
          |  I know the language
      li
        o-radio(v-model="ttlexp" name="ttlexp" native-value="medium")
          |  I can easily write Turtle documents
      li
        o-radio(v-model="ttlexp" name="ttlexp" native-value="high")
          |  I write Turtle documents on a daily basis
  
  o-field(label='What is your experience with the foaf ontology?')
    ul
      li
        o-radio(v-model="schemaexp" name="schemaexp" native-value="none")
          |  I do not know this ontology
      li
        o-radio(v-model="schemaexp" name="schemaexp" native-value="low")
          |  I heard of it and browsed the page
      li
        o-radio(v-model="schemaexp" name="schemaexp" native-value="medium")
          |  I have used it
      li
        o-radio(v-model="schemaexp" name="schemaexp" native-value="high")
          |  I am an expert

  p(class="has-text-centered")
    button(
      class="button is-primary"
      v-on:click="clickButton()"
      :disabled="schemaexp == '' || prof === '' || ttlexp === ''"
    ) {{ !clickedOnce ? "Start the experiments" : "See below for the tasks" }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { vueStore } from '../Store';
import { YourExperience } from '../Typing';

export default defineComponent({
  data(): YourExperience & { clickedOnce: boolean } {
    const store = vueStore()
    return {
      prof: store.data.profile.prof,
      ttlexp: store.data.profile.ttlexp,
      schemaexp: store.data.profile.schemaexp,
      clickedOnce: false
    };
  },
  watch: {
    prof() { this.onChange(); },
    ttlexp() { this.onChange(); },
    schemaexp() { this.onChange(); }
  },
  methods: {
    onChange() {
      vueStore().updateExperience(this.$data);
    },
    clickButton() {
      if (this.clickedOnce === false) {
        this.$emit("completed");
        this.clickedOnce = true;
      }
    }
  }
});
</script>
