import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
import StickyTable from "element-ui-sticky-table";

import "./index.css";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Element);
Vue.component("el-table", StickyTable);

new Vue(App).$mount("#app");
