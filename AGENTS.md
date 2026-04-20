# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React expense tracker. Application code lives in `src/`. Keep page-level state in `src/App.jsx`, reusable UI in `src/components/`, shared helpers in `src/utils/`, and static assets in `src/assets/`. Global styles are in `src/index.css`; screen-level styles are in `src/App.css`. The `public/` folder is for files served as-is.

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server for local development.
- `npm run build`: create a production build in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run lint`: run ESLint across the repository.

Use `npm install` after pulling dependency changes.

## Coding Style & Naming Conventions
Use functional React components and ES modules. Follow the existing style: 2-space/consistent JSX indentation, semicolon-free JavaScript, and single quotes where already used in a file. Name React components in PascalCase (`TransactionList.jsx`), utilities in camelCase (`formatters.js`), and keep component files focused on one responsibility. Prefer extracting reusable UI or formatting logic into `src/components/` or `src/utils/` instead of growing `App.jsx`.

## Testing Guidelines
There is no dedicated test framework configured yet. Until one is added, contributors should treat `npm run lint` and `npm run build` as the required validation steps before opening a PR. When tests are introduced, place them alongside the feature or in a dedicated `src/__tests__/` directory using clear names such as `TransactionList.test.jsx`.

## Commit & Pull Request Guidelines
The current history starts with `Initial commit`, so there is no deep commit convention yet. Use short, imperative commit messages such as `Add category spending chart` or `Extract transaction form component`. For pull requests, include:

- a brief summary of user-visible changes
- linked issue or task reference when available
- screenshots or short recordings for UI changes
- confirmation that `npm run lint` and `npm run build` passed

## Contributor Notes
Avoid mixing unrelated refactors with feature work. If you add a new shared formatter, chart, or form section, prefer a separate component or utility file and keep props explicit.
