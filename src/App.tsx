import { Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import JobDetails from "./pages/JobDetailsPage";
import AddJobPage from "./pages/JobForm";
import NotFound from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/new" element={<AddJobPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;