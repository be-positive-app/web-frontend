# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Deploying

The site is a static build: `npm run build` runs `tsc -b`, `vite build`, and
then `scripts/prerender.mjs`, which writes one HTML file per route and
regenerates `sitemap.xml`. Everything Vercel needs is in `vercel.json`.

Two hosts are configured, and they do not share a routing model:

- **Vercel** — `vercel.json`. Vercel checks the filesystem before rewrites, so
  the prerendered files are served for `/support`, `/privacy` and the rest, and
  the catch-all rewrite only picks up paths with no file: `/delete-account/verify/:token`,
  and anything unknown, which renders the noindex 404 view. `cleanUrls` and
  `trailingSlash: false` keep the served URL equal to the canonical tag.
- **Apache** — `public/.htaccess`. Same behaviour expressed with mod_rewrite,
  plus the http/www canonical redirect. Ignored by Vercel.

On both, an unknown path answers 200 with the noindex 404 view rather than a
404 status, because the SPA shell cannot set a status code. Narrowing the
catch-all to the routes that need it would give a real 404 — worth doing once
the host is settled and the change can be verified there.

The www/non-www and http/https canonical redirects live in `.htaccess` for
Apache; on Vercel they are set per-domain in the project's Domains settings,
not in this file.
