import { getCategories } from "@/lib/api/product";
import Link from "next/link";



export default async function CategorySidebar({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  const categories = await getCategories();

  const All = !activeCategory

  return (
    <aside className="w-60 border-r p-3">
      <h2 className="font-bold mb-3">Categories</h2>

      <ul className="space-y-2">
        <li>
          <Link
            href="/"
            className={`block p-2 rounded border ${All ? "font-bold" : ""}`}
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
                href={`/?category=${encodeURIComponent(c.name)}`}
                className={`block p-2 rounded border ${
                  isActive ? "font-bold" : ""
                }`}
              >
                <div className="flex justify-between">
                  <span>{c.name}</span>
                  <span className="opacity-60">{c.count}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
