import type { ReactNode } from "react";

type FormFieldProps = {
    id: string;
    label: string;
    error?: string;
    children: ReactNode;
};

export function FormField({ id, label, error, children }: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium text-secondary">
                {label}
            </label>
            {children}
            {error ? (
                <p className="text-sm text-error-primary" role="alert">
                    {error}
                </p>
            ) : null}
        </div>
    );
}
