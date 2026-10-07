import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import "../components/Auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register({ name, email, password });
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth">
      <form className="auth--card" onSubmit={handleSubmit}>
        <p className="label">Get started</p>
        <h1 className="auth--title">Register</h1>

        {error && (
          <p className="auth--error" role="alert">
            {error}
          </p>
        )}

        <label className="auth--label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="auth--input"
          type="text"
          autoComplete="name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          autoComplete="new-password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <div className="auth--footer">
          <Link className="auth--link" to="/login">
            Log in
          </Link>
          <button className="auth--submit" type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create account"}
          </button>
        </div>
      </form>
    </main>
  );
}