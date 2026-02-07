import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/orders';
import { useRazorpay } from '../hooks/useRazorpay';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items, clearCart, total } = useCart();
  const { handlePayment, loading } = useRazorpay();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zip: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      // 1. Create Order
      const order = await createOrder(items);
      toast.success("Order placed! Initiating payment...");

      // 2. Payment
      handlePayment(order.id, () => {
        clearCart();
        navigate('/orders');
      });

    } catch (error) {
      toast.error("Order failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4 h-fit">
            <h2 className="text-xl font-semibold text-slate-800">Order Summary</h2>
            <div className="divide-y divide-slate-200">
              {items.map((item, idx) => (
                <div key={idx} className="py-4 flex justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{item.material.toUpperCase()}</p>
                    <p className="text-sm text-slate-500">
                      {item.width_ft}' x {item.height_ft}' (Qty: {item.quantity})
                    </p>
                    {item.lamination && <span className="text-xs bg-slate-100 px-2 py-1 rounded mr-2">Lamination</span>}
                    {item.frame && <span className="text-xs bg-slate-100 px-2 py-1 rounded">Frame</span>}
                  </div>
                  <p className="font-medium text-indigo-600">₹{item.total_price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">Street Address</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">City</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">ZIP Code</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    value={address.zip}
                    onChange={(e) => setAddress({...address, zip: e.target.value})}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
