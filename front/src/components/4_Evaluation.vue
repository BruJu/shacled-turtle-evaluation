<template lang="pug">
div(class="box container")
  h2(class="subtitle is-2") {{ taskid === 1 ? "First" : "Second" }} evaluation

  div(
    v-if="!showif"
  )
    | You need to complete the previous tasks to access this task.


  div(
    class="has-text-centered box"
    :style="showif ? '' : 'display: none;'"
  )
    button(
      class="button is-primary"
      style="min-width: 20em;"
      v-on:click="clickButton()"
      :disabled="buttonDisabled"
    ) {{ buttonLabel }}

    span(
      class="button" style="min-width: 5em;"
    ) {{ elapsedTime }}

  div(
    class="box content"
    v-if="!showExperiment && showif"
  )
    p
      | You need to press "Start the experiment" to see the text to translate
      | in Turtle format and the Turtle code editor to fill.

  div(
    class="box content"
    :style="showExperiment ? '' : 'display: none;'"
  ) <em>Translate this text in Turtle using the foaf ontology:</em> <br> {{ corpus }}
  
  div(
    class="box"
    :style="showExperiment ? '' : 'display: none;'"
    ref="editorblock"
  )

  div(
    class="has-text-centered box"
    :style="showExperiment ? '' : 'display: none;'"
  )
    button(
      class="button is-primary"
      style="min-width: 20em;"
      v-on:click="clickButton()"
      :disabled="buttonDisabled"
    ) {{ buttonLabel }}


</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStopwatch } from 'vue-timer-hook';
import { vueStore } from '../Store';
import Task from '../Task';

export default defineComponent({
  props: {
    taskid: { type: Number, required: true },
    showif: { type: Boolean, required: true }
  },
  setup(props, { emit }) {
    const stopwatch = useStopwatch(0, false);

    const editorblock = ref<HTMLElement>();

    let corpus = ref<string>("");

    let task: Task | null = null;

    onMounted(() => {
      const tasks = vueStore().tasks;
      const t = [...tasks];
      const expe = t[props.taskid - 1];

      task = new Task(expe, editorblock.value!,
        () => {
          const goodId = vueStore().getShacledTurleExprimentNumber();
          return goodId !== props.taskid - 1;
        }
      );
      corpus.value = expe.corpus;
    });

    let buttonLabel = ref<string>("Start the experiment");
    let buttonDisabled = ref<boolean>(false);
    const showExperiment = ref<boolean>(false);

    function clickButton() {
      if (task === null) return;

      const res = task.onButtonClick();

      if (res === 'startChrono') {
        stopwatch.start();
        buttonLabel.value = "Finish this experiment"
        showExperiment.value = true;
      } else if (res === 'endChrono') {
        stopwatch.pause();
        buttonLabel.value = "You can not modify this document anymore"
        buttonDisabled.value = true;

        const x = task.finalize()!;

        vueStore().addTask({
          id: props.taskid,
          schema: x.schema,
          corpus: x.corpus,
          time: x.time,
          writtenText: x.writtenDocument,
          stats: x.stats
        });
        emit('completed');
      }
    }

    const elapsedTime = computed(() => {
      let prefix = "";
      if (stopwatch.hours.value > 0) {
        prefix = stopwatch.hours.value.toString().padStart(2, "0") + ":";
      }

      return prefix
        + stopwatch.minutes.value.toString().padStart(2, "0") + ":"
        + stopwatch.seconds.value.toString().padStart(2, "0");
    });
    
    return {
      editorblock,
      corpus,
      clickButton,
      elapsedTime,
      stopwatch,
      buttonLabel,
      buttonDisabled,
      showExperiment
    }
  },
})
</script>
