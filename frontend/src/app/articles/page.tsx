"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/lib/api";
import { IArticles } from "@/types/article.type";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useArticlesLimit } from "@/hooks/useArticlesLimit";
import { useDebouncedValue } from "@/hooks/useDebounce";
import { useAdmin } from "context/AdminContext";

type FetchArticlesResponse = {
  articles: IArticles[];
  totalHits: number;
};

export default function ArticlesList() {
  const limit = useArticlesLimit();
  const { search } = useAdmin();
  const debouncedSearch = useDebouncedValue(search, 1500);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<FetchArticlesResponse, Error>({
    retry: false,
    queryKey: ["articles", limit, debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      fetchArticles(pageParam as number, limit, debouncedSearch),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.articles.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  const articles = data?.pages.flatMap((page) => page.articles) || [];

  // Intersection Observer для автопідвантаження
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <p>Завантаження...</p>;
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-red-500 mb-4">
          Сервер недоступний або сталася помилка з&apos;єднання.
        </p>
        <button
          className="px-4 py-2 bg-black text-white rounded-xl hover:bg-muted transition"
          onClick={() => window.location.reload()}
        >
          Оновити сторінку
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-2xl sm:max-w-3xl md:max-w-6xl">
          {articles.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-12">
              Нічого не знайдено 😕
            </p>
          )}
          {articles.map((article: IArticles) => (
            <Link
              key={article._id}
              href={`/articles/${article._id}`}
              className="bg-white hover:bg-hover-foreground transition p-2"
            >
              <ArticleCard article={article} />
            </Link>
          ))}
        </div>
        {hasNextPage && (
          <div
            ref={ref}
            className="h-12 flex items-center justify-center text-muted-foreground"
          >
            {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
          </div>
        )}
      </main>
    </div>
  );
}
