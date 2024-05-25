import Portfolio from "./ui/portfolio/pages/Portfolio/Portfolio";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

import {
  UserAuthProvider,
  AdminAuthProvider,
} from "./contexts/auth/UserAuthenticationContext";

import Login from "./ui/auth/Login/Login";
import { useEffect, useState } from "react";
import { getAuthStateFromIndexedDB } from "./indexedDB";

function ProtectedRoute({ element, userType }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const authState = await getAuthStateFromIndexedDB();
        setIsLoggedIn(authState.isLoggedIn);
      } catch (error) {
        console.error("Error fetching auth state", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthState();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? element : <Navigate to="/auth/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <UserAuthProvider>
        <AdminAuthProvider>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/galeria" element={<Galeria />} />

            <Route path="*" element={<NotFound />} />

            <Route path="/auth/login" element={<Login />} />
            <Route
              path="/app/clientes"
              element={<ProtectedRoute element={<CRUD />} userType="admin" />}
            />
            <Route
              path="/app/novo-cliente"
              element={
                <ProtectedRoute element={<UserForm />} userType="admin" />
              }
            />
            <Route
              path="/app/editar-cliente/:id"
              element={
                <ProtectedRoute element={<UserForm />} userType="admin" />
              }
            />

            <Route
              path="/app/agenda"
              element={<ProtectedRoute element={<Agenda />} userType="admin" />}
            />
            <Route
              path="/app/novo-compromisso"
              element={
                <ProtectedRoute
                  element={<NewAppointmentForm />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/editar-compromisso"
              element={
                <ProtectedRoute
                  element={<EditAppointmentForm />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/excluir-compromisso"
              element={
                <ProtectedRoute
                  element={<DeleteAppointmentForm />}
                  userType="admin"
                />
              }
            />

            <Route
              path="/app/financeiro"
              element={
                <ProtectedRoute
                  element={<FinancialDashboard />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/nova-despesa"
              element={
                <ProtectedRoute element={<OutgoingForm />} userType="admin" />
              }
            />
            <Route
              path="/app/nova-receita"
              element={
                <ProtectedRoute element={<RevenueForm />} userType="admin" />
              }
            />

            <Route
              path="/app/galerias"
              element={
                <ProtectedRoute
                  element={<GalleryDashboard />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/nova-galeria"
              element={
                <ProtectedRoute element={<GalleryForm />} userType="admin" />
              }
            />
            <Route
              path="/app/galerias/:id"
              element={
                <ProtectedRoute element={<GalleryView />} userType="admin" />
              }
            />
            <Route
              path="/app/galerias/:id/pastas/:pastaId"
              element={
                <ProtectedRoute element={<FolderView />} userType="admin" />
              }
            />
          </Routes>
        </AdminAuthProvider>
      </UserAuthProvider>
    </BrowserRouter>
  );
}

export default App;
