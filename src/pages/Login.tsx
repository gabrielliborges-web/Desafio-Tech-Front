import { useState } from "react";
import FormsFields, {
    buildInitialValues,
    type Field,
} from "../components/common/FormsFields";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

export default function Login() {
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

    const [loginData, setLoginData] = useState(buildInitialValues(fieldsLogin));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login:", loginData);
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-[#232225]/80 p-6 rounded-md w-full max-w-md flex flex-col gap-4"
            >
                <FormsFields
                    fields={fieldsLogin}
                    values={loginData}
                    setValues={setLoginData}
                />

                <div className="flex items-center justify-between gap-3 mt-2">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline"
                    >
                        Esqueci minha senha
                    </Link>

                    <Button
                        variant="primary"
                        className="self-end w-[120px] h-[40px]"
                    >
                        Entrar
                    </Button>
                </div>
            </form>
        </div>
    );
}
