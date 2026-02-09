import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* Cart */}
          <Link to="/cart">
            <Button variant="outline">Cart</Button>
          </Link>

          {/* Not logged in */}
          {!user && (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}

          {/* Logged in */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              {/* Profile trigger */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center space-x-2 border rounded-md px-3 py-2 text-sm hover:bg-gray-100"
              >
                <div className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold">
                  {user.email[0].toUpperCase()}
                </div>
                <span className="hidden sm:block">
                  {user.email}
                </span>
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">

                  {/* User info */}
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium">
                      Signed in as
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1 text-sm">
                    {user.role === "customer" && (
                      <>
                        <Link
                          to="/orders"
                          onClick={() => setOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Orders
                        </Link>

                        <button
                          disabled
                          className="block w-full text-left px-4 py-2 text-gray-400 cursor-not-allowed"
                        >
                          Payments
                        </button>
                      </>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </div>

                  {/* Logout */}
                  <div className="border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
