import type { MovieListResponse } from "../types/movies";
import { api } from "./api";

export const getAllMovies = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: "DRAFT" | "PUBLISHED";
  visibility?: "PUBLIC" | "PRIVATE";
  genre?: string;
  orderBy?: "title" | "releaseDate" | "ratingAvg" | "createdAt";
  order?: "asc" | "desc";
}): Promise<MovieListResponse> => {
  try {
    const response = await api.get("/movie/list", { params });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar filmes:", error.response?.data);

    const apiError = error.response?.data;

    if (apiError?.errors) {
      throw new Error(apiError.errors.join(", "));
    }

    if (apiError?.error) {
      throw new Error(apiError.error);
    }

    throw new Error("Erro ao carregar lista de filmes.");
  }
};

export const getMovieById = async (id: string | number) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Erro ao buscar filme (${id}):`, error.response?.data);

    const apiError = error.response?.data;

    if (apiError?.errors) {
      throw new Error(apiError.errors.join(", "));
    }

    if (apiError?.error) {
      throw new Error(apiError.error);
    }

    throw new Error("Erro ao carregar detalhes do filme.");
  }
};

export const deleteMovie = async (id: string | number) => {
  try {
    const res = await api.delete(`/movie/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("Erro ao deletar filme:", error.response?.data);

    const apiError = error.response?.data;

    if (apiError?.errors) {
      throw new Error(apiError.errors.join(", "));
    }

    if (apiError?.error) {
      throw new Error(apiError.error);
    }

    throw new Error("Erro ao deletar o filme. Tente novamente mais tarde.");
  }
};
