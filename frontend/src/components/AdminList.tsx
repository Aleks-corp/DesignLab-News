import { IArticles } from "@/types/article.type";

type AdminListProps = {
  articles: IArticles[];
  selected: IArticles | null;
  selectArticle: (article: IArticles) => void;
};

export default function AdminList({
  articles,
  selected,
  selectArticle,
}: AdminListProps) {
  return (
    <aside className="border-r border-gray-200 overflow-y-auto">
      {articles.map((article: IArticles) => (
        <button
          key={article._id}
          onClick={() => selectArticle(article)}
          className={`w-full text-left p-4 hover:bg-gray-100 ${
            selected?._id === article._id ? "bg-gray-100 font-semibold" : ""
          }`}
        >
          <p className="truncate">{article.title}</p>
        </button>
      ))}
    </aside>
  );
}
