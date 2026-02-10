import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, redirectTo);
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-black text-white px-4 py-2 w-full">
          Login
        </button>
      </form>

      <div className="flex justify-between text-sm mt-4">
        <Link to="/forgot-password" className="underline">
          Forgot password?
        </Link>

        <Link to="/register" className="underline">
          Create one
        </Link>
      </div>
    </div>
  );
}
