import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { ApplicationFormValues } from "@/application-form/schema";
import { addDummyProduct } from "@/api/dummyjsonProducts";
import { FormField } from "@/components/application/FormField";
import { nativeRangeClassName } from "@/components/application/formPrimitives";
import { SuccessModal } from "@/components/application/SuccessModal";
import { Button } from "@/components/base/buttons/button";

export function LoanParametersPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useFormContext<ApplicationFormValues>();

    const [approvalModal, setApprovalModal] = useState<{
        firstName: string;
        lastName: string;
        loanAmount: number;
        loanTermDays: number;
    } | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const loanAmount = watch("loanAmount");
    const loanTermDays = watch("loanTermDays");

    function goBack() {
        navigate("/address-workplace");
    }

    const onValid = async (data: ApplicationFormValues) => {
        setSubmitError(null);
        try {
            const title = `${data.firstName} ${data.lastName}`.trim();
            await addDummyProduct({ title });
            setApprovalModal({
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                loanAmount: data.loanAmount,
                loanTermDays: data.loanTermDays,
            });
        } catch {
            setSubmitError("Something went wrong while submitting. Please try again.");
        }
    };

    const onInvalid = (errs: Partial<Record<keyof ApplicationFormValues, { message?: string }>>) => {
        const step1: (keyof ApplicationFormValues)[] = ["phone", "firstName", "lastName", "gender"];
        const step2: (keyof ApplicationFormValues)[] = ["workplace", "residentialAddress"];
        if (step1.some((k) => errs[k])) {
            navigate("/personal-information");
            return;
        }
        if (step2.some((k) => errs[k])) {
            navigate("/address-workplace");
        }
    };

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">Loan Parameters</h1>
            <p className="mt-2 text-md text-tertiary">Choose the loan amount and repayment term.</p>

            <form className="mt-8 flex flex-col gap-8" onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
                <FormField id="loanAmount" label="Loan amount" error={errors.loanAmount?.message}>
                    <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm text-tertiary" aria-live="polite">
                            Selected:{" "}
                            <span className="font-semibold text-secondary">${loanAmount}</span>
                        </span>
                    </div>
                    <input
                        id="loanAmount"
                        type="range"
                        min={200}
                        max={1000}
                        step={100}
                        className={nativeRangeClassName}
                        {...register("loanAmount", { valueAsNumber: true })}
                    />
                    <div className="flex justify-between text-xs text-quaternary">
                        <span>$200</span>
                        <span>$1000</span>
                    </div>
                </FormField>

                <FormField id="loanTermDays" label="Loan term (days)" error={errors.loanTermDays?.message}>
                    <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm text-tertiary" aria-live="polite">
                            Selected:{" "}
                            <span className="font-semibold text-secondary">
                                {loanTermDays} {loanTermDays === 1 ? "day" : "days"}
                            </span>
                        </span>
                    </div>
                    <input
                        id="loanTermDays"
                        type="range"
                        min={10}
                        max={30}
                        step={1}
                        className={nativeRangeClassName}
                        {...register("loanTermDays", { valueAsNumber: true })}
                    />
                    <div className="flex justify-between text-xs text-quaternary">
                        <span>10 days</span>
                        <span>30 days</span>
                    </div>
                </FormField>

                {submitError ? (
                    <p className="text-sm text-error-primary" role="alert">
                        {submitError}
                    </p>
                ) : null}

                <div className="flex flex-wrap justify-end gap-3">
                    <Button type="button" color="secondary" onClick={goBack} isDisabled={isSubmitting}>
                        Back
                    </Button>
                    <Button type="submit" color="primary" isLoading={isSubmitting}>
                        Submit Application
                    </Button>
                </div>
            </form>

            {approvalModal ? (
                <SuccessModal
                    firstName={approvalModal.firstName}
                    lastName={approvalModal.lastName}
                    loanAmount={approvalModal.loanAmount}
                    loanTermDays={approvalModal.loanTermDays}
                    onClose={() => setApprovalModal(null)}
                />
            ) : null}
        </div>
    );
}
