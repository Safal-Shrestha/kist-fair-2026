# e-SIKKA (Client Prototype)

This repository is a client-side React prototype for an e-governance digital wallet administration platform.

Features
- Landing page
- Role-based login (mock)
- Government admin dashboard (budgets, transactions)
- Citizen dashboard (wallet, transactions)
- Protected routes and layouts
- Tailwind CSS, Framer Motion (available), Recharts for charts

Notes for developers
- API placeholders live in `src/services/api.js` and should be replaced with Supabase (or other) calls.
- Authentication is mocked in `src/services/auth.js` and stored in `localStorage`. Replace with real auth.

Run locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

Design and integration notes
- Primary color: Deep Blue (`--color-primary`) and Accent: Green (`--color-accent`).
- All forms use controlled inputs and are ready for API wiring.
- Charts are implemented using `recharts` and are fed with mock data in `src/data`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
