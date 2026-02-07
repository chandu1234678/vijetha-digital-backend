import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { createPayment } from '../api/payments';

export const useRazorpay = () => {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const handlePayment = useCallback(async (orderId, onSuccess) => {
    setLoading(true);

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      const orderData = await createPayment(orderId);

      const options = {
        key: orderData.key,
        amount: orderData.amount * 100, // Amount in paise
        currency: orderData.currency,
        name: 'PrintFlow',
        description: `Order #${orderData.order_id}`,
        order_id: orderData.razorpay_order_id,
        handler: function (response) {
          toast.success('Payment successful!');
          if (onSuccess) onSuccess(response);
        },
        prefill: {
          name: '', // We could prefill user details if available
          email: '',
          contact: '',
        },
        theme: {
          color: '#4F46E5', // Indigo-600
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || 'Payment initialization failed');
    } finally {
      setLoading(false);
    }
  }, [loadRazorpayScript]);

  return { handlePayment, loading };
};
