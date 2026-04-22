import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { ApplicationFormValues } from "@/application-form/schema";
import { formatPhoneMask } from "@/application-form/formatPhone";
import { FormField } from "@/components/application/FormField";
import { nativeControlClassName } from "@/components/application/formPrimitives";
import { Button } from "@/components/base/buttons/button";

const step1Fields: (keyof ApplicationFormValues)[] = ["phone", "firstName", "lastName", "gender"];

export function PersonalInformationPage() {
    const navigate = useNavigate();
    const {
        control,
        register,
        trigger,
        formState: { errors },
    } = useFormContext<ApplicationFormValues>();

    async function goNext() {
        const ok = await trigger(step1Fields, { shouldFocus: true });
        if (ok) {
            navigate("/address-workplace");
        }
    }

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">Personal Information</h1>
            <p className="mt-2 text-md text-tertiary">Enter your contact details and identification for this application.</p>

            <div className="mt-8 flex flex-col gap-5">
                <FormField id="phone" label="Phone" error={errors.phone?.message}>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="phone"
                                type="tel"
                                inputMode="numeric"
                                autoComplete="tel"
                                placeholder="0XXX XXX XXX"
                                className={nativeControlClassName}
                                onChange={(e) => field.onChange(formatPhoneMask(e.target.value))}
                            />
                        )}
                    />
                </FormField>

                <FormField id="firstName" label="First name" error={errors.firstName?.message}>
                    <input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        className={nativeControlClassName}
                        {...register("firstName")}
                    />
                </FormField>

                <FormField id="lastName" label="Last name" error={errors.lastName?.message}>
                    <input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        className={nativeControlClassName}
                        {...register("lastName")}
                    />
                </FormField>

                <FormField id="gender" label="Gender" error={errors.gender?.message}>
                    <select id="gender" className={nativeControlClassName} {...register("gender")}>
                        <option value="" disabled>
                            Select gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </FormField>
            </div>

            <div className="mt-8 flex justify-end">
                <Button type="button" color="primary" onClick={goNext}>
                    Next
                </Button>
            </div>
        </div>
    );
}
