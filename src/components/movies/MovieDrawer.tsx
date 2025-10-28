import { useEffect, useState } from "react";
import Drawer from "../common/Drawer";
import Button from "../common/Button";
import { fieldsCreateMovie } from "../../utils/fields";
import { toast } from "react-hot-toast";
import type { Movie, MovieFormData } from "../../types/movies";
import FormsFields, { buildInitialValues } from "../common/FormsFields";
import { createMovie, updateMovie } from "../../lib/movies";
import { validateRequiredFields } from "../../utils/validateRequiredFields";

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

    const isJsonString = (str: any) => {
        if (typeof str !== "string") return false;
        try {
            const parsed = JSON.parse(str);
            return typeof parsed === "object" && parsed !== null;
        } catch {
            return false;
        }
    };


    const normalizeValue = (v: any) => {
        if (v === undefined || v === null) return null;

        if (v instanceof File) return v;

        if (typeof v === "string" && isJsonString(v)) {
            try {
                const parsed = JSON.parse(v);
                return JSON.stringify(parsed);
            } catch {
                return v;
            }
        }

        if (typeof v === "object") {
            return JSON.stringify(v);
        }

        return v;
    };

    const toFormData = (data: Record<string, any>): FormData => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            if (Array.isArray(value)) {
                value.forEach((v, i) => {
                    const normalized = normalizeValue(v);
                    if (normalized !== null) {
                        formData.append(`${key}[${i}]`, normalized);
                    }
                });
                return;
            }

            if (typeof value === "object" && !(value instanceof File)) {
                formData.append(key, normalizeValue(value));
                return;
            }

            formData.append(key, String(value));
        });

        return formData;
    };

    const normalizeMovieDataBeforeSubmit = (data: Record<string, any>) => {
        const cleanData = { ...data };

        const fixArray = (arr?: any[]) =>
            Array.isArray(arr)
                ? arr.map((item) => {
                    if (typeof item === "string" && isJsonString(item)) return item;
                    if (typeof item === "object") return JSON.stringify(item);
                    return item;
                })
                : [];

        cleanData.actors = fixArray(cleanData.actors);
        cleanData.producers = fixArray(cleanData.producers);
        cleanData.genres = fixArray(cleanData.genres);

        return cleanData;
    };

    const handleSubmit = async () => {
        const { isValid, missingFields } = validateRequiredFields(fieldsCreateMovie, movieData);
        if (!isValid) {
            toast.error(
                `Preencha os campos obrigatórios: ${missingFields.join(", ")}`
            );
            return;
        }
        try {
            setLoading(true);

            const normalized = normalizeMovieDataBeforeSubmit(movieData);
            const formData = toFormData(normalized);

            if (movieData.imageCoverFile) formData.set("imageCover", movieData.imageCoverFile);
            if (movieData.imagePosterFile) formData.set("imagePoster", movieData.imagePosterFile);

            const updatedMovie =
                mode === "edit" && movie?.id
                    ? await updateMovie(movie.id, formData)
                    : await createMovie(formData);

            toast.success(mode === "edit" ? "Filme atualizado!" : "Filme cadastrado!");
            onClose();
            onSaved?.(updatedMovie);
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Erro ao salvar o filme.");
        } finally {
            setLoading(false);
        }
    };



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
