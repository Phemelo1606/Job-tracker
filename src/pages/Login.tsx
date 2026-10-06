import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import "../components/Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth">
      <form className="auth--card" onSubmit={handleSubmit}>
        <p className="label">Welcome back</p>
        <h1 className="auth--title">Login</h1>

        {error && (
          <p className="auth--error" role="alert">
            {error}
          </p>
        )}

        <label className="auth--label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="auth--input"
          type="email"
          autoComplete="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="auth--label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="auth--input"
          type="password"
          autoComplete="current-password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="auth--footer">
          <Link className="auth--link" to="/register">
            Register
          </Link>
          <button className="auth--submit" type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </div>
      </form>
    </main>
  );
}