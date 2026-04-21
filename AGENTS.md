# Repository Guidelines

## Project Structure
This is a Vite + React expense tracker. Keep application code in `src/`, public static files in `public/`, and production output in `dist/`.

- `src/App.jsx` owns app-level transaction state and top-level page composition.
- `src/components/` holds focused UI sections such as `OverviewHero`, `Summary`, `Highlights`, `TransactionForm`, `SpendingByCategoryChart`, and `TransactionList`.
- `src/utils/transactions.js` contains shared transaction/domain helpers.
- `src/utils/formatters.js` contains shared formatting helpers.
- `src/constants/` contains shared option sets such as categories.
- `src/assets/` holds imported static assets.
- `src/index.css` is for global styles and `src/App.css` is for screen-level styles.

## Architecture Rules
- Keep `src/App.jsx` thin. Do not move section-specific view logic or one-off derived calculations into it.
- Normalize transaction data near app state, then pass normalized collections downward.
- Keep local UI state inside the component that owns it unless multiple sections depend on it.
- Derive display data in the component that renders it unless the same calculation is needed in multiple places.
- Reuse helpers from `src/utils/transactions.js` for totals, recent activity, spending by category, and normalization instead of duplicating reducers.
- Import shared categories from `src/constants/categories.js` instead of redefining option lists.
- Add a new component when a section starts owning its own layout, derived values, or internal state.
- Keep props narrow. Prefer passing `transactions` and letting the child derive what it needs.

## Coding Style
- Use functional React components and ES modules.
- Match the existing style: semicolon-free JavaScript and single quotes where the file already uses them.
- Use PascalCase for React components and camelCase for utility and constant modules.
- Keep component files focused on one responsibility.
- Prefer extracting reusable UI, constants, or helpers instead of growing `App.jsx`.

## Validation
- `npm run dev` starts the Vite dev server.
- `npm run build` creates the production build.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint.
- Treat `npm run lint` and `npm run build` as the required checks before handing work off.

## Contributor Notes
- Avoid mixing unrelated refactors with feature work.
- If you add shared formatters, transaction helpers, charts, or form sections, prefer a separate component, constant, or utility file.
- If architecture changes, update this file so it stays accurate.
