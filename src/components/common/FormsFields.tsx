import Input from "../common/Input";
import { handleChangeInput } from "../../utils/handleChangeInput";
import Select from "./Select";

export interface Field {
    internalName: string;
    label?: string;
    type:
    | "Text"
    | "Number"
    | "Choice"
    | "DateTime" | "date";
    value?: string | number | Date;
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

                    default:
                        return null;
                }
            })}
        </div>
    );
}
