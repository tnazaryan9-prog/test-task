import * as yup from "yup";

export const LOAN_AMOUNTS = [200, 300, 400, 500, 600, 700, 800, 900, 1000] as const;

export const applicationFormSchema = yup.object({
    phone: yup
        .string()
        .required("Phone is required")
        .matches(/^0\d{3}\s\d{3}\s\d{3}$/, "Use format 0XXX XXX XXX"),
    firstName: yup.string().required("First name is required").trim().min(1, "First name is required"),
    lastName: yup.string().required("Last name is required").trim().min(1, "Last name is required"),
    gender: yup.string().oneOf(["Male", "Female"], "Select a gender").required("Gender is required"),
    workplace: yup.string().required("Workplace is required").trim().min(1, "Workplace is required"),
    residentialAddress: yup
        .string()
        .required("Residential address is required")
        .trim()
        .min(1, "Residential address is required"),
    loanAmount: yup
        .number()
        .required("Loan amount is required")
        .oneOf([...LOAN_AMOUNTS], "Choose a valid loan amount"),
    loanTermDays: yup
        .number()
        .required("Loan term is required")
        .integer("Term must be a whole number of days")
        .min(10, "Minimum term is 10 days")
        .max(30, "Maximum term is 30 days"),
});

export type ApplicationFormValues = yup.InferType<typeof applicationFormSchema>;

export const applicationFormDefaultValues: ApplicationFormValues = {
    phone: "",
    firstName: "",
    lastName: "",
    gender: "" as ApplicationFormValues["gender"],
    workplace: "",
    residentialAddress: "",
    loanAmount: 200,
    loanTermDays: 10,
};
