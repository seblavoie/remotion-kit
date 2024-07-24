const typescript = require("rollup-plugin-typescript2");
const pkg = require("./package.json");

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ],
    plugins: [
      typescript({
        typescript: require("typescript"),
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          exclude: ["**/*.test.ts", "**/*.test.tsx"],
        },
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.module,
        format: "es",
        exports: "named",
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ],
    plugins: [
      typescript({
        typescript: require("typescript"),
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          exclude: ["**/*.test.ts", "**/*.test.tsx"],
        },
      }),
    ],
  },
];
