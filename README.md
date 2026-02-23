# SearchStack Lab

A learning-focused full-stack project to practice **search**, **category filtering**, and **pagination** end-to-end.

This repository intentionally keeps the codebase small and readable so it can be reviewed later as a study reference.

## Why I Built This

I built this project to practice the core data-listing patterns that appear in many real products:
- Searching within a dataset
- Filtering by category
- Paginating large result sets
- Keeping URL query params as the source of truth (`search`, `category`, `page`)
- Connecting a typed frontend to a simple API

The goal was not to build a “production-perfect” app, but to create a clean lab where the logic is easy to read, reason about, and revisit.

## Project Goals

- Build a small API that supports practical query features
- Build a frontend that consumes those features with clear UI behavior
- Keep implementation simple (no unnecessary abstractions)
- Keep TypeScript types centralized and easy to follow
- Keep the code beginner-friendly for future review

## Repository Structure

- `api-server/`
  - `server.js`: Node.js HTTP server with product endpoints
  - `openapi.json`: API schema used by `/api/docs`
- `web-client/`
  - `app/page.tsx`: main products page
  - `components/products/`: UI components (`SearchBar`, `CategoriesSideBar`, `ProductsGrid`, `ProductsCard`, `Pagination`)
  - `lib/api/`: API fetch functions
  - `types/`: shared TypeScript types

## Architecture Overview

### Backend (`api-server`)

A dependency-light Node server that provides:
- Product listing with filtering, sorting, and pagination
- Category listing with counts
- Product details by ID
- Basic aggregate stats
- OpenAPI docs route

### Frontend (`web-client`)

A Next.js App Router UI where:
- `searchParams` drive data fetching
- Search and category updates reset `page` to `1`
- Pagination links preserve active filters
- UI stays intentionally simple and readable

## API Endpoints

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/categories`
- `GET /api/products/stats`
- `GET /api/openapi.json`
- `GET /api/docs`

### `GET /api/products` Query Params

- `search`: text search in name/description/category
- `category`: filter by category name
- `page`: page number (default `1`)
- `limit`: items per page (default `10`, max `100`)
- `sortBy`: `id | name | price | rating`
- `order`: `asc | desc`
- `minPrice`: minimum price
- `maxPrice`: maximum price
- `inStock=true`: only in-stock products

## Run Locally

### 1) Start API Server

```bash
cd api-server
node server.js
```

Runs on `http://localhost:3001`.

### 2) Start Frontend

```bash
cd web-client
npm install
npm run dev
```

Runs on `http://localhost:3000`.

## Example Request

```bash
curl "http://localhost:3001/api/products?search=keyboard&page=2&limit=5"
```

## Configuration Note

The frontend API base URL is set in:
- `web-client/lib/api/base-url.ts`

Default value:
- `http://localhost:3001/api`

## Simplicity Principles Used

- Small, focused components
- Minimal helper functions
- No over-engineered state management
- URL query params used as the single source for list state
- Centralized types under `web-client/types`

## What This Project Is For (and Not For)

This project is for:
- Learning and reviewing full-stack listing patterns
- Understanding how query params map to backend queries
- Practicing clean, readable TypeScript + Next.js code

This project is not focused on:
- Complex architecture
- Advanced caching strategies
- Authentication/authorization
- Production deployment hardening

## Possible Next Steps

- Add tests for API query behavior and pagination edge cases
- Add loading/error states in UI
- Add debounced search input
- Add server-side validation for query params
