import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { Search } from "lucide-react";
import { handleChangeInput } from "../../utils/handleChangeInput";
import Modal from "../common/Modal";

export default function MovieActions() {
    const [filters, setFilters] = useState({
        search: "",
    });

    const [open, setOpen] = useState(false);

    return (
        <section className="w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-end md:gap-3">
            <div className="w-full md:w-[520px] md:flex-shrink-0">
                <Input
                    name="search"
                    placeholder="Pesquise por filmes"
                    label=""
                    value={filters.search}
                    onChange={(e) => handleChangeInput(e, setFilters)}
                    onClear={() => setFilters((prev) => ({ ...prev, search: "" }))}
                    icon={<Search className="w-5 h-5" />}
                    type="text"
                />
            </div>

            <div className="flex w-full md:w-auto gap-2 md:gap-3 md:items-center">
                <Button
                    variant="secondary"
                    className="w-[40%] md:w-auto h-[48px] flex items-center justify-center"
                    onClick={() => setOpen(true)}
                >
                    Filtros
                </Button>
                <Button
                    variant="primary"
                    className="w-[60%] md:w-auto h-[48px] flex items-center justify-center"
                >
                    Adicionar Filme
                </Button>
            </div>

            <Modal
                title="Filtros"
                open={open}
                onClose={() => setOpen(false)}
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary">Aplicar Filtros</Button>
                    </>
                }
            >
                <div className="border border-red-600/40 rounded-md p-4 text-sm">
                    <p className="text-center mb-2 font-medium text-yellow-400">
                        ⚠️ Substitua essa seção pelos filtros ⚠️
                    </p>
                    <p className="mb-2">
                        Este espaço é designado para os filtros que podem ser definidos para
                        facilitar a pesquisa por um filme específico.
                    </p>
                    <p>
                        É importante ressaltar que o design do formulário deve estar em
                        harmonia com a identidade visual do restante do site.
                    </p>
                </div>
            </Modal>
        </section>
    );
}
