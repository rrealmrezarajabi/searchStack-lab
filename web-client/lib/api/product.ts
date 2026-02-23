import { BASE_URL } from "./base-url";
import { CategoriesResponse, Category } from "@/types/category";
import {
  Pagination,
  Product,
  ProductsQuery,
  ProductsResponse,
} from "@/types/product";

export async function getProducts(
  params: ProductsQuery = {},
): Promise<{ products: Product[]; pagination: Pagination }> {
  const qs = new URLSearchParams();

  if (params.category) qs.set("category", params.category);
  if (params.search) qs.set("search", params.search);
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));

  const queryString = qs.toString();
  const url = queryString
    ? `${BASE_URL}/products?${queryString}`
    : `${BASE_URL}/products`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const json: ProductsResponse = await res.json();

  return {
    products: json.data,
    pagination: json.pagination,
  };
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`);

  if (!res.ok) throw new Error("failed to fetch categories");

  const data: CategoriesResponse = await res.json();

  return data.data;
}
