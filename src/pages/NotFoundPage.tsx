import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <main className="auth" aria-live="polite">
      <section className="auth--card" style={{ textAlign: "center" }}>
        <p className="label">404</p>
        <h1 className="auth--title">Page not found</h1>
        <p style={{ marginBottom: "1rem", color: "#465d55" }}>
          The page you are looking for does not exist or has moved.
        </p>
        <Link to="/" className="auth--submit" style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}>
          Go home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
