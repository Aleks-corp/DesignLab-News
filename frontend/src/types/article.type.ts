export interface IArticles {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  sourceUrl: string;
  imageUrl?: string;
  categories?: string[];
  author?: string;
  source?: string;
  publishedAt?: string;
  status?: "raw" | "underreview" | "approved" | "declined";
  original?: {
    title: string;
    content: string;
  };
}
