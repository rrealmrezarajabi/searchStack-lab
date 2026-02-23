"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SearchBarProps = {
  initialValue?: string;
};

function buildProductsHref(params: URLSearchParams) {
  const queryString = params.toString();
  return queryString ? `/?${queryString}` : "/";
}

export default function SearchBar({ initialValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    const trimmed = value.trim();
    if (!trimmed) {
      params.delete("search");
    } else {
      params.set("search", trimmed);
    }

    router.push(buildProductsHref(params));
  };

  const clearSearch = () => {
    setValue("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("search");
    router.push(buildProductsHref(params));
  };

  const hasActiveSearch = Boolean(searchParams.get("search"));

  return (
    <form onSubmit={onSubmit} className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="h-10 w-full rounded-md border bg-background px-3 text-sm sm:max-w-sm"
      />
      <button
        className="h-10 rounded-md border bg-foreground px-4 text-sm text-background hover:opacity-90"
        type="submit"
      >
        Search
      </button>

      {hasActiveSearch && (
        <button
          type="button"
          className="h-10 rounded-md border px-4 text-sm hover:bg-muted"
          onClick={clearSearch}
        >
          Clear
        </button>
      )}
    </form>
  );
}
