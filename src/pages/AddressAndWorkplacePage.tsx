import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { ApplicationFormValues } from "@/application-form/schema";
import { fetchProductCategoryList, formatProductCategoryLabel } from "@/api/dummyjsonProducts";
import { FormField } from "@/components/application/FormField";
import { nativeControlClassName } from "@/components/application/formPrimitives";
import { Button } from "@/components/base/buttons/button";

const step2Fields: (keyof ApplicationFormValues)[] = ["workplace", "residentialAddress"];

export function AddressAndWorkplacePage() {
    const navigate = useNavigate();
    const {
        register,
        trigger,
        formState: { errors },
    } = useFormContext<ApplicationFormValues>();

    const [categories, setCategories] = useState<string[]>([]);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetchProductCategoryList()
            .then((list) => {
                if (!cancelled) {
                    setCategories(list);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setCategoriesError("Workplace options could not be loaded. Please try again.");
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setCategoriesLoading(false);
                }
            });
        return () => {
            cancelled = true;
        };
    }, []);

    function goBack() {
        navigate("/personal-information");
    }

    async function goNext() {
        const ok = await trigger(step2Fields, { shouldFocus: true });
        if (ok) {
            navigate("/loan-parameters");
        }
    }

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">Address and Workplace</h1>
            <p className="mt-2 text-md text-tertiary">Provide your residential address and current employment information.</p>

            <div className="mt-8 flex flex-col gap-5">
                <FormField id="workplace" label="Workplace" error={errors.workplace?.message ?? categoriesError ?? undefined}>
                    <select
                        id="workplace"
                        className={nativeControlClassName}
                        disabled={categoriesLoading || categories.length === 0}
                        {...register("workplace")}
                    >
                        <option value="">
                            {categoriesLoading ? "Loading workplaces…" : categories.length === 0 ? "No options" : "Select workplace"}
                        </option>
                        {categories.map((slug) => (
                            <option key={slug} value={slug}>
                                {formatProductCategoryLabel(slug)}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField id="residentialAddress" label="Residential address" error={errors.residentialAddress?.message}>
                    <input
                        id="residentialAddress"
                        type="text"
                        autoComplete="street-address"
                        className={nativeControlClassName}
                        {...register("residentialAddress")}
                    />
                </FormField>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
                <Button type="button" color="secondary" onClick={goBack}>
                    Back
                </Button>
                <Button type="button" color="primary" onClick={goNext} isDisabled={categoriesLoading || Boolean(categoriesError)}>
                    Next
                </Button>
            </div>
        </div>
    );
}
