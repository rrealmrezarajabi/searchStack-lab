import type { Product, ProductsResponse } from "@/types/product";
import { BASE_URL } from "./base-url";
import { CategoriesResponse, Category } from "@/types/category";

export async function getProducts(
  category?: string,
  search?: string,
): Promise<Product[]> {
  const qs = new URLSearchParams();
  if (category) qs.set("category", category);
  if (search) qs.set("search", search);

  const res = await fetch(`${BASE_URL}/products?${qs.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await res.json();

  return data.data;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`);

  if (!res.ok) throw new Error("failed to fetch categories");

  const data: CategoriesResponse = await res.json();

  return data.data;
}
