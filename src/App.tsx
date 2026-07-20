import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './i18n';
import { Footer, Nav } from './components';
import { HomePage } from './Home';
import { AestheticPage, ClinicPage, ConsultationPage, ContactPage, MethodPage, PricingPage, SurgeryPage } from './Pages';
import './index.css';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }), [pathname]);
  return null;
}

function App() {
  return <LanguageProvider><BrowserRouter><ScrollTop /><Nav /><main>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chirurgia-plastyczna" element={<SurgeryPage />} />
      <Route path="/medycyna-estetyczna" element={<AestheticPage />} />
      <Route path="/metoda" element={<MethodPage />} />
      <Route path="/klinika" element={<ClinicPage />} />
      <Route path="/konsultacja" element={<ConsultationPage />} />
      <Route path="/cennik" element={<PricingPage />} />
      <Route path="/kontakt" element={<ContactPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  </main><Footer /></BrowserRouter></LanguageProvider>;
}

export default App;
