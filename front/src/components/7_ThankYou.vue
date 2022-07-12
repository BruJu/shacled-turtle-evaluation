<template lang="pug">
div(class="box container")
  h2(class="subtitle is-2") Thank you

  p(class="content")
    | Thank you for your time.

  p(class="content")
    ul
      li
        | The editor used on experiment {{ shacledturtlenumber }} was powered
        | by <a href="https://github.com/BruJu/shacled-turtle">Shacled Turtle</a>,
        | our autocompletion engine. The engine was using this
        | <a href="data/foaf-shacledturtle.ttl">graph</a> to provide the suggestions,
        | which is the description of the foaf ontology with slight alterations
        | to add inference related to owl:Thing and remove archaic terms.
      li
        | You can test the tool on a smaller example on
        | <a href="https://bruy.at/demo/shacled-turtle/demo.html">this page</a>.

      li
        | The autocompletion engine is freely available as
        | <a href="https://codemirror.net/6/">a Code Mirror 6</a> extension on
        | npm: <a href="https://www.npmjs.com/package/shacled-turtle">shacled-turtle</a>.

  

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { vueStore } from '../Store';

export default defineComponent({
  setup() {
    
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
