import { useState, useEffect, useRef } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { Search } from "lucide-react";
import Modal from "../common/Modal";
import FormsFields, { buildInitialValues } from "../common/FormsFields";
import Drawer from "../common/Drawer";
import { fieldsCreateMovie, fieldsSearch } from "../../utils/fields";
import { useMoviesContext } from "../../context/MoviesContext";

export default function MovieActions() {
    const { setFilters, filters } = useMoviesContext();
    const [localFilters, setLocalFilters] = useState(filters);
    const [openModal, setOpenModal] = useState(false);
    const [movieData, setMovieData] = useState(buildInitialValues(fieldsCreateMovie));
    const [openDrawer, setOpenDrawer] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search ?? "");
    const lastSearch = useRef("");


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (
                (searchTerm.length >= 3 || searchTerm.length === 0) &&
                searchTerm !== lastSearch.current
            ) {
                setFilters({ ...filters, search: searchTerm });
                lastSearch.current = searchTerm;
            }
        }, 700);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const handleApplyFilters = () => {
        setFilters(localFilters);
        setOpenModal(false);
    };

    const handleClearFilters = () => {
        const emptyFilters = Object.keys(localFilters).reduce((acc, key) => {
            acc[key as keyof typeof localFilters] = undefined;
            return acc;
        }, {} as typeof localFilters);

        setLocalFilters(emptyFilters);
        setFilters({});
    };

    console.log(localFilters)

    const activeFilters = Object.values(localFilters).some(
        (v) => v !== "" && v !== null && v !== undefined)


    return (
        <section className="w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-end md:gap-3">
            <div className="w-full md:w-[520px] md:flex-shrink-0">
                <Input
                    name="search"
                    placeholder="Pesquise por filmes"
                    label=""
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClear={() => setSearchTerm("")}
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
                        <Button variant="primary" onClick={handleApplyFilters} disabled={!activeFilters}>
                            Aplicar Filtros
                        </Button>
                        {activeFilters && (
                            <Button
                                variant="primary"
                                className="text-sm text-red-400 hover:text-red-300"
                                onClick={handleClearFilters}
                            >
                                Limpar
                            </Button>
                        )}
                    </>
                }
            >
                <FormsFields
                    fields={fieldsSearch}
                    values={localFilters}
                    setValues={setLocalFilters}
                />
            </Modal>

            {/* 🔹 Drawer de criação */}
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
