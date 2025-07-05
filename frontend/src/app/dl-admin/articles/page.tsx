"use client";

import { fetchArticlesToReview } from "@/lib/api";
import { IArticles } from "@/types/article.type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmArticle, deleteArticle } from "@/lib/api";

interface QueryType {
  data: { articles: IArticles[] } | undefined;
  isLoading: boolean;
  error: Error | null;
}

export default function ReviewArticles() {
  const { data, isLoading, error }: QueryType = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchArticlesToReview(),
  });
  const queryClient = useQueryClient();

  const confirmMutation = useMutation({
    mutationFn: confirmArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const [selected, setSelected] = useState<IArticles | null>(
    data?.articles[0] || null
  );

  const [editTitle, setEditTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(selected?.title);
  const [editContent, setEditContent] = useState(false);
  const [editedContent, setEditedContent] = useState(selected?.content);

  const editContentHandler = () => {
    if (data && editContent && selected && editedContent) {
      const index = data.articles.findIndex(
        (a: IArticles) => a._id === selected._id
      );
      data.articles[index].content = editedContent;
      selected.content = editedContent;

      setEditContent(false);
    } else {
      setEditContent(true);
    }
  };
  const editTitleHandler = () => {
    if (data && editTitle && selected && editedTitle) {
      const index = data.articles.findIndex(
        (a: IArticles) => a._id === selected._id
      );
      data.articles[index].title = editedTitle;
      selected.title = editedTitle;

      setEditTitle(false);
    } else {
      setEditTitle(true);
    }
  };

  const handleApprove = () => {
    if (data && selected) {
      confirmMutation.mutate(selected);
      const index = data.articles.findIndex(
        (a: IArticles) => a._id === selected._id
      );
      setSelected(data.articles[index + 1]);
      data.articles.splice(index, 1);
    }
  };

  const handleReject = () => {
    if (data && selected) {
      deleteMutation.mutate(selected._id);
      const index = data.articles.findIndex(
        (a: IArticles) => a._id === selected._id
      );
      setSelected(data.articles[index + 1]);
      data.articles.splice(index, 1);
    }
  };

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка завантаження</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] w-full h-screen">
      <aside className="border-r border-gray-200 overflow-y-auto">
        {data &&
          data.articles.map((article: IArticles) => (
            <button
              key={article._id}
              onClick={() => {
                if (
                  selected &&
                  (selected?.title !== editedTitle ||
                    selected.content !== editedContent)
                ) {
                  alert(
                    "У вас є незбережені данні, спочатку збережіть виправлення"
                  );
                  return;
                }
                setSelected(article);
                setEditedTitle(article.title);
                setEditedContent(article.content);
                setEditContent(false);
                setEditTitle(false);
              }}
              className={`w-full text-left p-4 hover:bg-gray-100 ${
                selected?._id === article._id ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              <p className="truncate">{article.title}</p>
            </button>
          ))}
      </aside>

      <main className="p-6 overflow-y-auto flex flex-col gap-4">
        {selected && (
          <>
            <div className="flex gap-2">
              <button
                onClick={handleApprove}
                disabled={confirmMutation.isPending}
                className="self-start bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Підтвердити статтю
              </button>
              <button
                onClick={handleReject}
                disabled={deleteMutation.isPending}
                className="self-start bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Видалити статтю
              </button>
            </div>
            <p>
              <span className="text-lg font-bold ml-23">Original title - </span>
              {selected.original?.title}
            </p>
            <div className="w-full">
              <button
                className="px-4 py-1 rounded-[8px] border-1 mr-2"
                type="button"
                onClick={editTitleHandler}
              >
                {editTitle ? "Save" : "Edit"}
              </button>
              <span className="text-lg font-bold ">Translated title - </span>
              {editTitle ? (
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-lg border-b p-2 w-2/3"
                />
              ) : (
                selected.title
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-muted-foreground mb-5.5">
                  Original (EN)
                </h3>
                <article
                  className="border rounded-md p-4 bg-gray-50 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: selected.original?.content || "No original content",
                  }}
                />
              </div>
              <div className="h-full">
                <div className="flex gap-3 mb-2 items-center">
                  <h3 className="text-sm text-muted-foreground ">
                    Translated (UA)
                  </h3>
                  <button
                    className="px-4 py-1 rounded-[8px] border-1 "
                    type="button"
                    onClick={editContentHandler}
                  >
                    {editContent ? "Save" : "Edit"}
                  </button>
                </div>
                {editContent ? (
                  <div className="border h-full rounded-md p-4 bg-gray-50 whitespace-pre-wrap">
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-full border p-2 rounded-md"
                    />
                  </div>
                ) : (
                  <article
                    className="border h-full rounded-md p-4 bg-gray-50 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: selected.content,
                    }}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
