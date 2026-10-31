# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Firebase configuration

The app reads Firebase settings from Vite environment variables. Run `Copy-Item .env.example .env.local`, replace the placeholder values with your Firebase web app configuration, then run `npm run dev`. `.env.local` is ignored by Git; do not commit it.

Values prefixed with `VITE_` are included in the client-side app, so do not put private credentials in them. Protect Firebase data with Firebase Security Rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
