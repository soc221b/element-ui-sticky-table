import rm from "rimraf";
import path from "path";
import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";

rm.sync(path.resolve("dist/**/*"));

const input = "src/index.vue";
const formats = ["es", "cjs", "iife"];

const configs = [];
formats.forEach((format) => {
  const config = {
    input,
    external: ["element-ui"],
    plugins: [
      vue(),
    ],
    output: {
      globals: {
        "element-ui": "ELEMENT",
      },
      format,
      name: "StickyTable",
      extend: true,
      exports: "auto",
    },
  };

  configs.push({
    ...config,
    output: {
      ...config.output,
      file: path.resolve(`dist/index.${format}.js`),
    },
  });

  configs.push({
    ...config,
    plugins: [
      ...config.plugins,
      terser(),
    ],
    output: {
      ...config.output,
      file: path.resolve(`dist/index.${format}.prod.js`),
    },
  });
});
export default configs;
