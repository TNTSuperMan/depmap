import { build } from "bun";

build({
    entrypoints: ["./src/bin.ts", "./src/module.ts"],
    minify: true,
    outdir: "dist",
    format: "esm"
})
build({
    entrypoints: ["./src/module.ts"],
    minify: true,
    outdir: "dist",
    naming: "cjs.js",
    format: "cjs"
})