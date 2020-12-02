<template>
  <el-table v-bind="$attrs" v-on="$listeners" ref="table">
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </el-table>
</template>

<script>
import { Table as ElTable } from "element-ui";

export default {
  name: "sticky-table",

  inheritAttrs: true,

  props: {
    sticky: {
      default: false,
      type: Boolean,
    },
  },

  components: {
    ElTable,
  },

  data() {
    return {
      isStickyTableUpdating: false,
      oldScrollableParentNodes: [],
      tableEl: undefined,
      tableHeader: undefined,
      tableHeaderFixed: undefined,
      tableHeaderFixedRight: undefined,
    };
  },
  computed: {
    scrollableParentNodes() {
      const nodes = [];
      try {
        let parentNode = this.tableEl.parentElement;
        while (parentNode !== null) {
          if (
            ["auto", "scroll", "visible"].includes(
              getComputedStyle(parentNode).overflowY
            )
          ) {
            nodes.push(parentNode);
          }
          parentNode = parentNode.parentElement;
        }
      } catch (error) {}
      return nodes;
    },

    offsetTop() {
      let offsetTop = 0;
      let elTableCount = 0;

      try {
        let parentNode = this.tableEl.parentElement;
        while (parentNode !== null) {
          if (parentNode.classList.contains("el-table")) {
            for (const el of [...this.tableEl.parentElement.children]) {
              if (el.classList.contains("el-table")) break;
              const computedHeight = getComputedStyle(el).height;
              if (computedHeight.endsWith("px"))
                offsetTop -= parseFloat(computedHeight);
            }

            // nested table
            const computedHeight = getComputedStyle(
              [...parentNode.children].find((el) =>
                el.classList.contains("el-table__header-wrapper")
              )
            ).height;
            if (computedHeight.endsWith("px")) {
              offsetTop += parseFloat(computedHeight);
            }
          } else if (parentNode.classList.contains("el-dialog__wrapper")) {
            break;
          }
          parentNode = parentNode.parentElement;
        }
      } catch (error) {}

      return offsetTop;
    },
  },
  watch: {
    scrollableParentNodes: {
      immediate: true,
      handler() {
        this.oldScrollableParentNodes.forEach((node) => {
          node.removeEventListener("scroll", this.adjust);
          node.removeEventListener("wheel", this.adjust);
        });
        this.scrollableParentNodes.forEach((node) => {
          node.addEventListener("scroll", this.adjust);
          node.addEventListener("wheel", this.adjust);
        });
        this.oldScrollableParentNodes = [...this.scrollableParentNodes];
      },
    },
    tableEl() {
      const elTable = this.tableEl;

      const tableHeader = [...elTable.children].find((el) =>
        el.classList.contains("el-table__header-wrapper")
      );
      if (tableHeader !== undefined) {
        this.tableHeader = tableHeader;
      }

      const elTableFixed = [...elTable.children].find((el) =>
        el.classList.contains("el-table__fixed")
      );
      if (elTableFixed !== undefined) {
        this.tableHeaderFixed = [...elTableFixed.children].find((el) =>
          el.classList.contains("el-table__fixed-header-wrapper")
        );
      }

      const elTableFixedRight = [...elTable.children].find((el) =>
        el.classList.contains("el-table__fixed-right")
      );
      if (elTableFixedRight !== undefined) {
        this.tableHeaderFixedRight = [
          ...elTableFixedRight.children,
        ].find((el) => el.classList.contains("el-table__fixed-header-wrapper"));
      }
    },
    tableHeader() {
      if (this.tableHeader === undefined) return;

      this.tableHeader.style.position = "relative";
      // default table zIndex = 1
      this.tableHeader.style.zIndex = "2";
    },
    tableHeaderFixed() {
      if (this.tableHeaderFixed === undefined) return;

      this.tableHeaderFixed.style.position = "relative";
      // fixed table zIndex = 3
      this.tableHeaderFixed.style.zIndex = "4";
    },
    tableHeaderFixedRight() {
      if (this.tableHeaderFixedRight === undefined) return;

      this.tableHeaderFixedRight.style.position = "relative";
      // fixed table zIndex = 3
      this.tableHeaderFixedRight.style.zIndex = "4";

      const parentHeight = getComputedStyle(
        this.tableHeaderFixedRight.parentElement
      ).width;
      const childHeight = getComputedStyle(
        [...this.tableHeaderFixedRight.children].find((el) =>
          el.classList.contains("el-table__header")
        )
      ).width;
      this.tableHeaderFixedRight.style.left = `calc(-${childHeight} + ${parentHeight})`;
    },
  },
  async mounted() {
    if (this.sticky === false) return;

    // wait for nested element rendering
    await this.$nextTick();

    this.tableEl = this.$refs.table.$el;

    window.addEventListener("resize", this.adjust);
  },
  beforeDestroy() {
    this.scrollableParentNodes.forEach((node) => {
      node.removeEventListener("scroll", this.adjust);
      node.removeEventListener("wheel", this.adjust);
    });
    window.removeEventListener("resize", this.adjust);
  },
  methods: {
    adjust() {
      const top =
        this.$refs.table.$el.getBoundingClientRect().top - this.offsetTop;
      const finalTop = top >= 0 ? "0" : Math.abs(top) + "px";

      [this.tableHeader, this.tableHeaderFixed, this.tableHeaderFixedRight]
        .filter((el) => el !== undefined)
        .forEach((el) => {
          el.style.top = finalTop;
        });
    },
  },
};
</script>
