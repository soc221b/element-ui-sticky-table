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
    <el-table-column prop="date" label="Date" width="180"></el-table-column>
    <el-table-column prop="name" label="Name" width="180"></el-table-column>
    <el-table-column prop="address" label="Address"></el-table-column>
  </el-table>
</template>
```

```javascript
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
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

### API

`sticky: boolean = false`: Whether the table should be sticky.

`sticky-offset-top: number = 0`: apply offset top, this would be useful when you have fixed element to be offset from.
