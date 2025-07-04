/* eslint-disable @next/next/no-img-element */
import { IActicles } from "@/types/article.type";

export default function ArticleCard({ article }: { article: IActicles }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full aspect-[3/2] overflow-hidden rounded-xl">
        <img
          src={article.imageUrl || "/post-template.jpg"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2">
        <h2 className="font-sans text-xl font-semibold leading-snug line-clamp-2 h-14 mb-5">
          {article.title}
        </h2>
        <div className="font-sans text-md text-muted-foreground line-clamp-3 mb-9">
          {article.excerpt}
        </div>
        <p className="inline-flex items-center text-muted hover:text-hover transition">
          Дивитись більше
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
            <path d="m9 18 6-6-6-6" />
          </svg>
        </p>
      </div>
    </div>
  );
}
