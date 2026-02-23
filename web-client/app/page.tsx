import CategorySidebar from "@/components/products/CategoriesSideBar";
import ProductsGrid from "@/components/products/ProductsGrid";
import { getProducts } from "@/lib/api/product";
export default async function ProductsPage({searchParams}:{searchParams? : {category:string}}) {
  

  const params = await searchParams

  const activeCategory = params?.category

  const products = await getProducts(activeCategory);

  return (
    <div className="min-h-screen p-4 flex gap-4">
      <div className="flex-1">
        <h1 className="font-bold text-4xl flex justify-center my-3">
          Products Page
        </h1>
        <ProductsGrid products={products} />
      </div>
      <CategorySidebar activeCategory={activeCategory} />
    </div>
  );
}
