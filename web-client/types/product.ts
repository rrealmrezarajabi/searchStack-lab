export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  inStock: boolean;
  description: string;
  image: string;
  createdAt?: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  nextPage?: number | null;
  prevPage?: number | null;
};

export type ProductsQuery = {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "id" | "name" | "price" | "rating";
  order?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
};

export type ProductsResponse = {
  data: Product[];
  pagination: Pagination;
};
