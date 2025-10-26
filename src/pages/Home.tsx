import { useState } from "react";
import { Link } from "react-router-dom";

import MovieActions from "../components/movies/MovieActions";
import Pagination from "../components/common/Pagination";
import MovieCard from "../components/movies/MovieCard";

import capitaoMarvel from '../assets/capitaoMarvel.png'
import movies_models from '../assets/bumblebee.png'

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);

    const movies = Array.from({ length: 95 }, (_, i) => ({
        id: i + 1,
        imageCover:
            i % 3 === 0
                ? capitaoMarvel
                : movies_models,
        linkPreview: "https://www.youtube.com/watch?v=gHpElXQ_roc",
        title: `Filme ${i + 1}`,
        description:
            "Um filme emocionante que conta a história de coragem e superação em um universo cheio de ação, drama e aventura. Inspirador e visualmente impressionante.",
        rating: Math.floor(Math.random() * 100),
    }));


    const itemsPerPage = 10;
    const totalPages = Math.ceil(movies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);

    return (
        <main className="relative w-full min-h-screen pb-10">

            <div className="relative z-10 max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-8 flex flex-col gap-8 py-6">
                <MovieActions />

                <div className="bg-[#ebeaf8]/[0.05] rounded-md p-6 sm:p-8 border border-[#ebeaf8]/[0.08]">

                    <section className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
                        {currentMovies.map((m) => (
                            <Link
                                key={m.id}
                                to={`/movie/${m.id}`}
                                className="w-full h-full cursor-pointer transition-transform hover:scale-[1.02]"
                            >
                                <MovieCard
                                    title={m.title}
                                    description={m.description}
                                    imageCover={m.imageCover}
                                    rating={m.rating}
                                    linkPreview={m.linkPreview}
                                />
                            </Link>
                        ))}
                    </section>
                </div>

                <div className="flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </main>
    );
}