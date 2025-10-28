import { createContext, useContext, useState } from "react";
import { useMovies } from "../hooks/useMovies";
import type { MovieFilters } from "../types/movies";
import { getUserMovies, updateMovieStatus } from "../lib/movies";

interface MoviesContextProps {
    data: any[];
    userMovies: any[];
    loading: boolean;
    page: number;
    totalPages: number;
    filters: MovieFilters;
    loadMovies: (page?: number, filters?: MovieFilters) => Promise<void>;
    loadUserMovies: (page?: number) => Promise<void>;
    setFilters: (filters: MovieFilters) => void;
    refreshMovies: () => Promise<void>;
    changeMovieStatus: (id: number, status: "DRAFT" | "PUBLISHED") => Promise<void>;
}

const MoviesContext = createContext<MoviesContextProps | undefined>(undefined);

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
    const movies = useMovies();

    // 🔹 estados adicionais para filmes do usuário
    const [userMovies, setUserMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // 🔸 recarrega os filmes públicos
    const refreshMovies = async () => {
        await movies.loadMovies(movies.page, movies.filters);
    };

    // 🔸 carrega filmes do usuário logado
    const loadUserMovies = async (pageNumber = 1) => {
        setLoading(true);
        try {
            const res = await getUserMovies(pageNumber);
            setUserMovies(res.data);
            setPage(res.meta.page);
            setTotalPages(res.meta.totalPages);
        } catch (err) {
            console.error("Erro ao carregar filmes do usuário:", err);
        } finally {
            setLoading(false);
        }
    };

    // 🔸 atualiza status (publicar / voltar pra rascunho)
    const changeMovieStatus = async (id: number, status: "DRAFT" | "PUBLISHED") => {
        try {
            await updateMovieStatus(id, status);
            await loadUserMovies(page); // recarrega após alteração
        } catch (err) {
            console.error("Erro ao atualizar status do filme:", err);
        }
    };

    return (
        <MoviesContext.Provider
            value={{
                ...movies,
                userMovies,
                loading: movies.loading || loading,
                page,
                totalPages,
                loadUserMovies,
                changeMovieStatus,
                refreshMovies,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export const useMoviesContext = () => {
    const context = useContext(MoviesContext);
    if (!context)
        throw new Error("useMoviesContext must be used within a MoviesProvider");
    return context;
};
