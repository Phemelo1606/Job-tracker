import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import HomeNavBar from "../components/navbar/navbar";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../hooks/useJobs";
import type { JobStatus } from "../types/jobs";
import "../components/Auth.css";
import "./AddJobs.css";

const STATUSES: JobStatus[] = ["Applied", "Interviewed", "Rejected"];

// Today as YYYY-MM-DD (the format <input type="date"> and your db use)
const today = () => new Date().toISOString().slice(0, 10);

export default function AddJobPage() {
  const { user } = useAuth();
  const { addJob } = useJobs();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [dateApplied, setDateApplied] = useState(today);
  const [status, setStatus] = useState<JobStatus>("Applied");
  const [duties, setDuties] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setSubmitting(true);
    try {
      await addJob({
        userId: user.id,
        company: company.trim(),
        position: position.trim(),
        dateApplied,
        status,
        duties: duties.trim(),
      });
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the job");
      setSubmitting(false);
    }
  };

  return (
    <>
      <HomeNavBar />
      <main className="addjob">
        <form className="auth--card addjob--card" onSubmit={handleSubmit}>
          <p className="label">New application</p>
          <h1 className="auth--title addjob--title">Add Job</h1>

          {error && (
            <p className="auth--error" role="alert">
              {error}
            </p>
          )}

          <label className="auth--label" htmlFor="company">
            Company name
          </label>
          <input
            id="company"
            className="auth--input"
            type="text"
            placeholder="Where did you apply?"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <label className="auth--label" htmlFor="position">
            Role
          </label>
          <input
            id="position"
            className="auth--input"
            type="text"
            placeholder="Job Title"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />

          <div className="addjob--row">
            <div className="addjob--field">
              <label className="auth--label" htmlFor="dateApplied">
                Date applied
              </label>
              <input
                id="dateApplied"
                className="auth--input"
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                required
              />
            </div>

            <div className="addjob--field">
              <label className="auth--label" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                className="auth--input"
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="auth--label" htmlFor="duties">
            Duties
          </label>
          <textarea
            id="duties"
            className="auth--input addjob--textarea"
            placeholder="What does the role involve?"
            value={duties}
            onChange={(e) => setDuties(e.target.value)}
            rows={5}
          />

          <div className="auth--footer">
            <Link className="auth--link" to="/home">
              Cancel
            </Link>
            <button className="auth--submit" type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Add job"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}