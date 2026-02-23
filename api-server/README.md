# API Server

Simple Node.js API for practicing search, category filtering, and pagination.

## Run
```bash
node server.js
```

Server runs on `http://localhost:3001`.

## Endpoints
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/categories`
- `GET /api/products/stats`
- `GET /api/openapi.json`
- `GET /api/docs`

## Products Query Params
- `search` text search in name/description/category
- `category` filter by category name
- `page` page number (default `1`)
- `limit` items per page (default `10`, max `100`)
- `sortBy` one of: `id`, `name`, `price`, `rating`
- `order` `asc` or `desc`
- `minPrice` minimum price
- `maxPrice` maximum price
- `inStock` `true` for in-stock only

## Example
```bash
curl "http://localhost:3001/api/products?search=keyboard&page=2&limit=5"
```

## Files
- `server.js` API server
- `openapi.json` OpenAPI spec used by `/api/docs`
