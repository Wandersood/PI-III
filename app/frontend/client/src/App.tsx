import Portfolio from "./ui/portfolio/pages/Portfolio/Portfolio";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./components/Shared/BootstrapCustomTheme.scss";
import { UserForm } from "./ui/app/forms/NewClient/pages/UserForm";
import CRUD from "./ui/app/tables/ClientCRUD/pages/CRUD";
import Agenda from "./ui/app/calendar/Calendar";
import { NewAppointmentForm } from "./ui/app/forms/Appointments/NewApointment/pages/NewApointment";
import { EditAppointmentForm } from "./ui/app/forms/Appointments/EditAppointment/pages/EditAppointment";
import { DeleteAppointmentForm } from "./ui/app/forms/Appointments/DeleteAppointment/pages/DeleteAppointment";
import FinancialDashboard from "./ui/app/dashboards/Financial/FinancialDashboard";
import OutgoingForm from "./ui/app/forms/Financials/pages/OutgoingForm";
import NotFound from "./ui/404/NotFound";
import RevenueForm from "./ui/app/forms/Financials/pages/RevenueForm";
import GalleryDashboard from "./ui/app/dashboards/Gallery/GalleryDashboard";
import Galeria from "./ui/portfolio/components/Gallery/Galeria";
import GalleryForm from "./ui/app/forms/Galleries/pages/GalleryForm";
import GalleryView from "./ui/app/gallery/pages/GalleryView/GalleryView";
import FolderView from "./ui/app/gallery/pages/FolderView/FolderView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/galeria" element={<Galeria />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/app/clientes" element={<CRUD />} />
        <Route path="/app/novo-cliente" element={<UserForm />} />
        <Route path="/app/editar-cliente/:id" element={<UserForm />} />

        <Route path="/app/agenda" element={<Agenda />} />
        <Route path="/app/novo-compromisso" element={<NewAppointmentForm />} />
        <Route
          path="/app/editar-compromisso"
          element={<EditAppointmentForm />}
        />
        <Route
          path="/app/excluir-compromisso"
          element={<DeleteAppointmentForm />}
        />

        <Route path="/app/financeiro" element={<FinancialDashboard />} />
        <Route path="/app/nova-despesa" element={<OutgoingForm />} />
        <Route path="/app/nova-receita" element={<RevenueForm />} />

        <Route path="/app/galerias" element={<GalleryDashboard />} />
        <Route path="/app/nova-galeria" element={<GalleryForm />} />
        <Route path="app/galerias/:id" element={<GalleryView />} />
        <Route path="app/galerias/:id/pastas/:pastaId" element={<FolderView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
