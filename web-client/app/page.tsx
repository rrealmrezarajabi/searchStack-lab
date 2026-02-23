import CategorySidebar from "@/components/products/CategoriesSideBar";
import ProductsGrid from "@/components/products/ProductsGrid";
import SearchBar from "@/components/products/SearchBar";
import { getProducts } from "@/lib/api/product";
import { Suspense } from "react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { category: string; search: string };
}) {
  const params = await searchParams;

  const activeCategory = params?.category;
  const activeSearch = params?.search;

  const products = await getProducts(activeCategory, activeSearch);

  return (
    <div className="min-h-screen p-4 flex gap-4">
      <div className="flex-1">
        <h1 className="font-bold text-4xl flex justify-center my-3">
          Products Page
        </h1>
        <Suspense fallback={null}>
          <SearchBar initialValue={activeSearch} />
        </Suspense>
        <ProductsGrid products={products} />
      </div>
      <CategorySidebar activeCategory={activeCategory} />
    </div>
  );
}
