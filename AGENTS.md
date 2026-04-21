# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React expense tracker. Application code lives in `src/`. Keep page-level state and dashboard orchestration in `src/App.jsx`, reusable UI in `src/components/`, shared helpers in `src/utils/`, shared constants in `src/constants/`, and static assets in `src/assets/`. Global styles are in `src/index.css`; screen-level styles are in `src/App.css`. The `public/` folder is for files served as-is.

## Architecture Notes
- `src/App.jsx` should coordinate state, filtering, and cross-section derived data, but avoid accumulating presentational JSX or low-level helper logic.
- Keep display sections such as `Summary`, `Highlights`, forms, charts, and lists as focused child components under `src/components/`.
- Shared domain helpers such as transaction normalization belong in `src/utils/transactions.js`; formatting helpers belong in `src/utils/formatters.js`.
- Shared option sets such as transaction categories belong in `src/constants/` so forms and filters read from the same source of truth.
- Prefer passing normalized transaction collections into child components and let components derive their own local display values when that logic is only used by that component.

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server for local development.
- `npm run build`: create a production build in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run lint`: run ESLint across the repository.

Use `npm install` after pulling dependency changes.

## Coding Style & Naming Conventions
Use functional React components and ES modules. Follow the existing style: 2-space/consistent JSX indentation, semicolon-free JavaScript, and single quotes where already used in a file. Name React components in PascalCase (`TransactionList.jsx`), utilities in camelCase (`formatters.js`), and constants modules in camelCase (`categories.js`). Keep component files focused on one responsibility. Prefer extracting reusable UI, constants, or formatting/domain logic into `src/components/`, `src/constants/`, or `src/utils/` instead of growing `App.jsx`.

## Testing Guidelines
There is no dedicated test framework configured yet. Until one is added, contributors should treat `npm run lint` and `npm run build` as the required validation steps before opening a PR. When tests are introduced, place them alongside the feature or in a dedicated `src/__tests__/` directory using clear names such as `TransactionList.test.jsx`.

## Commit & Pull Request Guidelines
The current history starts with `Initial commit`, so there is no deep commit convention yet. Use short, imperative commit messages such as `Add category spending chart` or `Extract transaction form component`. For pull requests, include:

- a brief summary of user-visible changes
- linked issue or task reference when available
- screenshots or short recordings for UI changes
- confirmation that `npm run lint` and `npm run build` passed

## Contributor Notes
Avoid mixing unrelated refactors with feature work. If you add a new shared formatter, transaction helper, chart, or form section, prefer a separate component, constant, or utility file and keep props explicit.
