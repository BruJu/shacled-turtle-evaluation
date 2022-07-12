<template lang="pug">
div(class="container box content")
  h2(class="subtitle is-2") About the experiment

  p(class="content" style="display: none;")
    | This experiment will require you to write two small Turtle
    | documents that translate the information contained in a short text.
    | In one instance, the autocompletion will provide all terms present
    | in the <a href="http://xmlns.com/foaf/spec/">foaf</a> ontology. In the
    | other instance, only a subset of these terms will be suggested, depending
    | on the types of the current subject.
    
  p(class="content" style="display: none;")
    | This experiment will require you to write two small Turtle
    | documents that translate the information contained in a short text.
    | In one instance, the autocompletion will provide all terms present
    | in the <a href="https://schema.org">schema.org</a> ontology. In the
    | other instance, only a subset of these terms will be suggested, depending
    | on the types of the current subject.

  div(class="box")
    h3(class="subtitle is-3") Writing turtle documents

    p(class="content")
      | This experiment requires you to already know how to write Turtle
      | documents such as the following one:

    CodeExample

  div(class="box")
    h3(class="subtitle is-3") Collected data

    p(class="content")
      | In this experiment we will collect the following data:
      ul
        li How long it takes you to complete each task
        li The number of times the completion list appears and the number of times you pick a term from it
        li The Turtle documents you write
        li Your answers to the questions

  div(class="box")
    h3(class="subtitle is-3") Tips

    p(class="content")
      ul
        li For all instances you create, you can use blank nodes or arbitrary IRIs.
        li One of the autocompletion engines expects you to type the instances you create.
        li To manually open the autocompletion menu you have to press ctrl + space.
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CodeExample from "./2_CodeExample.vue";

export default defineComponent({
  components: { CodeExample }
})
</script>
