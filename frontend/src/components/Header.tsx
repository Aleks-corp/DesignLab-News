"use client";

import { useAdmin } from "context/AdminContext";

export default function Header() {
  const { search, setSearch } = useAdmin();
  return (
    <header className="flex justify-center w-full">
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between gap-6 flex-wrap">
        <h1 className="font-serif text-4xl">UX.News</h1>
        <label>
          <input
            type="text"
            placeholder="Пошук"
            className="border p-2 w-3xs mb-2 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
    </header>
  );
}
