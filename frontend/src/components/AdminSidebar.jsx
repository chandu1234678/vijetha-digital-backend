import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded ${
    isActive ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-200"
  }`;

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>
        <NavLink to="/admin/materials" className={linkClass}>
          Materials
        </NavLink>
        <NavLink to="/admin/extras" className={linkClass}>
          Extras
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
