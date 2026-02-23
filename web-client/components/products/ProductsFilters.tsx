"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ProductsFiltersProps = {
  initialSortBy?: "id" | "name" | "price" | "rating";
  initialOrder?: "asc" | "desc";
  initialLimit?: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
  initialInStock?: boolean;
};

function buildProductsHref(params: URLSearchParams) {
  const queryString = params.toString();
  return queryString ? `/?${queryString}` : "/";
}

export default function ProductsFilters({
  initialSortBy = "id",
  initialOrder = "asc",
  initialLimit = "",
  initialMinPrice = "",
  initialMaxPrice = "",
  initialInStock = false,
}: ProductsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState(initialSortBy);
  const [order, setOrder] = useState(initialOrder);
  const [limit, setLimit] = useState(initialLimit);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [inStockOnly, setInStockOnly] = useState(initialInStock);

  const applyFilters = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (sortBy === "id") params.delete("sortBy");
    else params.set("sortBy", sortBy);

    if (order === "asc") params.delete("order");
    else params.set("order", order);

    if (!limit.trim()) params.delete("limit");
    else params.set("limit", limit.trim());

    if (!minPrice.trim()) params.delete("minPrice");
    else params.set("minPrice", minPrice.trim());

    if (!maxPrice.trim()) params.delete("maxPrice");
    else params.set("maxPrice", maxPrice.trim());

    if (inStockOnly) params.set("inStock", "true");
    else params.delete("inStock");

    router.push(buildProductsHref(params));
  };

  const clearFilters = () => {
    setSortBy("id");
    setOrder("asc");
    setLimit("");
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("sortBy");
    params.delete("order");
    params.delete("limit");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("inStock");
    router.push(buildProductsHref(params));
  };

  return (
    <form
      onSubmit={applyFilters}
      className="mb-4 grid gap-2 rounded-md border p-3 md:grid-cols-6"
    >
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
        className="h-10 rounded-md border bg-background px-3 text-sm"
      >
        <option value="id">Sort: ID</option>
        <option value="name">Sort: Name</option>
        <option value="price">Sort: Price</option>
        <option value="rating">Sort: Rating</option>
      </select>

      <select
        value={order}
        onChange={(e) => setOrder(e.target.value as typeof order)}
        className="h-10 rounded-md border bg-background px-3 text-sm"
      >
        <option value="asc">Order: ASC</option>
        <option value="desc">Order: DESC</option>
      </select>

      <input
        type="number"
        min={1}
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        placeholder="Items per page"
        className="h-10 rounded-md border bg-background px-3 text-sm"
      />

      <input
        type="number"
        min={0}
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min price"
        className="h-10 rounded-md border bg-background px-3 text-sm"
      />

      <input
        type="number"
        min={0}
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max price"
        className="h-10 rounded-md border bg-background px-3 text-sm"
      />

      <label className="flex h-10 items-center gap-2 rounded-md border px-3 text-sm">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
        In stock only
      </label>

      <button
        type="submit"
        className="h-10 rounded-md border bg-foreground px-4 text-sm text-background hover:opacity-90 md:col-span-1"
      >
        Apply
      </button>
      <button
        type="button"
        onClick={clearFilters}
        className="h-10 rounded-md border px-4 text-sm hover:bg-muted md:col-span-1"
      >
        Reset
      </button>
    </form>
  );
}
