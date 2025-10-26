import { useState } from "react";
import FormsFields, {
    buildInitialValues,
    type Field,
} from "../components/common/FormsFields";
import Button from "../components/common/Button";

export default function Login() {
    const [isForgot, setIsForgot] = useState(false);

    const fieldsLogin: Field[] = [
        {
            internalName: "email",
            label: "Nome/E-mail",
            type: "Text",
            value: "",
            required: true,
            colSpan: 12,
        },
        {
            internalName: "password",
            label: "Senha",
            type: "Text",
            value: "",
            required: true,
            colSpan: 12,
        },
    ];

    const fieldsForgot: Field[] = [
        {
            internalName: "email",
            label: "E-mail",
            type: "Text",
            value: "",
            required: true,
            colSpan: 12,
        },
        {
            internalName: "code",
            label: "Código de Recuperação",
            type: "Text",
            value: "",
            required: true,
            colSpan: 12,
        },
    ];

    const activeFields = isForgot ? fieldsForgot : fieldsLogin;

    const [formData, setFormData] = useState(buildInitialValues(activeFields));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isForgot) {
            console.log("Recuperar senha:", formData);
        } else {
            console.log("Login:", formData);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-[#232225]/80 p-6 rounded-md w-full max-w-md flex flex-col gap-4"
            >
                <h2 className="text-center text-xl font-semibold mb-2">
                    {isForgot ? "Recuperar Senha" : "Login"}
                </h2>

                <FormsFields fields={activeFields} values={formData} setValues={setFormData} />

                <div className="flex items-center justify-between gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => setIsForgot((prev) => !prev)}
                        className="text-sm text-primary hover:underline"
                    >
                        {isForgot ? "Voltar ao login" : "Esqueci minha senha"}
                    </button>

                    <Button variant="primary" className="self-end w-[150] h-[40px]" >
                        {isForgot ? "Enviar Código" : "Entrar"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
