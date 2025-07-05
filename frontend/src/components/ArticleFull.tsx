"use client";

import { formatDate } from "@/lib/date";
import { IArticles } from "@/types/article.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BtnBack from "./btnBack";
import { fetchArticleById } from "@/lib/api";
import { useEffect, useState } from "react";

export default function ArticleFullPost({ id }: { id: string | string[] }) {
  const [article, setArticle] = useState<IArticles | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setError("ID статті не вказано");
      setLoading(false);
      return;
    }

    const loadArticle = async () => {
      try {
        const data = await fetchArticleById(
          typeof id === "string" ? id : id[0]
        );
        setArticle(data);
        setError(null);
      } catch (e) {
        console.error("Помилка завантаження статті:", e);
        setError("Статтю не знайдено або помилка завантаження");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/articles");
      }
    }
  };

  if (loading) return <p>Завантаження...</p>;
  if (!article)
    return (
      <>
        <BtnBack handleBack={handleBack} />
        <p>Статтю не знайдено</p>
      </>
    );
  if (error)
    return (
      <>
        <BtnBack handleBack={handleBack} />
        <p className="text-red-500">{error}</p>
      </>
    );

  return (
    <>
      <BtnBack handleBack={handleBack} />
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
        <article
          className=" prose-lg max-w-5xl mx-auto"
          dangerouslySetInnerHTML={{
            __html: article.content || "No original content",
          }}
        />
        <div className="flex flex-col gap-2 my-4 text-lg text-foreground">
          {Array.isArray(article.categories) &&
            article.categories.length > 0 && (
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
      <BtnBack handleBack={handleBack} />
    </>
  );
}
