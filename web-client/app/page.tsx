import CategorySidebar from "@/components/products/CategoriesSideBar";
import Pagination from "@/components/products/Pagination";
import ProductsFilters from "@/components/products/ProductsFilters";
import ProductsGrid from "@/components/products/ProductsGrid";
import SearchBar from "@/components/products/SearchBar";
import { getProducts } from "@/lib/api/product";

type PageSearchParams = {
  category?: string;
  search?: string;
  page?: string;
  limit?: string;
  sortBy?: "id" | "name" | "price" | "rating";
  order?: "asc" | "desc";
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}) {
  const params = (await searchParams) ?? {};

  const activeCategory = params?.category;
  const activeSearch = params?.search;
  const activeSortBy = params?.sortBy;
  const activeOrder = params?.order;
  const activeLimit = params?.limit;
  const activeMinPrice = params?.minPrice;
  const activeMaxPrice = params?.maxPrice;
  const inStockOnly = params?.inStock === "true";

  const pageParam = Number(params?.page ?? "1");
  const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const limitParam = Number(activeLimit);
  const limit =
    Number.isNaN(limitParam) || limitParam <= 0 ? undefined : limitParam;
  const minPriceParam = Number(activeMinPrice);
  const minPrice =
    !activeMinPrice || Number.isNaN(minPriceParam)
      ? undefined
      : minPriceParam;
  const maxPriceParam = Number(activeMaxPrice);
  const maxPrice =
    !activeMaxPrice || Number.isNaN(maxPriceParam)
      ? undefined
      : maxPriceParam;

  const { products, pagination } = await getProducts({
    category: activeCategory,
    search: activeSearch,
    page: currentPage,
    limit,
    sortBy: activeSortBy,
    order: activeOrder,
    minPrice,
    maxPrice,
    inStock: inStockOnly,
  });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6">
      <div className="flex-1 rounded-xl border bg-card p-4 md:p-5">
        <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Products Page
        </h1>

        <SearchBar initialValue={activeSearch} />
        <ProductsFilters
          initialSortBy={activeSortBy}
          initialOrder={activeOrder}
          initialLimit={activeLimit}
          initialMinPrice={activeMinPrice}
          initialMaxPrice={activeMaxPrice}
          initialInStock={inStockOnly}
        />

        <ProductsGrid products={products} />
        <Pagination
          pagination={pagination}
          category={activeCategory}
          search={activeSearch}
          sortBy={activeSortBy}
          order={activeOrder}
          limit={activeLimit}
          minPrice={activeMinPrice}
          maxPrice={activeMaxPrice}
          inStock={inStockOnly ? "true" : undefined}
        />
      </div>
      <CategorySidebar
        activeCategory={activeCategory}
        activeSearch={activeSearch}
        activeSortBy={activeSortBy}
        activeOrder={activeOrder}
        activeLimit={activeLimit}
        activeMinPrice={activeMinPrice}
        activeMaxPrice={activeMaxPrice}
        activeInStock={inStockOnly ? "true" : undefined}
      />
    </div>
  );
}
