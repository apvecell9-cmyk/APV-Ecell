// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * Vite's static-file MIME lookup has no entry for `.jfif`, so JFIF files under
 * `public` are served with an empty `Content-Type`. JFIF is plain JPEG, so
 * answer those requests ourselves with `image/jpeg`.
 *
 * Scoped to `.jfif` only — `.png` / `.jpg` / `.jpeg` / `.webp` keep using Vite's
 * own static middleware, unchanged.
 */
function jfifContentTypePlugin(): Plugin {
  return {
    name: "jfif-content-type",
    configureServer(server) {
      const configuredPublicDir = server.config.publicDir;
      if (!configuredPublicDir) return;
      const publicRoot = path.resolve(configuredPublicDir);
      const publicPrefix = publicRoot + path.sep;

      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? "").split("?")[0] ?? "";
        if (!pathname.toLowerCase().endsWith(".jfif")) return next();

        let filePath: string;
        try {
          filePath = path.resolve(publicRoot, decodeURIComponent(pathname).replace(/^\/+/, ""));
        } catch {
          return next();
        }
        if (!filePath.startsWith(publicPrefix)) return next();

        const stats = fs.statSync(filePath, { throwIfNoEntry: false });
        if (!stats?.isFile()) return next();

        res.statusCode = 200;
        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Content-Length", stats.size);
        res.setHeader("Cache-Control", "no-cache");
        fs.createReadStream(filePath).pipe(res);
      });
    },
  };
}

export default defineConfig({
  plugins: [jfifContentTypePlugin()],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
