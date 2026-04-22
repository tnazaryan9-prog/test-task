import { useEffect } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/base/buttons/button";

type SuccessModalProps = {
    firstName: string;
    lastName: string;
    loanAmount: number;
    loanTermDays: number;
    onClose: () => void;
};

export function SuccessModal({ firstName, lastName, loanAmount, loanTermDays, onClose }: SuccessModalProps) {
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    const message = `Congratulations, ${lastName} ${firstName}. Your loan of $${loanAmount} for ${loanTermDays} days has been approved.`;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <button
                type="button"
                className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
                aria-label="Close dialog backdrop"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="success-modal-title"
                className="relative z-10 w-full max-w-md rounded-xl border border-secondary bg-primary p-6 shadow-xl"
            >
                <p id="success-modal-title" className="text-md leading-relaxed text-secondary">
                    {message}
                </p>
                <div className="mt-6 flex justify-end">
                    <Button type="button" color="primary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
