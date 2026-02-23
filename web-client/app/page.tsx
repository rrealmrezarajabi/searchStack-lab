import CategorySidebar from "@/components/products/CategoriesSideBar";
import Pagination from "@/components/products/Pagination";
import ProductsGrid from "@/components/products/ProductsGrid";
import SearchBar from "@/components/products/SearchBar";
import { getProducts } from "@/lib/api/product";

type PageSearchParams = {
  category?: string;
  search?: string;
  page?: string;
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}) {
  const params = (await searchParams) ?? {};

  const activeCategory = params?.category;
  const activeSearch = params?.search;
  const pageParam = Number(params?.page ?? "1");
  const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const { products, pagination } = await getProducts({
    category: activeCategory,
    search: activeSearch,
    page: currentPage,
  });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6">
      <div className="flex-1 rounded-xl border bg-card p-4 md:p-5">
        <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Products Page
        </h1>

        <SearchBar initialValue={activeSearch} />

        <ProductsGrid products={products} />
        <Pagination
          pagination={pagination}
          category={activeCategory}
          search={activeSearch}
        />
      </div>
      <CategorySidebar
        activeCategory={activeCategory}
        activeSearch={activeSearch}
      />
    </div>
  );
}
