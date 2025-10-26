import { useState } from "react";
import FormsFields, {
    buildInitialValues,
    type Field,
} from "../components/common/FormsFields";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

export default function Signup() {

    const fieldsSignup: Field[] = [
        {
            internalName: "name",
            label: "Nome completo",
            type: "text",
            value: "",
            required: true,
            colSpan: 12,
        },
        {
            internalName: "email",
            label: "E-mail",
            type: "text",
            value: "",
            required: true,
            colSpan: 12,
        },
        {
            internalName: "password",
            label: "Senha",
            type: "text",
            value: "",
            required: true,
            colSpan: 12,
        },
        {
            internalName: "theme",
            label: "Tema Preferido",
            type: "choice",
            options: ["LIGHT", "DARK"],
            value: "",
            colSpan: 12,
        },
    ];

    const [signupData, setSignupData] = useState(buildInitialValues(fieldsSignup));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Cadastro:", signupData);
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-[#232225]/80 p-6 rounded-md w-full max-w-md flex flex-col gap-4"
            >
                <FormsFields
                    fields={fieldsSignup}
                    values={signupData}
                    setValues={setSignupData}
                />

                <div className="flex items-center justify-between gap-3 mt-2">
                    <Link
                        to="/login"
                        className="text-sm text-primary hover:underline"
                    >
                        Já tenho uma conta
                    </Link>

                    <Button
                        variant="primary"
                        className="w-[120px] h-[40px]"
                    >
                        Cadastrar
                    </Button>
                </div>
            </form>
        </div>
    );
}
