import { NavLink, Link, useNavigate } from "react-router";
import Button from "../Buttons/Button";
import { useAuth } from "../../context/AuthContext";

export default function HomeNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="appnav">
      <div className="appnav--left">
        <Link to="/home" className="appnav--logo">
          Job Tracker
        </Link>
        <Button to="/home">Home</Button>
        <Button to="/jobs/new" variant="outline">
          Add Job
        </Button>
      </div>

      <div className="appnav--right">
        <span className="appnav--user">{user?.name}</span>
        <button className="appnav--logout" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </header>
  );
}