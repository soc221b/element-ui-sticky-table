<template>
  <div>
    <el-button type="text" @click="dialogTableVisible = true"
      >open a Table nested Dialog</el-button
    >

    <el-dialog title="Shipping address" :visible.sync="dialogTableVisible">
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
    };
  },
};
</script>
