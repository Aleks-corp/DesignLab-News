import { fetchArticleById } from "@/lib/api";
import { Metadata } from "next";
import { IArticles } from "@/types/article.type";
import { ArticlePageProps } from "@/types/param.type";

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  let article: IArticles | null = null;
  try {
    article = await fetchArticleById(id);
  } catch {
    article = null;
  }

  if (!article) {
    return {
      title: "Стаття не знайдена | UX.News",
      description: "Сторінка не знайдена або id некоректний.",
      openGraph: {
        title: "Стаття не знайдена | UX.News",
        description: "Сторінка не знайдена або id некоректний.",
        images: [],
      },
    };
  }

  return {
    title: `${article.title} | UX.News`,
    description: article.excerpt || article.content?.slice(0, 160),
    openGraph: {
      title: `${article.title} | UX.News`,
      description: article.excerpt || article.content?.slice(0, 160),
      images: article.imageUrl
        ? [{ url: article.imageUrl, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | UX.News`,
      description: article.excerpt || article.content?.slice(0, 160),
      images: article.imageUrl ? [article.imageUrl] : [],
    },
  };
}
