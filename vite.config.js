import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        login: resolve(import.meta.dirname, "index.html"),
        home: resolve(import.meta.dirname, "home.html"),
        home_page: resolve(import.meta.dirname, "home-page.html"),
        admin_app: resolve(import.meta.dirname, "admin-app.html")
      }
    }
  }
});
