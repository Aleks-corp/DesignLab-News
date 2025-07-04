"use client";

import { fetchArticleById } from "@/lib/api";
import { formatDate } from "@/lib/date";
import { IActicles } from "@/types/article.type";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArticleFullPost({ id }: { id: string | string[] }) {
  const [article, setArticle] = useState<IActicles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadArticle = async () => {
      try {
        const data = await fetchArticleById(
          typeof id === "string" ? id : id[0]
        );
        setArticle(data);
      } catch (error) {
        console.error("Помилка завантаження статті:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) return <p>Завантаження...</p>;
  if (!article) return <p>Статтю не знайдено</p>;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <article
        className=" prose-lg max-w-5xl mx-auto"
        dangerouslySetInnerHTML={{
          __html: article.content || "No original content",
        }}
      />
      <div className="flex flex-col gap-2 my-4 text-lg text-foreground">
        {Array.isArray(article.categories) && article.categories.length > 0 && (
          <div>
            <span className="font-semibold">Категорії: </span>
            {article.categories.join(", ")}
          </div>
        )}

        {article.author && (
          <div>
            <span className="font-semibold">Автор: </span>
            {article.author}
          </div>
        )}

        {article.source && (
          <div>
            <span className="font-semibold">Читати оригінал: </span>
            <Link
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-hover transition"
            >
              {article.source}
            </Link>
          </div>
        )}

        {article.publishedAt && (
          <div>
            <span className="font-semibold">Опубліковано: </span>
            {formatDate(article.publishedAt)}
          </div>
        )}
      </div>
    </div>
  );
}
