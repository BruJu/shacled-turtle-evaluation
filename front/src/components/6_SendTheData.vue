<template lang="pug">
div(class="box container")
  h2(class="subtitle is-2") Send the data

  p This data will be sent:

  textarea(
    v-model="sentdata"
    readonly="readonly"
    style="width: 100%;"
    rows="5"
  )

  p(class="has-text-centered")
    button(
      :class="'button ' + buttonExtraClasses"
      v-on:click="submit()"
      :disabled="buttonDisabled"
    ) {{ buttonText }}

  article(class="message is-danger" v-if="errorMessage")
    div(class="message-body")
      p An error occurred during the operation.

  p
    | If you encounter any difficulties or have any questions, feel free to contact by mail
    | Julian Bruyat (julian.bruyat@insa-lyon.fr) or send by mail the json result
    | data.

</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { vueStore } from '../Store';
import axios from "axios";
// import { CompleteData } from '../Typing';

enum SendState { None, Sent, Sending, Error }

export default defineComponent({
  computed: {
    sentdata(): string {
      return JSON.stringify(vueStore().data, null, 2);
    }
  },
  setup() {
    const store = vueStore();

    const buttonState = ref<SendState>(SendState.None);
    const errorMessage = ref<boolean>(false);

    const buttonDisabled = computed(() => {
      return !(store.data.tasks.length >= 2
        && store.data.feedback.toohard
        && store.data.feedback.equaldifficulty
        && store.data.feedback.succeed
        && store.data.feedback.exp1usefull
        && store.data.feedback.exp2usefull
        && store.data.feedback.prefer1
        && store.data.feedback.typingisok
        && (buttonState.value === SendState.None
          || buttonState.value === SendState.Error)
        );
    });

    const buttonExtraClasses = computed(() => {
      let extra = "";

      if (buttonState.value === SendState.Sending) {
        extra += " is-loading";
      }

      if (buttonState.value === SendState.Error) {
        extra += " is-danger";
      } else {
        extra += " is-primary";
      }

      return extra;
    });

    const buttonText = computed(() => {
      if (buttonState.value === SendState.Sent) {
        return "Results sent. Thank you!"
      } else {
        return "Send the data";
      }
    });

    return {
      buttonState,
      buttonDisabled,
      errorMessage,
      buttonExtraClasses,
      buttonText
    }
  },
  methods: {
    submit() {
      this.buttonState = SendState.Sending;

      axios.post(
        "api/post-results",
        vueStore().data
      ).then(answer => {
        if (answer.status !== 200) {
          this.buttonState = SendState.Error;
          console.error("answer.status === " + answer.status + " !== 200");
          this.errorMessage = true;
        }

        if (answer.data.error !== undefined) {
          this.buttonState = SendState.Error;
          console.error("Server returned an error: " + answer.data.error);
          this.errorMessage = true;
        } else {
          this.buttonState = SendState.Sent;
          this.errorMessage = false;
        }
      })
      .catch(error => {
          this.buttonState = SendState.Error;
        this.errorMessage = true;
        console.error(error);
      });
    }
  }
})
</script>
