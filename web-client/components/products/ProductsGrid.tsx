import React from 'react'
import type { Product } from '@/types/product'
import ProductsCard from './ProductsCard';
const ProductsGrid = ({ products }: {products:Product[]}) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {products.map((p)=>(
            <ProductsCard key={p.id} product={p} />
        ))}
    </div>
  );
};

export default ProductsGrid
