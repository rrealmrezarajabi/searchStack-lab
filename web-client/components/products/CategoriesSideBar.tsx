import { getCategories } from "@/lib/api/product";
import Link from "next/link";

type CategoryHrefParams = {
  category?: string;
  search?: string;
  sortBy?: string;
  order?: string;
  limit?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
};

function buildCategoryHref({
  category,
  search,
  sortBy,
  order,
  limit,
  minPrice,
  maxPrice,
  inStock,
}: CategoryHrefParams) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);
  if (limit) params.set("limit", limit);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (inStock) params.set("inStock", inStock);

  const queryString = params.toString();
  return queryString ? `/?${queryString}` : "/";
}

export default async function CategorySidebar({
  activeCategory,
  activeSearch,
  activeSortBy,
  activeOrder,
  activeLimit,
  activeMinPrice,
  activeMaxPrice,
  activeInStock,
}: {
  activeCategory?: string;
  activeSearch?: string;
  activeSortBy?: string;
  activeOrder?: string;
  activeLimit?: string;
  activeMinPrice?: string;
  activeMaxPrice?: string;
  activeInStock?: string;
}) {
  const categories = await getCategories();

  const allSelected = !activeCategory;

  return (
    <aside className="h-fit shrink-0 rounded-xl border bg-card p-4 md:sticky md:top-6 md:w-64">
      <h2 className="mb-3 text-lg font-bold">Categories</h2>

      <ul className="space-y-2">
        <li>
          <Link
            href={buildCategoryHref({
              search: activeSearch,
              sortBy: activeSortBy,
              order: activeOrder,
              limit: activeLimit,
              minPrice: activeMinPrice,
              maxPrice: activeMaxPrice,
              inStock: activeInStock,
            })}
            className={`block rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted ${
              allSelected ? "bg-foreground font-semibold text-background" : ""
            }`}
          >
            <div className="flex justify-between">
              <span>All</span>
            </div>
          </Link>
        </li>

        {categories.map((c) => {
          const isActive = activeCategory === c.name;

          return (
            <li key={c.name}>
              <Link
                href={buildCategoryHref({
                  category: c.name,
                  search: activeSearch,
                  sortBy: activeSortBy,
                  order: activeOrder,
                  limit: activeLimit,
                  minPrice: activeMinPrice,
                  maxPrice: activeMaxPrice,
                  inStock: activeInStock,
                })}
                className={`block rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted ${
                  isActive ? "bg-foreground font-semibold text-background" : ""
                }`}
              >
                <div className="flex justify-between">
                  <span>{c.name}</span>
                  <span className={`${isActive ? "opacity-90" : "opacity-60"}`}>
                    {c.count}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
