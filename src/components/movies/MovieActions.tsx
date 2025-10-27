import { useState, useEffect, useRef } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { Search } from "lucide-react";
import Modal from "../common/Modal";
import FormsFields, { buildInitialValues } from "../common/FormsFields";
import Drawer from "../common/Drawer";
import type { MovieFilters } from "../../types/movies";
import { fieldsCreateMovie, fieldsSearch } from "../../utils/fields";

interface MovieActionsProps {
    setFilters: (filters: MovieFilters) => void;
}

export default function MovieActions({ setFilters }: MovieActionsProps) {
    const [filters, setLocalFilters] = useState(buildInitialValues(fieldsSearch));
    const [openModal, setOpenModal] = useState(false);
    const [movieData, setMovieData] = useState(buildInitialValues(fieldsCreateMovie));
    const [openDrawer, setOpenDrawer] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // 🔹 Guarda o último valor aplicado para evitar loops
    const lastAppliedSearch = useRef("");

    const handleApplyFilters = () => {
        setFilters(filters);
        setOpenModal(false);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    // ✅ Debounce com controle para evitar loop
    useEffect(() => {
        const timeout = setTimeout(() => {
            // Só aplica se for diferente do último termo aplicado
            if (
                (searchTerm.length >= 3 || searchTerm.length === 0) &&
                searchTerm !== lastAppliedSearch.current
            ) {
                setFilters({ search: searchTerm });
                lastAppliedSearch.current = searchTerm; // salva o último valor aplicado
            }
        }, 700);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    return (
        <section className="w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-end md:gap-3">
            <div className="w-full md:w-[520px] md:flex-shrink-0">
                <Input
                    name="search"
                    placeholder="Pesquise por filmes"
                    label=""
                    value={searchTerm}
                    onChange={handleSearch}
                    icon={<Search className="w-5 h-5" />}
                    type="text"
                />
            </div>

            <div className="flex w-full md:w-auto gap-2 md:gap-3 md:items-center">
                <Button
                    variant="secondary"
                    className="w-[40%] md:w-auto h-[48px]"
                    onClick={() => setOpenModal(true)}
                >
                    Filtros
                </Button>
                <Button
                    variant="primary"
                    className="w-[60%] md:w-auto h-[48px]"
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
                        <Button variant="primary" onClick={handleApplyFilters}>
                            Aplicar Filtros
                        </Button>
                    </>
                }
            >
                <FormsFields fields={fieldsSearch} values={filters} setValues={setLocalFilters} />
            </Modal>

            <Drawer
                title="Novo Filme"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setOpenDrawer(false)}>
                            Cancelar
                        </Button>
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
