import MovieActions from "../components/movies/MovieActions";

export default function Home() {
    return (
        <main className="flex flex-col gap-6 px-8 max-w-8xl mx-auto w-full">
            <MovieActions />
        </main>
    );
}
