import InfoCard from "../components/movies/InfoCard";
import Button from "../components/common/Button";
import Bumble from "../assets/bumblebee.png";

export default function MovieDetails() {
    const movie = {
        title: "Bumblebee",
        originalTitle: "Bumblebee",
        description:
            "“Bumblebee” é um filme que se passa em 1987 e conta a história do Autobot chamado Bumblebee que encontra refúgio em um ferro-velho numa pequena cidade praiana da Califórnia. Charlie, uma adolescente prestes a completar 18 anos, encontra Bumblebee machucado e sem condições de uso. Quando ela o revive, percebe que este não é qualquer fusca amarelo.",
        imageUrl: Bumble,
        tagline: "Todo herói tem um começo.",
        genres: ["Ação", "Aventura", "Ficção Científica"],
        details: [
            { title: "Classificação Indicativa", content: "13 anos" },
            { title: "Lançamento", content: "20/12/2018" },
            { title: "Duração", content: "1h 53m" },
            { title: "Situação", content: "Lançado" },
            { title: "Idioma", content: "Inglês" },
            { title: "Orçamento", content: "$135M" },
            { title: "Receita", content: "$467.99M" },
            { title: "Lucro", content: "$332.99M" },
        ],
        votes: 5704,
        rating: 67,
    };

    return (
        <main className="relative w-full min-h-screen text-white overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{
                    backgroundImage: `url(${movie.imageUrl})`,
                    height: "603px",
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 to-background-dark/95" />

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between col-span-3 mb-1">
                    <div>
                        <h1 className="text-4xl font-bold">{movie.title}</h1>
                        <p className="text-sm text-gray-300">
                            Título original:{" "}
                            <span className="italic">{movie.originalTitle}</span>
                        </p>
                    </div>

                    <div className="flex gap-3 mt-4 md:mt-0">
                        <Button variant="secondary" className="w-[90px] h-[40px]">
                            Deletar
                        </Button>
                        <Button variant="primary" className="w-[90px] h-[40px]">
                            Editar
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        className="w-[374px] h-[542px] rounded-md object-cover"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <p className="italic text-gray-300">{movie.tagline}</p>

                    <InfoCard
                        title="Sinopse"
                        content={<p className="leading-relaxed text-justify">{movie.description}</p>}
                    />

                    <InfoCard
                        title="Gêneros"
                        content={
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((g) => (
                                    <span
                                        key={g}
                                        className="px-3 py-1 bg-primary-dark-7/80 rounded-md text-sm"
                                    >
                                        {g}
                                    </span>
                                ))}
                            </div>
                        }
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {movie.details.map((item) => (
                        <InfoCard key={item.title} title={item.title} content={item.content} />
                    ))}

                    <InfoCard
                        title="Avaliação"
                        content={
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Votos</p>
                                    <p className="text-lg font-semibold">{movie.votes}</p>
                                </div>

                                <div className="relative w-[90px] h-[90px] flex items-center justify-center">
                                    <svg
                                        className="absolute inset-0 transform -rotate-90"
                                        viewBox="0 0 36 36"
                                    >
                                        <path
                                            stroke="#1e1e1e"
                                            strokeWidth="3"
                                            fill="none"
                                            d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32"
                                        />
                                        <path
                                            stroke="#facc15"
                                            strokeWidth="3"
                                            fill="none"
                                            strokeDasharray={`${movie.rating}, 100`}
                                            strokeLinecap="round"
                                            d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32"
                                        />
                                    </svg>
                                    <span className="text-xl font-semibold text-yellow-400">
                                        {movie.rating}%
                                    </span>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </main>
    );
}
