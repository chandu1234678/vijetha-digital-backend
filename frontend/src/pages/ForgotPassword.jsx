import { useState } from "react";
import { forgotPassword } from "../api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSent(true);
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

      {sent ? (
        <p className="text-green-600">
          If the email exists, a reset link was sent.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            className="border p-2 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="bg-black text-white px-4 py-2 w-full">
            Send reset link
          </button>
        </form>
      )}
    </div>
  );
}
