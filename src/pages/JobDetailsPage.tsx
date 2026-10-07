import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import HomeNavBar from "../components/navbar/navbar";
import { useJobs } from "../hooks/useJobs";
import type { Job, JobStatus, NewJob } from "../types/jobs";
import "../components/Auth.css";
import "./AddJobs.css";
import "./JobDetails.css";

const STATUSES: JobStatus[] = ["Applied", "Interviewed", "Rejected"];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const messageOf = (err: unknown, fallback: string) =>
  err instanceof Error ? err.message : fallback;

/* ---------- Edit form ---------- */

type EditFormProps = {
  job: Job;
  onSave: (changes: Partial<NewJob>) => Promise<void>;
  onCancel: () => void;
};

function EditForm({ job, onSave, onCancel }: EditFormProps) {
  // Start from the saved values
  const [company, setCompany] = useState(job.company);
  const [position, setPosition] = useState(job.position);
  const [dateApplied, setDateApplied] = useState(job.dateApplied);
  const [duties, setDuties] = useState(job.duties ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onSave({
        company: company.trim(),
        position: position.trim(),
        dateApplied,
        duties: duties.trim(),
      });
    } catch (err) {
      setError(messageOf(err, "Could not save changes"));
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="details--form">
      {error && (
        <p className="auth--error" role="alert">
          {error}
        </p>
      )}

      <label className="auth--label" htmlFor="edit-company">
        Company name
      </label>
      <input
        id="edit-company"
        className="auth--input"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <label className="auth--label" htmlFor="edit-position">
        Role
      </label>
      <input
        id="edit-position"
        className="auth--input"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />

      <label className="auth--label" htmlFor="edit-date">
        Date applied
      </label>
      <input
        id="edit-date"
        className="auth--input"
        type="date"
        value={dateApplied}
        onChange={(e) => setDateApplied(e.target.value)}
        required
      />

      <label className="auth--label" htmlFor="edit-duties">
        Duties
      </label>
      <textarea
        id="edit-duties"
        className="auth--input addjob--textarea"
        value={duties}
        onChange={(e) => setDuties(e.target.value)}
        rows={5}
      />

      <div className="details--actions">
        <button
          type="button"
          className="details--btn"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
        <button className="auth--submit" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}

/* ---------- Page ---------- */

export default function JobDetailsPage() {
  const { id } = useParams();
  const jobId = Number(id); // route params are always strings
  const navigate = useNavigate();
  const { jobs, loading, error, changeStatus, editJob, removeJob } = useJobs();

  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const job = jobs.find((j) => j.id === jobId);

  const handleStatusChange = async (status: JobStatus) => {
    if (!job) return;
    setActionError(null);
    setBusy(true);
    try {
      await changeStatus(job.id, status);
    } catch (err) {
      setActionError(messageOf(err, "Could not update the status"));
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async (changes: Partial<NewJob>) => {
    if (!job) return;
    await editJob(job.id, changes);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!job) return;
    const ok = window.confirm(
      `Delete "${job.position}" at ${job.company}? This can't be undone.`
    );
    if (!ok) return;

    setActionError(null);
    setBusy(true);
    try {
      await removeJob(job.id);
      navigate("/home"); // busy stays true; the page is about to unmount
    } catch (err) {
      setActionError(messageOf(err, "Could not delete the job"));
      setBusy(false);
    }
  };

  /* Loading / error / not found */
  let content;
  if (loading) {
    content = <p className="home--message">Loading...</p>;
  } else if (error) {
    content = (
      <p className="home--message" role="alert">
        {error}
      </p>
    );
  } else if (!job) {
    // While a delete is finishing, the job is already gone from the list
    content = busy ? null : (
      <div className="details--card">
        <h1 className="details--title">Job not found</h1>
        <p>It may have been deleted, or it isn't in your account.</p>
        <Link className="auth--link" to="/home">
          ← Back to jobs
        </Link>
      </div>
    );
  } else {
    content = (
      <div className="details--card">
        <Link className="auth--link" to="/home">
          ← Back to jobs
        </Link>

        {actionError && (
          <p className="auth--error details--error" role="alert">
            {actionError}
          </p>
        )}

        <div className="details--top">
          <span className="label">Application</span>
          <span className={`badge badge--${job.status.toLowerCase()}`}>
            {job.status}
          </span>
        </div>

        {editing ? (
          <EditForm
            job={job}
            onSave={handleSave}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <>
            <h1 className="details--title">{job.position}</h1>
            <p className="details--company">{job.company}</p>
            <p className="label">Applied · {formatDate(job.dateApplied)}</p>

            <h2 className="auth--label details--heading">Duties</h2>
            <p className="details--duties">
              {job.duties ? job.duties : "No duties added yet."}
            </p>
          </>
        )}

        <label className="auth--label details--heading" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          className="auth--input details--select"
          value={job.status}
          onChange={(e) => handleStatusChange(e.target.value as JobStatus)}
          disabled={busy}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {!editing && (
          <div className="details--actions">
            <button
              className="details--btn details--btn-danger"
              onClick={handleDelete}
              disabled={busy}
            >
              Delete
            </button>
            <button
              className="auth--submit"
              onClick={() => setEditing(true)}
              disabled={busy}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <HomeNavBar />
      <main className="details">{content}</main>
    </>
  );
}