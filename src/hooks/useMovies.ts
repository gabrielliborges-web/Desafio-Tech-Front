import { useState, useEffect } from "react";
import { getAllMovies } from "../lib/movies";
import type { MovieFilters, MoviesState } from "../types/movies";

export interface UseMoviesReturn extends MoviesState {
  loadMovies: (page?: number, filters?: MovieFilters) => Promise<void>;
  setFilters: (filters: MovieFilters) => void;
}

export function useMovies(initialPage = 1, initialLimit = 10): UseMoviesReturn {
  const [state, setState] = useState<MoviesState>({
    data: [],
    loading: true,
    page: initialPage,
    totalPages: 1,
    limit: initialLimit,
    filters: {},
  });

  const loadMovies = async (
    page?: number,
    filters?: MovieFilters,
    showLoading = true
  ) => {
    const finalPage = page ?? state.page;
    const finalFilters = filters ?? state.filters;

    if (showLoading) setState((prev) => ({ ...prev, loading: true }));

    try {
      console.log("→ Filtros aplicados:", finalFilters);

      const res = await getAllMovies({
        page: finalPage,
        limit: state.limit,
        ...finalFilters,
      });

      setState((prev) => ({
        ...prev,
        data: res.data,
        loading: false,
        page: res.meta.page,
        totalPages: res.meta.totalPages,
        filters: finalFilters,
      }));
    } catch (err: any) {
      console.error("Erro ao carregar filmes:", err.message);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const setFilters = (filters: MovieFilters) => {
    loadMovies(1, filters);
  };

  return { ...state, loadMovies, setFilters };
}
