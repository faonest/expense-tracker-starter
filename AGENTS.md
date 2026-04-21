# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React expense tracker. Application code lives in `src/`. Keep app-level transaction state and top-level composition in `src/App.jsx`, reusable UI in `src/components/`, shared helpers in `src/utils/`, shared constants in `src/constants/`, and static assets in `src/assets/`. Global styles are in `src/index.css`; screen-level styles are in `src/App.css`. The `public/` folder is for files served as-is.

## Architecture Notes
- `src/App.jsx` should stay thin: it owns the transaction collection and composes the page, but should avoid section-specific view logic.
- Keep dashboard sections such as `OverviewHero`, `Summary`, `Highlights`, `TransactionForm`, `SpendingByCategoryChart`, and `TransactionList` as focused child components under `src/components/`.
- Components should own local UI state when that state is not shared. Examples in the current structure: `TransactionForm` owns form fields and `TransactionList` owns filter state.
- Derived data should live in the component that renders it unless multiple sections need the same calculation.
- Shared transaction/domain helpers belong in `src/utils/transactions.js`; formatting helpers belong in `src/utils/formatters.js`.
- Shared option sets such as transaction categories belong in `src/constants/` so forms and filters read from the same source of truth.

## Architectural Rules
- Do not move section-specific calculations back into `App.jsx` if only one component consumes them.
- Add a new component when a section grows its own layout, derived values, or internal UI state.
- Reuse helpers from `src/utils/transactions.js` for totals, recent activity, spending-by-category, and normalization instead of duplicating reducers inside components.
- Prefer normalized transaction data at component boundaries. Normalize once near the app state, then pass the normalized collection downward.
- Keep component props narrow. Prefer passing `transactions` and deriving local display data inside the component over passing many precomputed values.
- Import shared categories from `src/constants/categories.js` instead of redefining option lists in components.
- When a piece of state affects multiple sections, keep it in `App.jsx`; when it affects only one section, keep it in that section component.

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server for local development.
- `npm run build`: create a production build in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run lint`: run ESLint across the repository.

Use `npm install` after pulling dependency changes.

## Coding Style & Naming Conventions
Use functional React components and ES modules. Follow the existing style: 2-space/consistent JSX indentation, semicolon-free JavaScript, and single quotes where already used in a file. Name React components in PascalCase (`TransactionList.jsx`), utilities in camelCase (`formatters.js`, `transactions.js`), and constants modules in camelCase (`categories.js`). Keep component files focused on one responsibility. Prefer extracting reusable UI, constants, or formatting/domain logic into `src/components/`, `src/constants/`, or `src/utils/` instead of growing `App.jsx`.

## Testing Guidelines
There is no dedicated test framework configured yet. Until one is added, contributors should treat `npm run lint` and `npm run build` as the required validation steps before opening a PR. When tests are introduced, place them alongside the feature or in a dedicated `src/__tests__/` directory using clear names such as `TransactionList.test.jsx`.

## Commit & Pull Request Guidelines
The current history starts with `Initial commit`, so there is no deep commit convention yet. Use short, imperative commit messages such as `Add category spending chart` or `Extract transaction form component`. For pull requests, include:

- a brief summary of user-visible changes
- linked issue or task reference when available
- screenshots or short recordings for UI changes
- confirmation that `npm run lint` and `npm run build` passed

## Contributor Notes
Avoid mixing unrelated refactors with feature work. If you add a new shared formatter, transaction helper, chart, or form section, prefer a separate component, constant, or utility file and keep props explicit. If you change architecture, update this file so the documented ownership rules match the codebase.
