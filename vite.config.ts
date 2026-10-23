import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Serves the Vercel edge functions in /api during `npm run dev`, so the
// GitHub-backed sections work locally (set GITHUB_TOKEN in .env.local).
function vercelApi(): Plugin {
  return {
    name: "vercel-api",
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ""));

      server.middlewares.use("/api", async (req, res, next) => {
        const name = new URL(req.url ?? "/", "http://localhost").pathname.slice(1);
        if (!/^[a-z-]+$/.test(name)) return next();

        try {
          const mod = await server.ssrLoadModule(`/api/${name}.ts`);
          const response: Response = await mod.default(new Request(`http://${req.headers.host}/api${req.url}`));
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          server.config.logger.error(`[api/${name}] ${error}`);
          res.statusCode = 500;
          res.end();
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), vercelApi()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
