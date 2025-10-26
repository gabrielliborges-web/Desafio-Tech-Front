import Input from "../common/Input";
import { handleChangeInput } from "../../utils/handleChangeInput";
import Select from "./Select";

export interface Field {
    internalName: string;
    label?: string;
    type:
    | "Text"
    | "Password"
    | "Number"
    | "Choice"
    | "DateTime" | "date"
    | "User"
    | "UserMulti";
    value?: string | number | Date | string[];
    options?: string[];
    required?: boolean;
    colSpan?: 3 | 4 | 6 | 12;
}

export function buildInitialValues(fields: Field[]) {
    return fields.reduce((acc, field) => {
        acc[field.internalName] = field.value ?? "";
        return acc;
    }, {} as Record<string, any>);
}

interface FormsFieldsProps<T extends Record<string, any>> {
    fields: Field[];
    values: T;
    setValues: React.Dispatch<React.SetStateAction<T>>;
}

const colMap: Record<NonNullable<Field["colSpan"]>, string> = {
    3: "md:col-span-3",
    4: "md:col-span-4",
    6: "md:col-span-6",
    12: "md:col-span-12",
};

export default function FormsFields<T extends Record<string, any>>({
    fields,
    values,
    setValues,
}: FormsFieldsProps<T>) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {fields.map((field) => {
                const commonProps = {
                    name: field.internalName,
                    label: field.label,
                    required: field.required,
                    value: values[field.internalName],
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeInput(e, setValues),
                };

                const colSpan = field.colSpan ?? 12;
                const colClass = colMap[colSpan];

                switch (field.type) {
                    case "Text":
                        return (
                            <div key={field.internalName} className={`col-span-12 ${colClass}`}>
                                <Input {...commonProps} placeholder={field.label} />
                            </div>
                        );
                    case "Password":
                        return (
                            <div key={field.internalName} className={`col-span-12 ${colClass}`}>
                                <Input
                                    {...commonProps}
                                    type="password"
                                    placeholder={field.label}
                                />
                            </div>
                        );


                    case "Number":
                        return (
                            <div key={field.internalName} className={`col-span-12 ${colClass}`}>
                                <Input {...commonProps} type="number" placeholder={field.label} />
                            </div>
                        );

                    case "DateTime":
                    case "date":
                        return (
                            <div key={field.internalName} className={`col-span-12 ${colClass}`}>
                                <Input {...commonProps} type="date" />
                            </div>
                        );

                    case "Choice":
                        return (
                            <div key={field.internalName} className={`col-span-12 ${colClass}`}>
                                <Select
                                    name={field.internalName}
                                    label={field.label}
                                    options={field.options?.map((opt) => ({ label: opt, value: opt })) ?? []}
                                    value={values[field.internalName] ?? ""}
                                    onChange={(value: string) =>
                                        setValues((prev) => ({ ...prev, [field.internalName]: value }))
                                    }
                                />
                            </div>
                        );
                    case "User":
                        return (
                            <div key={field.internalName} className={`col-span-12 ${colClass}`}>
                                <UserField
                                    label={field.label}
                                    value={values[field.internalName] ?? { name: "", image: "" }}
                                    onChange={(val) =>
                                        setValues((prev) => ({ ...prev, [field.internalName]: val }))
                                    }
                                />
                            </div>
                        );

                    case "UserMulti":
                        return (
                            <div key={field.internalName} className={`col-span-12 ${colClass}`}>
                                <UserMultiField
                                    label={field.label}
                                    value={Array.isArray(values[field.internalName]) ? values[field.internalName] : []}
                                    onChange={(val) =>
                                        setValues((prev) => ({ ...prev, [field.internalName]: val }))
                                    }
                                />
                            </div>
                        );


                    default:
                        return null;
                }
            })}
        </div>
    );
}

function UserField({
    value = { name: "", image: "" },
    onChange,
    label,
}: {
    label?: string;
    value?: { name: string; image: string };
    onChange: (val: { name: string; image: string }) => void;
}) {
    return (
        <div className="flex flex-col gap-2 p-3 border border-border-subtle/20 rounded-md bg-background-dark/10">
            {label && <label className="font-medium text-sm text-text-secondary-dark">{label}</label>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                    name="name"
                    label="Nome"
                    value={value.name}
                    onChange={(e) => onChange({ ...value, name: e.target.value })}
                />
                <Input
                    name="image"
                    label="Imagem (URL)"
                    value={value.image}
                    onChange={(e) => onChange({ ...value, image: e.target.value })}
                />
            </div>
        </div>
    );
}


function UserMultiField({
    label,
    value = [],
    onChange,
}: {
    label?: string;
    value?: { name: string; image?: string }[];
    onChange: (val: { name: string; image?: string }[]) => void;
}) {
    const addUser = () => onChange([...value, { name: "", image: "" }]);
    const removeUser = (index: number) =>
        onChange(value.filter((_, i) => i !== index));

    return (
        <div className="flex flex-col gap-2 p-3 border border-border-subtle/20 rounded-md bg-background-dark/10">
            {label && <label className="font-medium text-sm text-text-secondary-dark">{label}</label>}

            {value?.map((user, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
                    <Input
                        name={`name-${i}`}
                        label="Nome"
                        value={user.name}
                        onChange={(e) => {
                            const updated = [...value];
                            updated[i].name = e.target.value;
                            onChange(updated);
                        }}
                    />
                    <Input
                        name={`image-${i}`}
                        label="Imagem (URL)"
                        value={user.image}
                        onChange={(e) => {
                            const updated = [...value];
                            updated[i].image = e.target.value;
                            onChange(updated);
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => removeUser(i)}
                        className="absolute -top-3 -right-2 text-red-400 hover:text-red-600"
                    >
                        ×
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addUser}
                className="mt-2 text-sm text-blue-400 hover:text-blue-300"
            >
                + Adicionar
            </button>
        </div>
    );
}
