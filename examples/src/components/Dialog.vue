<template>
  <div>
    <el-button type="text" @click="dialogTableVisible = true">
      open a dialog example
    </el-button>

    <el-dialog title="Shipping address" :visible.sync="dialogTableVisible">
      <h2>Basic table</h2>
      <basic-example></basic-example>

      <h2>Table with fixed column</h2>
      <fixed-example></fixed-example>

      <h2>Grouping table head</h2>
      <grouping-example></grouping-example>

      <h2>Expandable table</h2>
      <expandable-example></expandable-example>
    </el-dialog>
  </div>
</template>

<script>
import { default as BasicExample } from "./Basic.vue";
import { default as FixedExample } from "./Fixed.vue";
import { default as GroupingExample } from "./Grouping.vue";
import { default as ExpandableExample } from "./Expandable.vue";

export default {
  components: {
    BasicExample,
    FixedExample,
    GroupingExample,
    ExpandableExample,
  },
  data() {
    return {
      dialogTableVisible: false,
    };
  },
};
</script>
