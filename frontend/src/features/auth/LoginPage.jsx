import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const [setupMode, setSetupMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const endpoint = setupMode ? "/auth/register" : "/auth/login";
      const response = await axios.post(endpoint, form);
      login(response.data.data);
      window.dispatchEvent(new Event("auth-change"));
      navigate(location.state?.from || "/", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to sign in. Check that the API is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-lg">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Pharmacy System</p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{setupMode ? "Set up the admin account" : "Sign in to your account"}</h1>
          <p className="mt-2 text-sm text-gray-600">
            {setupMode ? "The first account will be assigned the admin role." : "Enter your email and password to continue."}
          </p>
        </div>

        {setupMode && (
          <label className="block text-sm font-medium text-gray-700">
            Full name
            <input className="mt-1 w-full rounded-lg border p-3" autoComplete="name" required value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </label>
        )}

        <label className="block text-sm font-medium text-gray-700">
          Email address
          <input className="mt-1 w-full rounded-lg border p-3" type="email" autoComplete="username" required value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Password
          <input className="mt-1 w-full rounded-lg border p-3" type="password" autoComplete={setupMode ? "new-password" : "current-password"} required minLength={8} value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })} />
        </label>

        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <button className="w-full rounded-lg bg-emerald-700 p-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60" disabled={submitting}>
          {submitting ? "Please wait..." : setupMode ? "Create first admin" : "Sign in"}
        </button>
        <button type="button" className="w-full text-sm text-emerald-800 hover:underline" onClick={() => { setSetupMode(!setupMode); setError(""); }}>
          {setupMode ? "Already have an account? Sign in" : "Set up the first admin account"}
        </button>
      </form>
    </main>
  );
}
