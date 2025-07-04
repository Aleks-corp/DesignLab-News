"use client";

import ArticleFullPost from "@/components/ArticleFull";
import { useParams, useRouter } from "next/navigation";

export default function ArticlePost() {
  const { id } = useParams();
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/articles");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 h-8 mb-8 text-muted hover:text-hover transition text-base cursor-pointer"
        style={{ width: "fit-content" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span>Повернутись назад</span>
      </button>

      {!id ? (
        <p>Не знайдено</p>
      ) : (
        <>
          <ArticleFullPost id={id} />
          <button
            onClick={handleBack}
            className="flex items-center gap-2 h-8 mt-8 text-muted hover:text-hover transition text-base cursor-pointer"
            style={{ width: "fit-content" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>Повернутись назад</span>
          </button>
        </>
      )}
    </div>
  );
}
