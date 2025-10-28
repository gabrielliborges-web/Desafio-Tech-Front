import { useState } from "react";
import Drawer from "../common/Drawer";
import Button from "../common/Button";
import { fieldsCreateMovie } from "../../utils/fields";
import { toast } from "react-hot-toast";
import type { MovieFormData } from "../../types/movies";
import FormsFields, { buildInitialValues } from "../common/FormsFields";
import { createMovie } from "../../lib/movies";

interface MovieDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function MovieDrawer({ open, onClose }: MovieDrawerProps) {
    const [movieData, setMovieData] = useState<MovieFormData>(
        buildInitialValues(fieldsCreateMovie) as MovieFormData
    );

    const [loading, setLoading] = useState(false);

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

            if (movieData.imageCoverFile) formData.append("imageCover", movieData.imageCoverFile);
            if (movieData.imagePosterFile) formData.append("imagePoster", movieData.imagePosterFile);

            await createMovie(formData);
            toast.success("Filme cadastrado com sucesso!");
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Erro ao cadastrar filme.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer
            title="Novo Filme"
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
