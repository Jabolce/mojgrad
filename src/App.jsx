import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./components/admin/DashboardLayout";
import DashboardHomePage from "./pages/admin/DashboardHomePage";
import InstitutionsPage from "./pages/admin/InstitutionsPage";
import AddInstitutionPage from "./pages/admin/AddInstitutionPage";
import UsersPage from "./pages/admin/UsersPage";
import SettingsPage from "./pages/admin/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="institutions" element={<InstitutionsPage />} />
          <Route path="institutions/add" element={<AddInstitutionPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;