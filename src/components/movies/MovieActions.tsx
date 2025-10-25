import Input from "../common/Input";
import Button from "../common/Button";
import { Search } from "lucide-react";

export default function MovieActions() {
    return (
        <section className="w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-end md:gap-3">
            <div className="w-full md:w-[520px] md:flex-shrink-0">
                <Input
                    placeholder="Pesquise por filmes"
                    label=""
                    icon={<Search className="w-5 h-5" />}
                />
            </div>

            <div className="flex w-full md:w-auto gap-2 md:gap-3 md:items-center">
                <Button
                    variant="secondary"
                    className="w-[40%] md:w-auto h-[48px] flex items-center justify-center"
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
        </section>
    );
}
