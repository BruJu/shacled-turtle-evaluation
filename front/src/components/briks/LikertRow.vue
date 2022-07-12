<template lang="pug">
tr
  th
    | {{ question }}
  td(v-on:click="vals = '5'")
    o-radio(v-model="vals" :name="fieldname + '5'" native-value="5")
  td(v-on:click="vals = '4'")
    o-radio(v-model="vals" :name="fieldname" native-value="4")
  td(v-on:click="vals = '3'")
    o-radio(v-model="vals" :name="fieldname" native-value="3")
  td(v-on:click="vals = '2'")
    o-radio(v-model="vals" :name="fieldname" native-value="2")
  td(v-on:click="vals = '1'")
    o-radio(v-model="vals" :name="fieldname" native-value="1")
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    fieldname: { type: String, required: true, readonly: true },
    question: { type: String, required: true }
  },
  data() {
    return {
      vals: ""
    }
  },
  methods: {
    onChange() {
      this.$emit("changelling", { value: this.vals.toString(), field: this.fieldname });
    }
  },
  watch: {
    vals() { this.onChange(); }
  }
})
</script>
