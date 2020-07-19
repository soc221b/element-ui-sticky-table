import rm from "rimraf";
import path from "path";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import globals from "rollup-plugin-node-globals";
import vue from "rollup-plugin-vue";
import pug from "rollup-plugin-pug";
import packageJson from "./package.json";

rm.sync(path.resolve("dist/**/*"));

const packageName = packageJson.name;
const pascalCasePackageName = packageJson.name
  .split("-")
  .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
  .join("");

const input = "src/index.js";
const formats = ["es", "umd", "amd", "cjs", "iife", "system"];

const configs = [];
formats.forEach((format) => {
  const config = {
    input,
    output: {
      format,
      name: pascalCasePackageName,
      extend: true,
    },
  };

  configs.push({
    ...config,
    plugins: [
      pug(),
      vue(),
      replace({
        __DEV__: true,
      }),
      resolve(),
      globals(),
    ],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.js`),
    },
  });

  configs.push({
    ...config,
    plugins: [
      pug(),
      vue(),
      replace({
        __DEV__: false,
      }),
      resolve(),
      globals(),
      terser(),
    ],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.prod.js`),
    },
  });
});
export default configs;
