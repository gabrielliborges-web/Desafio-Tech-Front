import Input from "../common/Input";
import Button from "../common/Button";
import { Search } from "lucide-react";

export default function MovieActions() {
    return (
        <section className="w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-end md:gap-4">
            <div className="w-full md:w-[520px]">
                <Input placeholder="Pesquise por filmes" label="" required={false} icon={<Search className="w-5 h-5" />} />
            </div>

            <div className="flex w-full md:w-auto gap-3">
                <Button variant="secondary" className="w-1/2 md:w-auto">
                    Filtros
                </Button>
                <Button variant="primary" className="w-1/2 md:w-auto">
                    Adicionar Filme
                </Button>
            </div>
        </section>
    );
}
