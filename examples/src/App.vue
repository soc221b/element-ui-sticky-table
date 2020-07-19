<template>
  <div>
    <h1>Sticky table</h1>

    <h2>Basic table</h2>
    <basic-example></basic-example>

    <h2>Table with fixed column</h2>
    <fixed-example></fixed-example>

    <h2>Grouping table head</h2>
    <grouping-example></grouping-example>

    <h2>A table nested dialog</h2>
    <dialog-example>
      <h2>Basic table</h2>
      <basic-example></basic-example>

      <h2>Table with fixed column</h2>
      <fixed-example></fixed-example>

      <h2>Grouping table head</h2>
      <grouping-example></grouping-example>
    </dialog-example>
  </div>
</template>

<script>
import { default as BasicExample } from './components/Basic.vue'
import { default as DialogExample } from './components/Dialog.vue'
import { default as FixedExample } from './components/Fixed.vue'
import { default as GroupingExample } from './components/Grouping.vue'

export default {
  name: 'App',
  components: {
    BasicExample,
    DialogExample,
    FixedExample,
    GroupingExample,
  }
}
</script>
