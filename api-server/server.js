const http = require("http");
const url = require("url");
const openapi = require("./openapi.json");

// ─── داده‌های نمونه ───────────────────────────────────────────────
const categories = ["Electronics", "Clothing", "Books", "Sports", "Home", "Beauty", "Toys", "Food"];

function generateProducts(count = 200) {
  const products = [];
  const names = [
    "Wireless Headphones", "Running Shoes", "JavaScript Book", "Yoga Mat",
    "Coffee Maker", "Laptop Stand", "Mechanical Keyboard", "Smart Watch",
    "Bluetooth Speaker", "Gaming Mouse", "Desk Lamp", "Water Bottle",
    "Protein Powder", "Resistance Bands", "Novel Collection", "Sunglasses",
    "Backpack", "Phone Case", "Notebook Set", "USB Hub",
  ];

  for (let i = 1; i <= count; i++) {
    const name = names[i % names.length];
    products.push({
      id: i,
      name: `${name} ${i}`,
      category: categories[i % categories.length],
      price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      inStock: Math.random() > 0.2,
      description: `This is the product description for ${name} ${i}. High quality item.`,
      image: `https://picsum.photos/seed/${i}/300/200`,
      createdAt: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    });
  }
  return products;
}

const allProducts = generateProducts(200);

// ─── CORS Helper ──────────────────────────────────────────────────
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJSON(res, status, data) {
  setCors(res);
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

function sendHTML(res, status, html) {
  setCors(res);
  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

// ─── Route Handlers ───────────────────────────────────────────────

// GET /api/products?search=&category=&page=1&limit=10&sortBy=price&order=asc
function handleProducts(query) {
  let results = [...allProducts];

  // 🔍 Search
  if (query.search) {
    const term = query.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }

  // 🏷️ Filter by category
  if (query.category) {
    results = results.filter(
      (p) => p.category.toLowerCase() === query.category.toLowerCase()
    );
  }

  // 💰 Filter by price range
  if (query.minPrice) results = results.filter((p) => p.price >= parseFloat(query.minPrice));
  if (query.maxPrice) results = results.filter((p) => p.price <= parseFloat(query.maxPrice));

  // ✅ Filter by inStock
  if (query.inStock === "true") results = results.filter((p) => p.inStock);

  // 🔃 Sort
  const sortBy = query.sortBy || "id";
  const order = query.order === "desc" ? -1 : 1;
  results.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1 * order;
    if (a[sortBy] > b[sortBy]) return 1 * order;
    return 0;
  });

  // 📄 Pagination
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const totalItems = results.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResults = results.slice(startIndex, endIndex);

  return {
    data: paginatedResults,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    },
    filters: {
      search: query.search || null,
      category: query.category || null,
      minPrice: query.minPrice || null,
      maxPrice: query.maxPrice || null,
      inStock: query.inStock || null,
      sortBy,
      order: query.order || "asc",
    },
  };
}

// ─── Server ───────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const query = parsed.query;

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    setCors(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== "GET") {
    return sendJSON(res, 405, { error: "Method Not Allowed" });
  }

  // ── Routes ──
  if (pathname === "/" || pathname === "/api") {
    return sendJSON(res, 200, {
      message: "🛒 Products API - Ready!",
      endpoints: {
        "GET /api/products": "لیست محصولات با pagination و search",
        "GET /api/products/:id": "یه محصول خاص",
        "GET /api/categories": "لیست دسته‌بندی‌ها",
        "GET /api/products/stats": "آمار کلی",
      },
      queryParams: {
        search: "جستجو در نام، توضیحات، و دسته‌بندی",
        category: "فیلتر بر اساس دسته‌بندی",
        page: "شماره صفحه (پیش‌فرض: 1)",
        limit: "تعداد در هر صفحه (پیش‌فرض: 10، حداکثر: 100)",
        sortBy: "مرتب‌سازی: id | name | price | rating",
        order: "ترتیب: asc | desc",
        minPrice: "حداقل قیمت",
        maxPrice: "حداکثر قیمت",
        inStock: "فقط موجود: true",
      },
      examples: [
        "/api/products",
        "/api/products?page=2&limit=5",
        "/api/products?search=headphones",
        "/api/products?category=Electronics&sortBy=price&order=desc",
        "/api/products?minPrice=50&maxPrice=200&inStock=true",
      ],
    });
  }

  if (pathname === "/api/openapi.json") {
    return sendJSON(res, 200, openapi);
  }

  if (pathname === "/api/docs") {
    return sendHTML(
      res,
      200,
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Products API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({
        url: "/api/openapi.json",
        dom_id: "#swagger-ui",
      });
    </script>
  </body>
</html>`
    );
  }

  if (pathname === "/api/categories") {
    const cats = categories.map((cat) => ({
      name: cat,
      count: allProducts.filter((p) => p.category === cat).length,
    }));
    return sendJSON(res, 200, { data: cats });
  }

  if (pathname === "/api/products/stats") {
    const prices = allProducts.map((p) => p.price);
    return sendJSON(res, 200, {
      data: {
        total: allProducts.length,
        inStock: allProducts.filter((p) => p.inStock).length,
        outOfStock: allProducts.filter((p) => !p.inStock).length,
        avgPrice: parseFloat((prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)),
        minPrice: parseFloat(Math.min(...prices).toFixed(2)),
        maxPrice: parseFloat(Math.max(...prices).toFixed(2)),
        avgRating: parseFloat(
          (allProducts.reduce((a, p) => a + p.rating, 0) / allProducts.length).toFixed(2)
        ),
        byCategory: categories.map((cat) => ({
          category: cat,
          count: allProducts.filter((p) => p.category === cat).length,
        })),
      },
    });
  }

  // GET /api/products/:id
  const productMatch = pathname.match(/^\/api\/products\/(\d+)$/);
  if (productMatch) {
    const id = parseInt(productMatch[1]);
    const product = allProducts.find((p) => p.id === id);
    if (!product) return sendJSON(res, 404, { error: "Product not found" });
    return sendJSON(res, 200, { data: product });
  }

  // GET /api/products
  if (pathname === "/api/products") {
    const result = handleProducts(query);
    return sendJSON(res, 200, result);
  }

  return sendJSON(res, 404, { error: "Route not found" });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`
✅ Products API is running!
🌐 http://localhost:${PORT}

📌 Try these endpoints:
   http://localhost:${PORT}/api/products
   http://localhost:${PORT}/api/products?page=1&limit=5
   http://localhost:${PORT}/api/products?search=headphones
   http://localhost:${PORT}/api/products?category=Electronics&sortBy=price&order=desc
   http://localhost:${PORT}/api/categories
   http://localhost:${PORT}/api/products/stats
  `);
});
