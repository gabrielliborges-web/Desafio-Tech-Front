import { createContext, useContext } from "react";
import { useMovies } from "../hooks/useMovies";
import type { MovieFilters } from "../types/movies";

interface MoviesContextProps {
    data: any[];
    loading: boolean;
    page: number;
    totalPages: number;
    filters: MovieFilters;
    loadMovies: (page?: number, filters?: MovieFilters) => Promise<void>;
    setFilters: (filters: MovieFilters) => void;
    refreshMovies: () => Promise<void>;
}

const MoviesContext = createContext<MoviesContextProps | undefined>(undefined);

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
    const movies = useMovies();

    const refreshMovies = async () => {
        await movies.loadMovies(movies.page, movies.filters);
    };

    return (
        <MoviesContext.Provider value={{ ...movies, refreshMovies }}>
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
