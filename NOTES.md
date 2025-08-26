# NOTES.md

## Decisions
- Used Apollo Client for GraphQL queries/mutations with caching.
- Handled errors via `onError` link and inline error states where possible.
- Kept schema validation minimal for faster delivery.

## Trade-offs
- Error handling is basic; no retry logic or detailed error UI yet.
- Loading states are simple spinners, not skeletons.
- Limited testing — focused on core functionality first.
- Some UI logic tightly coupled to queries for speed of delivery.

## Improvements (with more time)
- Add tests for queries, mutations, and error states using React Testing Library + Apollo mocks.
- Add Skeleton loader for tables.
- Improve error handling with retry buttons and user-friendly fallback UIs.
- Use `react-hook-form` + schema validation (`zod`/`yup`) for forms.
- Code-splitting and lazy loading for heavy components.
- Add i18n support for future localization.
- Add auth and role management.
