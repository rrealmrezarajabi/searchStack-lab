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
    params.delete("search");
    router.push(buildProductsHref(params));
  };

  const hasActiveSearch = Boolean(searchParams.get("search"));

  return (
    <form onSubmit={onSubmit} className="flex gap-2 items-center">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="border rounded px-3 py-2 w-80"
      />
      <button className="border rounded px-3 py-2" type="submit">
        Search
      </button>

      {hasActiveSearch && (
        <button type="button" className="border rounded px-3 py-2" onClick={clearSearch}>
          Clear
        </button>
      )}
    </form>
  );
}
