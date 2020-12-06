<template>
  <div>
    <h1>
      <a
        href="https://github.com/iendeavor/element-ui-sticky-table"
        target="_blank"
      >
        element-ui-sticky-table
      </a>
    </h1>

    <dialog-example> </dialog-example>

    <offset-top-example></offset-top-example>

    <h2>Basic table</h2>
    <basic-example></basic-example>

    <h2>Table with fixed column</h2>
    <fixed-example></fixed-example>

    <h2>Grouping table head</h2>
    <grouping-example></grouping-example>

    <h2>Expandable table</h2>
    <expandable-example></expandable-example>
  </div>
</template>

<script>
import { default as BasicExample } from "./components/Basic.vue";
import { default as DialogExample } from "./components/Dialog.vue";
import { default as FixedExample } from "./components/Fixed.vue";
import { default as GroupingExample } from "./components/Grouping.vue";
import { default as ExpandableExample } from "./components/Expandable.vue";
import { default as OffsetTopExample } from "./components/OffsetTop.vue";

export default {
  name: "App",
  components: {
    BasicExample,
    DialogExample,
    FixedExample,
    GroupingExample,
    ExpandableExample,
    OffsetTopExample,
  },
};
</script>
