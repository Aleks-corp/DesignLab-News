// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // кеш живе 1 хв
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
