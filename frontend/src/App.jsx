import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

const App = () => (
  <Routes>
    {/* Public */}
    <Route path="/login" element={<Login />} />

    {/* Customer */}
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
    </Route>

    {/* Admin */}
    <Route element={<AdminRoute />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default App;
