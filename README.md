# element-ui-sticky-table

## Installation

```
yarn add element-ui-sticky-table
```

```js
import Vue from "vue";
import StickyTable from "element-ui-sticky-table";

// global registration
Vue.component("sticky-table", StickyTable);
// or directly override el-table (StickyTable is a superset of ElTable)
Vue.component("el-table", StickyTable);
```

## Usage

All you need to do is add `sticky` prop to `<el-table>`!

```html
<template>
  <el-table sticky :data="tableData" style="width: 100%;">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>
```

```javascript
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
      ],
    };
  },
};
```

## Example

```
cd examples
yarn install
yarn dev
```
