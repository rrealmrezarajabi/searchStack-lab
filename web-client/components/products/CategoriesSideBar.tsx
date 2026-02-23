import { getCategories } from "@/lib/api/product";
import Link from "next/link";

function buildCategoryHref(category?: string, search?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  const queryString = params.toString();
  return queryString ? `/?${queryString}` : "/";
}

export default async function CategorySidebar({
  activeCategory,
  activeSearch,
}: {
  activeCategory?: string;
  activeSearch?: string;
}) {
  const categories = await getCategories();

  const allSelected = !activeCategory;

  return (
    <aside className="h-fit shrink-0 rounded-xl border bg-card p-4 md:sticky md:top-6 md:w-64">
      <h2 className="mb-3 text-lg font-bold">Categories</h2>

      <ul className="space-y-2">
        <li>
          <Link
            href={buildCategoryHref(undefined, activeSearch)}
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
                href={buildCategoryHref(c.name, activeSearch)}
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
