// src/hooks/useRazorpay.js
import { useEffect } from "react";

export default function useRazorpay() {
  useEffect(() => {
    if (window.Razorpay) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
}
