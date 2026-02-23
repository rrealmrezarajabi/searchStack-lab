# Web Client

Next.js frontend for practicing product search, category filter, and pagination.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Run
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## API Dependency
This app expects the API server at:
- `http://localhost:3001/api`

Configured in `lib/api/base-url.ts`.

## Scripts
- `npm run dev` start dev server
- `npm run build` production build
- `npm run start` run production build
- `npm run lint` run eslint

## Main Folders
- `app/` pages and layout
- `components/products/` product UI (search, category, grid, pagination)
- `lib/api/` fetch helpers
- `types/` shared types
