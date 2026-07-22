import { Route, Routes } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { categories, procedures } from "../content/site";
import CategoryPage from "../pages/CategoryPage";
import ConsultationPage from "../pages/ConsultationPage";
import ContactPage from "../pages/ContactPage";
import DoctorPage from "../pages/DoctorPage";
import FaqPage from "../pages/FaqPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import PricingPage from "../pages/PricingPage";
import ProcedurePage from "../pages/ProcedurePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path={categories.surgery.slug}
          element={<CategoryPage categoryId="surgery" />}
        />
        <Route
          path={categories.aesthetic.slug}
          element={<CategoryPage categoryId="aesthetic" />}
        />
        {procedures.map((procedure) => (
          <Route
            key={procedure.id}
            path={`${categories[procedure.category].slug}/${procedure.slug}`}
            element={<ProcedurePage procedureId={procedure.id} />}
          />
        ))}
        <Route path="lekarz" element={<DoctorPage />} />
        <Route path="konsultacja" element={<ConsultationPage />} />
        <Route path="cennik" element={<PricingPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="kontakt" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
