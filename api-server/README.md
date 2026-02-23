# 🛒 Products API — برای تمرین Next.js

یه API ساده با Node.js خالص (بدون dependency!) برای تمرین **Search** و **Pagination** در Next.js.

## 🚀 اجرا

```bash
node server.js
```

سرور روی `http://localhost:3001` بالا میاد.

---

## 📌 Endpoints

### `GET /api/products`
لیست محصولات با pagination، search، و filter

**Query Params:**

| پارامتر | توضیح | مثال |
|---------|-------|-------|
| `search` | جستجو در نام، توضیحات، و دسته‌بندی | `?search=headphones` |
| `category` | فیلتر بر اساس دسته‌بندی | `?category=Electronics` |
| `page` | شماره صفحه (پیش‌فرض: 1) | `?page=2` |
| `limit` | تعداد در هر صفحه (پیش‌فرض: 10) | `?limit=5` |
| `sortBy` | مرتب‌سازی: `id`, `name`, `price`, `rating` | `?sortBy=price` |
| `order` | ترتیب: `asc` یا `desc` | `?order=desc` |
| `minPrice` | حداقل قیمت | `?minPrice=50` |
| `maxPrice` | حداکثر قیمت | `?maxPrice=200` |
| `inStock` | فقط موجود: `true` | `?inStock=true` |

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 20,
    "totalItems": 200,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false,
    "nextPage": 2,
    "prevPage": null
  },
  "filters": { ... }
}
```

---

### `GET /api/products/:id`
یه محصول خاص

```
GET /api/products/5
```

---

### `GET /api/categories`
لیست دسته‌بندی‌ها با تعداد محصول

---

### `GET /api/products/stats`
آمار کلی (تعداد، میانگین قیمت، ...)

---

## 💡 مثال‌های کاربردی

```bash
# صفحه اول
curl http://localhost:3001/api/products

# صفحه دوم با 5 تا
curl "http://localhost:3001/api/products?page=2&limit=5"

# جستجو
curl "http://localhost:3001/api/products?search=keyboard"

# فیلتر + مرتب‌سازی
curl "http://localhost:3001/api/products?category=Electronics&sortBy=price&order=desc"

# فیلتر قیمت
curl "http://localhost:3001/api/products?minPrice=50&maxPrice=150&inStock=true"
```

---

## 🔧 استفاده در Next.js

```typescript
// lib/api.ts
const BASE_URL = "http://localhost:3001";

export async function getProducts(params: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const res = await fetch(`${BASE_URL}/api/products?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
```

```typescript
// app/products/page.tsx
export default async function ProductsPage({ searchParams }) {
  const data = await getProducts({
    search: searchParams.search,
    page: Number(searchParams.page) || 1,
    limit: 10,
  });

  return (
    <div>
      {data.data.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
      {/* Pagination component here */}
      <p>
        Page {data.pagination.currentPage} of {data.pagination.totalPages}
      </p>
    </div>
  );
}
```
