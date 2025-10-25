import MovieActions from "../components/movies/MovieActions";
import Pagination from "../components/common/Pagination";
import { useState } from "react";


export default function Home() {

    const [currentPage, setCurrentPage] = useState(1);

    const movies = Array.from({ length: 900 }, (_, i) => ({
        id: i + 1,
        title: `Filme ${i + 1}`,
        description: "Descrição do filme...",
        image: "https://placehold.co/300x450",
    }));

    const itemsPerPage = 10;
    const totalPages = Math.ceil(movies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);

    return (
        <main className="flex flex-col gap-6 px-8 max-w-8xl mx-auto w-full">
            <MovieActions />
            <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
                {currentMovies.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-[#1a1a1a] rounded-md overflow-hidden shadow-md hover:scale-[1.02] transition-transform"
                    >
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-[220px] object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                            <p className="text-sm text-gray-400 mt-2">{movie.description}</p>
                        </div>
                    </div>
                ))}
            </section>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </main>
    );
}
