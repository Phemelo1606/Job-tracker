import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../Buttons/Button";
import { useAuth } from "../../context/AuthContext";

export default function HomeNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="appnav">
      <div className="appnav--brandrow">
        <Link to="/home" className="appnav--logo" onClick={closeMenu}>
          Job Tracker
        </Link>

        <div className="appnav--utility">
          <span className="appnav--user">{user?.name}</span>

          <button
            type="button"
            className="appnav--toggle"
            aria-label="Toggle navigation"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="appnav--backdrop"
          aria-label="Close navigation"
          onClick={closeMenu}
        />
      )}

      <nav
        id="primary-navigation"
        className={`appnav--menu ${menuOpen ? "appnav--menu-open" : ""}`}
      >
        <div className="appnav--menu-heading">
          <span>Navigation</span>
          <button type="button" className="appnav--close" onClick={closeMenu}>
            Close
          </button>
        </div>
        <div className="appnav--left">
          <Button to="/home" onClick={closeMenu}>Home</Button>
          <Button to="/jobs/new" variant="outline" onClick={closeMenu}>
            Add Job
          </Button>
        </div>

        <div className="appnav--right">
          <span className="appnav--user">{user?.name}</span>
          <button className="appnav--logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>
    </header>
  );
}