import { useEffect, useState } from "react";
import Drawer from "../common/Drawer";
import Button from "../common/Button";
import { fieldsCreateMovie } from "../../utils/fields";
import { toast } from "react-hot-toast";
import type { Movie, MovieFormData } from "../../types/movies";
import FormsFields, { buildInitialValues } from "../common/FormsFields";
import { createMovie, updateMovie } from "../../lib/movies";

interface MovieDrawerProps {
    mode: "create" | "edit";
    open: boolean;
    onClose: () => void;
    movie?: Partial<MovieFormData>;
    onSaved?: (updatedMovie?: Movie) => void;
}

export default function MovieDrawer({
    mode,
    open,
    onClose,
    movie,
    onSaved,
}: MovieDrawerProps) {

    const [movieData, setMovieData] = useState<MovieFormData>(
        buildInitialValues(fieldsCreateMovie) as MovieFormData
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (mode === "edit" && movie) {
            setMovieData({
                ...movie,
                releaseDate: movie.releaseDate
                    ? new Date(movie.releaseDate).toISOString().split("T")[0]
                    : "",
                actors: Array.isArray(movie.actors)
                    ? movie.actors.map((a: any) =>
                        typeof a === "string" ? { name: a } : a
                    )
                    : [],
                producers: Array.isArray(movie.producers)
                    ? movie.producers.map((p: any) =>
                        typeof p === "string" ? { name: p } : p
                    )
                    : [],
                director:
                    movie.director && typeof movie.director === "string"
                        ? { name: movie.director }
                        : movie.director || { name: "" },
            } as MovieFormData);

        } else if (mode === "create") {
            setMovieData(buildInitialValues(fieldsCreateMovie) as MovieFormData);
        }
    }, [mode, movie, open]);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const formData = new FormData();
            Object.entries(movieData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
                    } else {
                        formData.append(key, value as any);
                    }
                }
            });

            if (movieData.imageCoverFile)
                formData.append("imageCover", movieData.imageCoverFile);
            if (movieData.imagePosterFile)
                formData.append("imagePoster", movieData.imagePosterFile);

            let updatedMovie;

            if (mode === "edit" && movie?.id) {
                updatedMovie = await updateMovie(movie.id, formData);
                toast.success("Filme atualizado com sucesso!");
            } else {
                updatedMovie = await createMovie(formData);
                toast.success("Filme cadastrado com sucesso!");
            }

            onClose();
            onSaved?.(updatedMovie);
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Erro ao salvar o filme.");
        } finally {
            setLoading(false);
        }
    };


    console.log({ movieData, movie })

    return (
        <Drawer
            title={mode === "create" ? "Novo Filme" : `Editar Filme — ${movieData.title}`}
            open={open}
            onClose={onClose}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="min-w-[100px]"
                    >
                        {loading ? "Salvando..." : "Salvar"}
                    </Button>
                </>
            }
        >
            <FormsFields fields={fieldsCreateMovie} values={movieData} setValues={setMovieData} />
        </Drawer>
    );
}
