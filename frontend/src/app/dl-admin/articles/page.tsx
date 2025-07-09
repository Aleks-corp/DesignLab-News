"use client";

import { fetchArticlesToReview } from "@/lib/api";
import { IArticles } from "@/types/article.type";
import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmArticle, deleteArticle } from "@/lib/api";

import AdminEditArticle from "@/components/AdminEditArticles";

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

  const confirmMutation = useMutation<IArticles, Error, IArticles>({
    mutationFn: confirmArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const deleteMutation = useMutation<{ deletedId: string }, Error, string>({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка завантаження</p>;
  return (
    <div className="w-full h-screen">
      {data && (
        <AdminEditArticle
          data={data}
          confirmMutation={confirmMutation}
          deleteMutation={deleteMutation}
        />
      )}
    </div>
  );
}
