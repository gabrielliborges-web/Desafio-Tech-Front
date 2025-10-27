export interface Movie {
  id: number;
  title: string;
  tagline: string;
  description?: string;
  releaseDate?: string;
  duration?: number;
  indicativeRating?: number;
  imageCover?: string;
  imagePoster?: string;
  linkPreview?: string;
  director?: string;
  language?: string;
  country?: string;
  ratingAvg?: number;
  status: "DRAFT" | "PUBLISHED";
  visibility: "PUBLIC" | "PRIVATE";
  genres: { id: number; name: string }[];
  user: { id: number; name: string; email?: string };
  createdAt: string;
}

export interface MovieListResponse {
  data: Movie[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
