<template lang="pug">
div
  | <em class="is-size-7">Schema: </em> {{ task.schema }}
  | <br> <em class="is-size-7">Corpus: </em> {{ task.corpus }}
  | <br> <em class="is-size-7">Time: </em> {{ timee(task.time) }}
  | <br> <em class="is-size-7">Show=</em> {{task.stats.show}} / 
  |      <em class="is-size-7">Ask=</em> {{task.stats.explicitelyAsked}} / 
  |      <em class="is-size-7">Click=</em> {{task.stats.click}}
  | <br> <button v-on:click="show = !show">Display</button>
  | <br> <pre v-if="show">{{ task.writtenText }}</pre>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return { show: false }
  },
  methods: {
    timee(time: number) {
      const minutes = Math.floor(time / 60 / 1000);
      const seconds = Math.floor(time      / 1000 % 60);

      return minutes + ":" + seconds.toString().padStart(2, "0");
    }
  }
});
</script>