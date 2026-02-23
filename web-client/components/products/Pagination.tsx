import Link from "next/link";
import { Pagination as PaginationType } from "@/types/product";

type PaginationProps = {
  pagination: PaginationType;
  category?: string;
  search?: string;
  sortBy?: string;
  order?: string;
  limit?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
};

type PageHrefParams = {
  page: number;
  category?: string;
  search?: string;
  sortBy?: string;
  order?: string;
  limit?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
};

function buildPageHref({
  page,
  category,
  search,
  sortBy,
  order,
  limit,
  minPrice,
  maxPrice,
  inStock,
}: PageHrefParams) {
  const params = new URLSearchParams();

  if (category) params.set("category", category);
  if (search) params.set("search", search);
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);
  if (limit) params.set("limit", limit);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (inStock) params.set("inStock", inStock);
  if (page > 1) params.set("page", String(page));

  const queryString = params.toString();
  return queryString ? `/?${queryString}` : "/";
}

export default function Pagination({
  pagination,
  category,
  search,
  sortBy,
  order,
  limit,
  minPrice,
  maxPrice,
  inStock,
}: PaginationProps) {
  if (pagination.totalPages <= 1) return null;

  const maxVisiblePages = 5;
  const halfWindow = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, pagination.currentPage - halfWindow);
  const endPage = Math.min(
    pagination.totalPages,
    startPage + maxVisiblePages - 1,
  );

  startPage = Math.max(1, endPage - maxVisiblePages + 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t pt-4">
      {pagination.currentPage > 1 ? (
        <Link
          href={buildPageHref({
            page: pagination.currentPage - 1,
            category,
            search,
            sortBy,
            order,
            limit,
            minPrice,
            maxPrice,
            inStock,
          })}
          className="rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
        >
          Prev
        </Link>
      ) : (
        <span className="rounded-md border px-3 py-2 text-sm opacity-50">
          Prev
        </span>
      )}

      {pageNumbers.map((page) => {
        const isActive = page === pagination.currentPage;

        return (
          <Link
            key={page}
            href={buildPageHref({
              page,
              category,
              search,
              sortBy,
              order,
              limit,
              minPrice,
              maxPrice,
              inStock,
            })}
            className={`rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted ${
              isActive ? "bg-foreground text-background hover:bg-foreground" : ""
            }`}
          >
            {page}
          </Link>
        );
      })}

      {pagination.currentPage < pagination.totalPages ? (
        <Link
          href={buildPageHref({
            page: pagination.currentPage + 1,
            category,
            search,
            sortBy,
            order,
            limit,
            minPrice,
            maxPrice,
            inStock,
          })}
          className="rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-md border px-3 py-2 text-sm opacity-50">
          Next
        </span>
      )}
    </nav>
  );
}
