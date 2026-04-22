import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import { ApplicationFormProvider } from "@/application-form/ApplicationFormProvider";
import { AddressAndWorkplacePage } from "@/pages/AddressAndWorkplacePage";
import { LoanParametersPage } from "@/pages/LoanParametersPage";
import { PersonalInformationPage } from "@/pages/PersonalInformationPage";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
        "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
        isActive ? "bg-primary text-secondary shadow-xs-skeuomorphic ring-1 ring-primary ring-inset" : "text-tertiary hover:bg-primary_hover hover:text-tertiary_hover",
    ].join(" ");

export function App() {
    return (
        <div className="min-h-screen bg-secondary">
            <header className="border-b border-secondary bg-primary px-6 py-4">
                <nav className="mx-auto flex max-w-3xl flex-wrap gap-1" aria-label="Application steps">
                    <NavLink to="/personal-information" className={navLinkClass} end>
                        Personal Information
                    </NavLink>
                    <NavLink to="/address-workplace" className={navLinkClass} end>
                        Address and Workplace
                    </NavLink>
                    <NavLink to="/loan-parameters" className={navLinkClass} end>
                        Loan Parameters
                    </NavLink>
                </nav>
            </header>
            <main className="px-6 py-12">
                <ApplicationFormProvider>
                    <Routes>
                        <Route path="/" element={<Navigate to="/personal-information" replace />} />
                        <Route path="/personal-information" element={<PersonalInformationPage />} />
                        <Route path="/address-workplace" element={<AddressAndWorkplacePage />} />
                        <Route path="/loan-parameters" element={<LoanParametersPage />} />
                        <Route path="*" element={<Navigate to="/personal-information" replace />} />
                    </Routes>
                </ApplicationFormProvider>
            </main>
        </div>
    );
}
