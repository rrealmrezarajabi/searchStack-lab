import type { Product } from "@/types/product";
import ProductsCard from "./ProductsCard";

const ProductsGrid = ({ products }: { products: Product[] }) => {
  if (!products.length) {
    return (
      <p className="mt-6 rounded-md border bg-muted/30 px-3 py-4 text-sm opacity-80">
        No products found.
      </p>
    );
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {products.map((p) => (
        <ProductsCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductsGrid;
