// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
