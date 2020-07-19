'use strict';

const style = document.createElement("style");
style.type = "text/css";
style.innerHTML = ".stop-scrolling { overflow-y: hidden; }";
document.getElementsByTagName("head")[0].appendChild(style);

function isAboveTop(el) {
  if (el === undefined) return false;
  if (el === null) return false;
  let rect = el.getBoundingClientRect();
  let top = rect.top;
  el = el.parentNode;

  do {
    rect = el.getBoundingClientRect();

    if (top <= rect.bottom === false) return false;
    if (top < rect.top) return true;

    el = el.parentNode;
  } while (el !== document.documentElement);
  return false;
}

function isBelowBottom(el, bottom) {
  if (el === undefined) return false;
  if (el === null) return false;
  let rect = el.getBoundingClientRect();
  el = el.parentNode;

  do {
    rect = el.getBoundingClientRect();

    if (bottom > rect.bottom) return true;

    el = el.parentNode;
  } while (el !== document.documentElement);
  return false;
}

var index = {
  inheritAttrs: true,

  data() {
    return {
      tableNode: null,
      isSticking: false,
      oldScrollableParentNodes: [],
      maxHeight: null,
    };
  },

  computed: {
    scrollableParentNodes() {
      const nodes = [];
      try {
        let parentNode = this.tableNode.parentElement;
        while (parentNode !== null) {
          // for outer wrapper which is scrollable
          if (parentNode.clientHeight < parentNode.scrollHeight)
            nodes.push(parentNode);
          // for nested tables
          if (parentNode.classList.contains("el-table__body-wrapper"))
            nodes.push(parentNode);
          if (parentNode.classList.contains("el-dialog__wrapper"))
            nodes.push(parentNode);

          parentNode = parentNode.parentElement;
        }
      } catch (error) {}
      return nodes;
    },
  },

  watch: {
    scrollableParentNodes: {
      immediate: true,
      handler() {
        if (this.oldScrollableParentNodes !== null) {
          this.oldScrollableParentNodes.forEach((node) =>
            node.removeEventListener("scroll", this.handleScrollY)
          );
        }
        this.scrollableParentNodes.forEach((node) =>
          node.addEventListener("scroll", this.handleScrollY)
        );
        this.oldScrollableParentNodes = [...this.scrollableParentNodes];
      },
    },
    data: {
      immediate: true,
      deep: true,
      handler() {
        this.maxHeight = null;
        this.stick();
      },
    },
  },

  mounted() {
    this.tableNode = this.$refs.table.$el;
    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    this.scrollableParentNodes.forEach((node) =>
      node.removeEventListener("scroll", this.handleScrollY)
    );
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize(event) {
      this.maxHeight = null;
      this.stick();
    },
    handleScrollY(event) {
      this.stick(event);
    },
    stick(event) {
      if (isAboveTop(this.tableNode)) this.addSticky();
      else this.removeSticky();
    },
    addSticky() {
      if (this.isSticking) return;
      this.isSticking = true;

      // change scrolling target to this table
      this.scrollableParentNodes.forEach((node) =>
        node.classList.add("stop-scrolling")
      );
      setTimeout(
        () =>
          this.scrollableParentNodes.forEach((node) =>
            node.classList.remove("stop-scrolling")
          ),
        0
      );

      this.calcHeight();
    },
    removeSticky() {
      if (this.isSticking === false) return;
      this.isSticking = false;

      this.maxHeight = null;
    },
    calcHeight() {
      if (this.maxHeight !== null) return;

      let safeCount = 0;
      let max = document.body.scrollHeight;
      let min = 0;
      let mid = null;
      while (++safeCount < 100 && min < max) {
        mid = Math.floor((max + min) / 2);
        if (isBelowBottom(this.tableNode, mid)) max = mid - 1;
        else min = mid + 1;
      }
      this.maxHeight = mid;
    },
  },
  template: `
  <el-table
    ref="table"
    v-bind="$attrs"
    v-on="$listeners"
    :max-height="maxHeight"
  >
    <slot>
      <template></template>
    </slot>
    <template name="header">
      <template slot="header"></template>
    </template>
  </el-table>
  `,
};

module.exports = index;
