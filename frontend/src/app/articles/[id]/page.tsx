import ArticleFullPost from "@/components/ArticleFull";
import { generateMetadata } from "@/lib/article.metadata";
import { ArticlePageProps } from "@/types/param.type";

export { generateMetadata };

export default async function ArticlePost(props: ArticlePageProps) {
  const { id } = await props.params;
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ArticleFullPost id={id} />
    </div>
  );
}
