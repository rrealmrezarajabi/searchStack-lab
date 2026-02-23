import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ProductsCard = ({ product }: { product: Product }) => {
  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
      <div className="relative aspect-video w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-cover brightness-60 grayscale dark:brightness-40"
        />
      </div>

      <CardHeader>
        <CardAction>
          {product.inStock ? (
            <Badge variant="secondary">In Stock</Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </CardAction>

        <CardTitle>{product.name}</CardTitle>

        <CardDescription>{product.description}</CardDescription>
        <Badge>{product.category}</Badge>
      </CardHeader>

      <CardFooter className="flex items-center justify-between">
        {product.inStock ? (
          <span className="font-semibold ">${product.price.toFixed(2)}</span>
        ) : (
          <span className="font-semibold line-through">
            ${product.price.toFixed(2)}
          </span>
        )}

        <Button>View Product</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductsCard;
