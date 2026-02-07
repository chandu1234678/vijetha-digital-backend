import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { getMyOrders } from './api/orders';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-50 flex justify-center items-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Orders</h1>
         <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-slate-200">
             {orders.length === 0 ? (
                <li className="px-4 py-8 sm:px-6 text-slate-500 text-center">No orders found.</li>
            ) : (
                orders.map((order) => (
                  <li key={order.id}>
                    <div className="px-4 py-4 sm:px-6 hover:bg-slate-50 block">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            Order #{order.id}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'paid' ? 'bg-green-100 text-green-800' : 
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {order.status}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-slate-500">
                              Total: ₹{order.total_price.toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-slate-500 sm:mt-0">
                            <p>
                              Items: {order.items.length}
                            </p>
                          </div>
                        </div>
                    </div>
                  </li>
                ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Customer Routes */}
        <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<CustomerOrders />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
           <Route path="/admin/dashboard" element={<AdminDashboard />} />
           <Route path="/admin/orders" element={<AdminDashboard />} /> 
           <Route path="/admin/materials" element={<AdminDashboard />} /> 
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
