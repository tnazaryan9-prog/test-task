import { yupResolver } from "@hookform/resolvers/yup";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { applicationFormDefaultValues, applicationFormSchema, type ApplicationFormValues } from "@/application-form/schema";

export function ApplicationFormProvider({ children }: { children: ReactNode }) {
    const methods = useForm<ApplicationFormValues>({
        resolver: yupResolver(applicationFormSchema),
        defaultValues: applicationFormDefaultValues,
        mode: "onSubmit",
        shouldUnregister: false,
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
}
