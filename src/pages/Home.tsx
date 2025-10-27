import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieActions from "../components/movies/MovieActions";
import Pagination from "../components/common/Pagination";
import MovieCard from "../components/movies/MovieCard";
import { getAllMovies } from "../lib/movies";
import type { Movie } from "../types/movies";
import Loading from "../components/common/Loading";

interface MoviesState {
    data: Movie[];
    loading: boolean;
    page: number;
    totalPages: number;
    limit: number;
}

export default function Home() {
    const [moviesState, setMoviesState] = useState<MoviesState>({
        data: [],
        loading: true,
        page: 1,
        totalPages: 1,
        limit: 10,
    });

    const loadMovies = async (page = moviesState.page) => {
        setMoviesState((prev) => ({ ...prev, loading: true }));

        try {
            const res = await getAllMovies({ page, limit: moviesState.limit });

            setMoviesState({
                data: res.data,
                loading: false,
                page: res.meta.page,
                totalPages: res.meta.totalPages,
                limit: res.meta.limit,
            });
        } catch (err: any) {
            console.error("Erro ao carregar filmes:", err.message);
            setMoviesState((prev) => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    console.log(moviesState)

    const handlePageChange = (page: number) => {
        loadMovies(page);
    };

    if (moviesState.loading) return <Loading text="Carregando filmes..." />;

    return (
        <main className="relative w-full min-h-screen pb-10">
            <div className="relative z-10 max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-8 flex flex-col gap-8 py-6">
                <MovieActions />

                <div className="bg-[#ebeaf8]/[0.05] rounded-md p-6 sm:p-8 border border-[#ebeaf8]/[0.08]">
                    {moviesState.data.length === 0 ? (
                        <p className="text-center text-white/70">Nenhum filme encontrado.</p>
                    ) : (
                        <section className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
                            {moviesState.data.map((m) => (
                                <Link
                                    key={m.id}
                                    to={`/movie/${m.id}`}
                                    className="w-full h-full cursor-pointer transition-transform hover:scale-[1.02]"
                                >
                                    <MovieCard
                                        title={m.title}
                                        description={m.description}
                                        imageCover={m.imageCover}
                                        rating={m.ratingAvg}
                                        linkPreview={m.linkPreview}
                                    />
                                </Link>
                            ))}
                        </section>
                    )}
                </div>

                {moviesState.totalPages > 1 && (
                    <div className="flex justify-center">
                        <Pagination
                            currentPage={moviesState.page}
                            totalPages={moviesState.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}
