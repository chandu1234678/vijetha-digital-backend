import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../api/auth";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or expired reset link");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Both fields are required");
      return;
    }

    // ✅ CHECK MATCH FIRST (UX FIX)
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // ✅ LENGTH CHECK AFTER MATCH
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await resetPassword(token, password);
      alert("Password reset successful");
      navigate("/login");
    } catch {
      setError("Reset failed. Please try again.");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      <form onSubmit={submit} className="space-y-3">
        <input
          type="password"
          className="border p-2 w-full"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button className="bg-black text-white px-4 py-2 w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
}
