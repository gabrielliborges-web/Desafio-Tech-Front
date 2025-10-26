import InfoCard from "../components/movies/InfoCard";
import Button from "../components/common/Button";
import Bumble from "../assets/imageCAPA.jpg";
import bumblebee from "../assets/bumblebee.png";
import RatingCircle from "../components/movies/RatingCircle";
import { getYouTubeId } from "../utils/pathVideo";
import { useState } from "react";
import Modal from "../components/common/Modal";

export default function MovieDetails() {
    const movie = {
        id: "a8bdf3d5-25b7-4c3e-9134-2f62d8e8f9b4",
        title: "Bumblebee",
        tagline: "Todo herói tem um começo.",
        originalTitle: "Bumblebee",
        description:
            "“Bumblebee” é um filme que se passa em 1987 e conta a história do Autobot chamado Bumblebee que encontra refúgio em um ferro-velho numa pequena cidade praiana da Califórnia. Charlie, uma adolescente prestes a completar 18 anos, encontra Bumblebee machucado e sem condições de uso. Quando ela o revive, percebe que este não é qualquer fusca amarelo.",
        releaseDate: new Date("2018-12-20"),
        duration: 113,
        indicativeRating: 13,
        imageCover: bumblebee,
        imagePoster: Bumble,
        linkPreview: "https://www.youtube.com/watch?v=fAIX12F6958",
        actors: [
            { name: "Hailee Steinfeld", role: "Charlie Watson" },
            { name: "John Cena", role: "Agent Burns" },
            { name: "Jorge Lendeborg Jr.", role: "Memo" },
        ],
        director: "Travis Knight",
        producers: [
            { name: "Lorenzo di Bonaventura" },
            { name: "Tom DeSanto" },
            { name: "Michael Bay" },
        ],
        language: "Inglês",
        country: "Estados Unidos",
        budget: 135000000.0,
        revenue: 467990000.0,
        profit: 332990000.0,
        ratingAvg: 6.7,
        status: "RELEASED",
        visibility: "PUBLIC",
        userId: "user_123456",
        user: {
            id: "user_123456",
            name: "Gabrielli Borges",
        },
        genres: [
            { id: 1, name: "Ação" },
            { id: 2, name: "Aventura" },
            { id: 3, name: "Ficção Científica" },
        ],
        ratings: [
            { id: 1, userId: "u1", score: 70 },
            { id: 2, userId: "u2", score: 64 },
            { id: 3, userId: "u3", score: 67 },
        ],
        comments: [
            {
                id: 1,
                user: "cinelover98",
                content:
                    "Um ótimo reboot da franquia Transformers! Muito mais coração e história.",
                createdAt: "2020-01-02T10:00:00Z",
            },
        ],
        likes: [{ userId: "u1" }, { userId: "u2" }, { userId: "u3" }],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-05-01"),
        votes: 5704,
        rating: 95,
    };

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleDelete = () => {
        console.log("Filme deletado com sucesso!");
        setOpenDeleteModal(false);
    };

    return (
        <main className="relative w-full min-h-screen text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[300px] sm:h-[400px] md:h-[603px] hidden md:block">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${movie.imagePoster})`,
                        backgroundPosition: "center top",
                    }}
                />

                <div className="absolute inset-0 bg-black/80" />
            </div>

            <section className="relative z-10 w-full max-w-[1440px] mx-auto pt-10">
                <div className="flex justify-center md:hidden order-1 mb-6">
                    <img
                        src={movie.imageCover}
                        alt={movie.title}
                        className="w-[374px] h-[542px] object-cover rounded-[4px] shadow-[0_1px_5px_0_#00000033]"
                    />
                </div>

                <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10 order-2">
                    <div className="flex w-full md:w-auto gap-1 order-1 md:order-2">
                        <Button
                            variant="secondary"
                            className="h-[40px] w-[30%] md:w-[90px] text-sm md:text-base"
                            onClick={() => setOpenDeleteModal(true)}
                        >
                            Deletar
                        </Button>
                        <Button
                            variant="primary"
                            className="h-[40px] w-[70%] md:w-[120px] text-sm md:text-base"
                        >
                            Editar
                        </Button>
                    </div>

                    <div className="order-2 md:order-1 text-center md:text-left w-full md:w-auto">
                        <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
                        <p className="text-sm md:text-base text-gray-300">
                            Título original:{" "}
                            <span className="font-normal">{movie.originalTitle}</span>
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="hidden md:flex justify-center md:justify-start">
                        <img
                            src={movie.imageCover}
                            alt={movie.title}
                            className="w-[374px] h-[500px] object-cover rounded-[4px] shadow-[0_1px_5px_0_#00000033]"
                        />
                    </div>

                    <div className="col-span-2 rounded-md p-4 flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

                            <div className="grid grid-cols-[2fr_1fr_auto] items-center gap-4">
                                <p className="italic text-gray-300 text-center md:text-left text-base md:text-lg">
                                    {movie.tagline}
                                </p>

                                <div className="flex justify-center md:justify-center gap-2">
                                    {[
                                        { title: "Classificação Indicativa", content: `${movie.indicativeRating} anos` },
                                        { title: "Votos", content: movie.votes },
                                    ].map((item) => (
                                        <InfoCard
                                            key={item.title}
                                            title={item.title}
                                            content={item.content}
                                            compact
                                            className="min-w-[140px] text-center"
                                        />
                                    ))}
                                </div>

                                <div className="flex justify-center md:justify-end">
                                    <RatingCircle
                                        rating={movie.rating}
                                        size={70}
                                        strokeWidth={3}
                                        color="#facc15"
                                        bgColor="#1e1e1e"
                                        className="shrink-0"
                                    />
                                </div>
                            </div>



                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-4">
                                {[
                                    {
                                        title: "Sinopse",
                                        content: (
                                            <p className="leading-relaxed text-justify">
                                                {movie.description}
                                            </p>
                                        ),
                                    },
                                    {
                                        title: "Gêneros",
                                        content: (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {movie.genres.map((g) => (
                                                    <span
                                                        key={g.name}
                                                        className="px-3 py-1 bg-primary-darkA-3 rounded-sm text-sm"
                                                    >
                                                        {g.name}
                                                    </span>
                                                ))}
                                            </div>
                                        ),
                                    },
                                ].map((item) => (
                                    <InfoCard key={item.title} title={item.title} content={item.content} />
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoCard title="Lançamento" content="20/12/2018" compact />
                                    <InfoCard title="Duração" content="1h 53m" compact />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <InfoCard title="Situação" content="Lançado" compact />
                                    <InfoCard title="Idioma" content="Inglês" compact />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <InfoCard title="Orçamento" content="$135M" compact />
                                    <InfoCard title="Receita" content="$467.99M" compact />
                                    <InfoCard title="Lucro" content="$332.99M" compact />
                                </div>
                            </div>
                        </div>


                    </div>



                </div>

            </section>

            <section className="w-full mt-10 mb-4">
                <h2 className="text-2xl font-semibold mb-4">Trailer</h2>

                <div className="relative w-full aspect-video rounded-sm overflow-hidden shadow-lg bg-black">
                    {movie.linkPreview ? (
                        movie.linkPreview.includes("youtube.com") || movie.linkPreview.includes("youtu.be") ? (
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(movie.linkPreview)}?autoplay=0&controls=1`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <video
                                src={movie.linkPreview}
                                controls
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-mauve-dark-3 text-gray-400">
                            Nenhum trailer disponível
                        </div>
                    )}
                </div>
            </section>

            <Modal
                title="Confirmar exclusão"
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setOpenDeleteModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleDelete}>
                            Confirmar
                        </Button>
                    </>
                }
            >
                <div className="p-2">
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Tem certeza que deseja deletar o filme{" "}
                        <span className="font-semibold text-white">"{movie.title}"</span>?
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                        Esta ação é permanente e não poderá ser desfeita.
                    </p>
                </div>
            </Modal>

        </main>
    );
}
