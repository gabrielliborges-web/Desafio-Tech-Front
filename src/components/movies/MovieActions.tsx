import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { Search } from "lucide-react";
import Modal from "../common/Modal";
import FormsFields, { type Field, buildInitialValues } from "../common/FormsFields";
import Drawer from "../common/Drawer";

export default function MovieActions() {
    const fieldsSearch: Field[] = [
        { internalName: "search", label: "Busca Geral", type: "text", value: "", colSpan: 12 },
        { internalName: "originalTitle", label: "Título Original", type: "text", value: "", colSpan: 12 },

        { internalName: "releaseDateStart", label: "Lançamento (De)", type: "datetime", value: "", colSpan: 6 },
        { internalName: "releaseDateEnd", label: "Lançamento (Até)", type: "datetime", value: "", colSpan: 6 },

        { internalName: "minDuration", label: "Duração Mínima", type: "number", value: "", colSpan: 6 },
        { internalName: "maxDuration", label: "Duração Máxima", type: "number", value: "", colSpan: 6 },

        { internalName: "minBudget", label: "Orçamento Mínimo", type: "number", value: "", colSpan: 6 },
        { internalName: "maxBudget", label: "Orçamento Máximo", type: "number", value: "", colSpan: 6 },

        { internalName: "status", label: "Status", type: "choice", options: ["DRAFT", "PUBLISHED"], value: "", colSpan: 6 },
        { internalName: "visibility", label: "Visibilidade", type: "choice", options: ["PRIVATE", "PUBLIC"], value: "", colSpan: 6 },

        { internalName: "userId", label: "Usuário Responsável", type: "text", value: "", colSpan: 12 },

        { internalName: "createdAtStart", label: "Criado em (De)", type: "datetime", value: "", colSpan: 6 },
        { internalName: "createdAtEnd", label: "Criado em (Até)", type: "datetime", value: "", colSpan: 6 },
    ];

    const fieldsCreateMovie: Field[] = [
        { internalName: "title", label: "Título", type: "text", value: "", required: true, colSpan: 12 },
        { internalName: "originalTitle", label: "Título Original", type: "text", value: "", colSpan: 12 },
        { internalName: "description", label: "Descrição", type: "text", value: "", colSpan: 12 },

        { internalName: "releaseDate", label: "Data de Lançamento", type: "datetime", value: "", colSpan: 6 },
        { internalName: "duration", label: "Duração (minutos)", type: "number", value: "", colSpan: 6 },

        { internalName: "imageUrl", label: "URL da Capa", type: "text", value: "", colSpan: 12 },
        { internalName: "linkPreview", label: "Link do Trailer/Teaser", type: "text", value: "", colSpan: 12 },

        { internalName: "actors", label: "Atores", type: "usermulti", value: [], colSpan: 12 },
        { internalName: "director", label: "Diretor", type: "user", value: '', colSpan: 12 },
        { internalName: "producers", label: "Produtores", type: "usermulti", value: [], colSpan: 12 },


        { internalName: "language", label: "Idioma", type: "text", value: "", colSpan: 6 },
        { internalName: "country", label: "País", type: "text", value: "", colSpan: 6 },

        { internalName: "budget", label: "Orçamento (USD)", type: "number", value: "", colSpan: 4 },
        { internalName: "revenue", label: "Receita (USD)", type: "number", value: "", colSpan: 4 },
        { internalName: "profit", label: "Lucro (USD)", type: "number", value: "", colSpan: 4 },

        { internalName: "ratingAvg", label: "Avaliação Média (%)", type: "number", value: "", colSpan: 6 },

        { internalName: "status", label: "Status", type: "choice", required: true, options: ["DRAFT", "PUBLISHED"], value: "", colSpan: 6 },
        { internalName: "visibility", label: "Visibilidade", type: "choice", required: true, options: ["PRIVATE", "PUBLIC"], value: "", colSpan: 6 },
    ];

    const [filters, setFilters] = useState(buildInitialValues(fieldsSearch));
    const [openModal, setOpenModal] = useState(false);

    const [movieData, setMovieData] = useState(buildInitialValues(fieldsCreateMovie));
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <section className="w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-end md:gap-3">
            <div className="w-full md:w-[520px] md:flex-shrink-0">
                <Input
                    name="search"
                    placeholder="Pesquise por filmes"
                    label=""
                    value={filters.search}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, search: e.target.value }))
                    }
                    onClear={() => setFilters((prev) => ({ ...prev, search: "" }))}
                    icon={<Search className="w-5 h-5" />}
                    type="text"
                />
            </div>

            <div className="flex w-full md:w-auto gap-2 md:gap-3 md:items-center">
                <Button
                    variant="secondary"
                    className="w-[40%] md:w-auto h-[48px] flex items-center justify-center"
                    onClick={() => setOpenModal(true)}
                >
                    Filtros
                </Button>
                <Button
                    variant="primary"
                    className="w-[60%] md:w-auto h-[48px] flex items-center justify-center"
                    onClick={() => setOpenDrawer(true)}
                >
                    Adicionar Filme
                </Button>
            </div>

            <Modal
                title="Filtros Avançados"
                open={openModal}
                onClose={() => setOpenModal(false)}
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setOpenModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary">Aplicar Filtros</Button>
                    </>
                }
            >
                <FormsFields fields={fieldsSearch} values={filters} setValues={setFilters} />
            </Modal>

            <Drawer
                title="Novo Filme"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setOpenDrawer(false)}>Cancelar</Button>
                        <Button variant="primary">Salvar</Button>
                    </>
                }
            >
                <FormsFields
                    fields={fieldsCreateMovie}
                    values={movieData}
                    setValues={setMovieData}
                />
            </Drawer>


        </section>
    );
}
