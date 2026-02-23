export type ProductCategory =
  | "Clothing"
  | "Books"
  | "Sports"
  | "Home"
  | "Beauty"
  | "Toys"
  | "Food"
  | "Electronics";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number; 
  inStock: boolean;
  description: string;
  image: string; 
  createdAt?: string; 
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export type SortBy =
  | "id"
  | "name"
  | "category"
  | "price"
  | "rating"
  | "createdAt";

export type SortOrder = "asc" | "desc";

export interface Filters {
  search: string | null;
  category: ProductCategory | null;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean | null;
  sortBy: SortBy;
  order: SortOrder;
}

export interface ProductsResponse {
  data: Product[];
  pagination: Pagination;
  filters: Filters;
}
