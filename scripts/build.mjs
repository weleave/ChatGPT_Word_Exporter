import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import esbuild from "esbuild";

const root = process.cwd();
const distDir = resolve(root, "dist");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

const baseBuildOptions = {
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["chrome114"],
  mainFields: ["browser", "module", "main"],
  sourcemap: false,
};

await Promise.all([
  esbuild.build({
    ...baseBuildOptions,
    entryPoints: [resolve(root, "src/popup.js")],
    outfile: resolve(distDir, "popup.js"),
  }),
  esbuild.build({
    ...baseBuildOptions,
    entryPoints: [resolve(root, "src/content.js")],
    outfile: resolve(distDir, "content.js"),
  }),
  cp(resolve(root, "manifest.json"), resolve(distDir, "manifest.json")),
  cp(resolve(root, "popup.html"), resolve(distDir, "popup.html")),
  cp(resolve(root, "popup.css"), resolve(distDir, "popup.css")),
]);

console.log(`Built extension into ${distDir}`);
