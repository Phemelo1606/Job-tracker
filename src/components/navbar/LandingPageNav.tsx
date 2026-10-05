import { Link } from "react-router";
import Button from "../Buttons/Button";
import "../components.css";

export default function LandingPageNavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar--brand">
        Job Tracker
      </Link>
      <nav className="navbar--actions" aria-label="Account">
        <Button to="/login" variant="outline">
          Log in
        </Button>
        <Button to="/register">Register</Button>
      </nav>
    </header>
  );
}