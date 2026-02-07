import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { LayoutDashboard, ShoppingBag, Calculator, LogOut, User, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">PrintFlow</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {user.role === 'admin' ? (
                <>
                  <Link to="/admin/dashboard" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link to="/admin/orders" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Orders
                  </Link>
                  <Link to="/admin/materials" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Materials
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Calculator
                  </Link>
                  <Link to="/orders" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    My Orders
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user.role === 'customer' && (
              <Link to="/checkout" className="p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none relative">
                <ShoppingBag className="h-6 w-6" aria-hidden="true" />
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                    {items.length}
                  </span>
                )}
              </Link>
            )}

            <div className="ml-3 relative">
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500">{user.email}</span>
                <button
                  onClick={logout}
                  className="bg-white p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
             {user.role === 'admin' ? (
                <>
                  <Link to="/admin/dashboard" className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                    Dashboard
                  </Link>
                  <Link to="/admin/orders" className="border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                    Orders
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                    Calculator
                  </Link>
                  <Link to="/orders" className="border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                    My Orders
                  </Link>
                  <Link to="/checkout" className="border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                    Checkout ({items.length})
                  </Link>
                </>
              )}
          </div>
          <div className="pt-4 pb-4 border-t border-slate-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 rounded-full bg-slate-100 p-2" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-slate-800">{user.email}</div>
                <div className="text-sm font-medium text-slate-500">{user.role}</div>
              </div>
              <button
                onClick={logout}
                className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
