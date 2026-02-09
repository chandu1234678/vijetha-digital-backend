// src/components/layout/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Brand */}
        <Link to="/" className="text-lg font-bold">
          Vijetha Digital
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/support">Support</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center space-x-3">
          <Link to="/cart">
            <Button variant="outline">Cart</Button>
          </Link>

          {!user ? (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <>
              {/* Admin shortcut */}
              {isAdmin && (
                <Link to="/admin/dashboard">
                  <Button variant="outline">Admin</Button>
                </Link>
              )}

              {/* Profile */}
              <span className="text-sm text-gray-700 hidden sm:block">
                {user.email}
              </span>

              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
