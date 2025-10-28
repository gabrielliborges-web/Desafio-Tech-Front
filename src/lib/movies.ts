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
    const status = error.response?.status;

    if (apiError?.errors) {
      throw { status, message: apiError.errors.join(", ") };
    }

    if (apiError?.error) {
      throw { status, message: apiError.error };
    }

    throw { status, message: "Erro ao carregar lista de filmes." };
  }
};

export const getMovieById = async (id: string | number) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Erro ao buscar filme (${id}):`, error.response?.data);

    const apiError = error.response?.data;
    const status = error.response?.status;

    if (apiError?.errors) {
      throw { status, message: apiError.errors.join(", ") };
    }

    if (apiError?.error) {
      throw { status, message: apiError.error };
    }

    throw { status, message: "Erro ao carregar detalhes do filme." };
  }
};

export const deleteMovie = async (id: string | number) => {
  try {
    const res = await api.delete(`/movie/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("Erro ao deletar filme:", error.response?.data);

    const apiError = error.response?.data;
    const status = error.response?.status;

    if (apiError?.errors) {
      throw { status, message: apiError.errors.join(", ") };
    }

    if (apiError?.error) {
      throw { status, message: apiError.error };
    }

    throw {
      status,
      message: "Erro ao deletar o filme. Tente novamente mais tarde.",
    };
  }
};

export const createMovie = async (formData: FormData) => {
  try {
    const res = await api.post("/movie/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error: any) {
    console.error("Erro ao criar filme:", error.response?.data);

    const apiError = error.response?.data;
    const status = error.response?.status;

    if (apiError?.errors) {
      throw {
        status,
        message: apiError.errors.map((e: any) => e.message).join(", "),
      };
    }

    if (apiError?.error) {
      throw { status, message: apiError.error };
    }

    throw { status, message: "Erro ao cadastrar o filme. Tente novamente." };
  }
};

export const updateMovie = async (
  id: number | string,
  formData: FormData
): Promise<any> => {
  try {
    const response = await api.put(`/movie/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar filme:", error.response?.data);

    const apiError = error.response?.data;
    const status = error.response?.status;

    if (apiError?.errors) {
      throw { status, message: apiError.errors.join(", ") };
    }

    if (apiError?.error) {
      throw { status, message: apiError.error };
    }

    throw { status, message: "Erro ao atualizar o filme. Tente novamente." };
  }
};
