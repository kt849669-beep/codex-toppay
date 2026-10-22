import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Collect HTML entry points without traversing generated or nested projects.
function getHtmlFiles(dir, fileList = {}) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = resolve(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      const ignoredDirs = ['node_modules', 'dist', 'build', 'coverage', 'public'];

      // Nested projects resolve imports against a different root.
      const isNestedProject = fs.existsSync(resolve(fullPath, 'package.json'));

      const isHidden = file.startsWith('.');

      if (!ignoredDirs.includes(file) && !isNestedProject && !isHidden) {
        getHtmlFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.html')) {
      let name = fullPath.replace(__dirname, '').replace(/\\/g, '/').substring(1).replace('.html', '');
      fileList[name] = fullPath;
    }
  }
  return fileList;
}

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'toppay-local-routes',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const routes = {
              '/': '/user-app/pages/login.html',
              '/login': '/user-app/pages/login.html',
              '/home': '/user-app/pages/home.html',
              '/admin': '/admin-app/pages/login.html',
            };
            const pathname = new URL(req.url || '/', 'http://localhost').pathname;
            if (routes[pathname]) {
              res.statusCode = 302;
              res.setHeader('Location', routes[pathname]);
              res.end();
              return;
            }
            next();
          });
        },
      },
    ],
    server: {
      port: 3000,
      host: '0.0.0.0'
    },
    // Keep parent workspace PostCSS settings out of this plain-CSS build.
    css: {
      postcss: {
        plugins: []
      }
    },
    build: {
      rollupOptions: {
        input: getHtmlFiles(__dirname)
      }
    }
  };
});
