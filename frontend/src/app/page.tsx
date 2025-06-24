/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/lib/api";
import { IActicles } from "@/types/article.type";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["articles", 1],
    queryFn: () => fetchArticles(1),
  });

  console.log(" articles:", data?.articles);
  console.log(" totalHits:", data?.totalHits);
  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка завантаження</p>;

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <p className="font-sans text-lg font-semibold self-start mb-4">
          Список статей
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {data.articles.map((article: IActicles) => (
            <div key={article._id} className="flex flex-col gap-4">
              <img
                src={article.imageUrl || "/post-template.jpg"}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="font-serif text-xl font-semibold leading-snug">
                {article.title}
              </h2>
              <div className="font-sans text-sm text-muted-foreground line-clamp-3">
                {article.excerpt}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
