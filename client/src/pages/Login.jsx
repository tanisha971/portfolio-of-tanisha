
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import api from "../services/api";
import "../styles/portfolio-theme.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (apiError) {
      setError(
        apiError?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-theme-page relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-6">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="login-theme-grid pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="login-theme-orb login-theme-orb-one pointer-events-none absolute rounded-full blur-3xl"
      />

      <div
        aria-hidden="true"
        className="login-theme-orb login-theme-orb-two pointer-events-none absolute rounded-full blur-3xl"
      />

      {/* Back to portfolio */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="login-theme-back absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm sm:left-8 sm:top-8"
      >
        <ArrowLeft size={16} />
        Back to portfolio
      </button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="login-theme-card relative z-10 w-full max-w-md rounded-3xl p-7 sm:p-9"
      >
        {/* Header icon */}
        <div className="login-theme-icon-box mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
          <LockKeyhole size={25} strokeWidth={1.8} />
        </div>

        <p className="login-theme-eyebrow text-xs font-semibold uppercase tracking-[0.25em]">
          Welcome back
        </p>

        <h1 className="login-theme-title mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Admin Login
        </h1>

        <p className="login-theme-description mt-3 text-sm leading-6">
          Sign in with your admin account to manage your portfolio.
        </p>

        {/* Login form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="login-theme-label mb-2 block text-sm font-medium"
            >
              Email address
            </label>

            <div className="login-theme-input-wrap flex items-center gap-3 rounded-xl px-4">
              <Mail
                size={18}
                className="login-theme-input-icon shrink-0"
              />

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="login-theme-input w-full py-3.5 text-sm outline-none disabled:opacity-60"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="login-theme-label mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <div className="login-theme-input-wrap flex items-center gap-3 rounded-xl px-4">
              <LockKeyhole
                size={18}
                className="login-theme-input-icon shrink-0"
              />

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="login-theme-input w-full py-3.5 text-sm outline-none disabled:opacity-60"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              aria-live="polite"
              className="login-theme-error rounded-xl px-4 py-3 text-sm"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-theme-submit group flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="login-theme-spinner h-4 w-4 rounded-full border-2 border-current border-r-transparent" />
                Logging in...
              </>
            ) : (
              <>
                <span>Sign in</span>
                <ArrowLeft
                  size={17}
                  className="rotate-180 transition-transform duration-200 group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        {/* Security note */}
        <div className="login-theme-security mt-7 flex items-start gap-3 border-t pt-5">
          <ShieldCheck
            size={19}
            className="login-theme-security-icon mt-0.5 shrink-0"
          />

          <p className="text-xs leading-5">
            Restricted access. Please use your authorized administrator
            credentials.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
