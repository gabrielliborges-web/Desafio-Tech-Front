import { useState } from "react";
import MovieActions from "../components/movies/MovieActions";
import Pagination from "../components/common/Pagination";
import MovieCard from "../components/movies/MovieCard";

import capitaoMarvel from '../assets/capitaoMarvel.png'
import movies_models from '../assets/bumblebee.png'

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);

    const movies = Array.from({ length: 95 }, (_, i) => ({
        id: i + 1,
        imageUrl:
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
        <main className="flex flex-col gap-8 px-8 max-w-8xl mx-auto w-full pb-10">
            <MovieActions />

            <section
                className="
      grid 
      grid-cols-2 
      xs:grid-cols-2 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      xl:grid-cols-5 
      gap-6 
      mt-4 
      place-items-center
    "
            >
                {currentMovies.map((m) => (
                    <MovieCard key={m.id} {...m} />
                ))}
            </section>

            <div className="flex justify-center mt-6">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </main>
    );
}
