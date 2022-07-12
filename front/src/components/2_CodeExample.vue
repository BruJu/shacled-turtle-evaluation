<template lang="pug">
div
  div(ref="editor")
  p
    | This Turtle document is the translation of "The person named John knows
    | another person".
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { turtle } from "@bruju/lang-turtle";
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { basicSetup } from "@codemirror/basic-setup";

const content = `@prefix : <http://example.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix ex: <http://example.org/> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .

:john rdf:type foaf:Person ; foaf:name "John" .
:john foaf:knows :somebody .
:somebody rdf:type foaf:Person .
`;


export default defineComponent({
  setup() {
    const editor = ref<HTMLElement>();

    onMounted(() => {
      new EditorView({
        parent: editor.value!,
        state: EditorState.create({
          doc: content,
          extensions: [
            basicSetup,
            turtle(),
            EditorState.readOnly.of(true)
          ]
        })
      });
    });

    return { editor };
  },
})
</script>

