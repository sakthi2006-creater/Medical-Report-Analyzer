# HealthWise

HealthWise is a health awareness dashboard built with React, TypeScript, Vite, Tailwind CSS, and shadcn-ui.

## What this app includes

- Health data entry and report guidance
- Result explanations and visualization
- Fitness recommendations
- Diet chart support
- Food guide suggestions
- Disclaimer and safety information
- Routed pages for `/`, `/entry`, `/results`, `/fitness`, `/diet-chart`, `/food-guide`, and `/disclaimer`

## Local setup

### Requirements

- Node.js 18+ or compatible version
- npm

### Install dependencies

```powershell
cd "c:\Users\USER\Downloads\HealthWise-Full-Project"
npm install
```

### Start the development server

```powershell
npm run dev
```

Open the app at the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```powershell
npm run build
```

### Preview the production build

```powershell
npm run preview
```

## Available scripts

- `npm run dev` — start the Vite development server
- `npm run build` — build the app for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks
- `npm run test` — run Vitest tests
- `npm run test:watch` — run tests in watch mode

## Project structure

- `src/main.tsx` — app entry point
- `src/App.tsx` — main router and app layout
- `src/pages/` — route pages and feature screens
- `src/components/` — shared UI components and shadcn wrappers
- `src/context/HealthContext.tsx` — health state management
- `src/lib/` — utility and analyzer logic

## Notes

- A successful production build was confirmed locally using `npm run build`.
- The app currently uses React Router for page navigation and TanStack Query for client state management.

## License

This repository does not include a license file. Add one if you want to open source this project.
