import { useMemo } from "react";
import Button from "../components/Buttons/Button";
import Card from "../components/JobCard/Card";
import JobCard from "../components/JobCard/JobCard";
import HomeNavBar from "../components/navbar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import { useJobs } from "../hooks/useJobs";
import type { JobStatus } from "../types/jobs";
import { Link, useSearchParams } from "react-router";
import "./HomePage.css";

type Filter = "All" | JobStatus;
type Sort = "newest" | "oldest";

const FILTERS: JobStatus[] = ["Applied", "Interviewed", "Rejected"];

const DEFAULT_FILTER: Filter = "All";
const DEFAULT_SORT: Sort = "newest";

// The label shown on each stat card's badge
const STATS: { status: JobStatus; badge: string }[] = [
  { status: "Applied", badge: "Waiting" },
  { status: "Interviewed", badge: "In Progress" },
  { status: "Rejected", badge: "Closed" },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function HomePage() {
  const { jobs, loading, error } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read state from the URL, validating so a hand-edited URL can't break the page
  const rawFilter = searchParams.get("filter");
  const filter: Filter =
    rawFilter && (FILTERS as string[]).includes(rawFilter)
      ? (rawFilter as JobStatus)
      : DEFAULT_FILTER;

  const rawSort = searchParams.get("sort");
  const sort: Sort = rawSort === "oldest" ? "oldest" : DEFAULT_SORT;

  const search = searchParams.get("search") ?? "";

  // Write one param, drop it from the URL when it equals the default,
  // and keep the other params intact
  const updateParam = (
    key: "search" | "filter" | "sort",
    value: string,
    defaultValue = "",
    replace = false
  ) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (!value || value === defaultValue) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace }
    );
  };

  const setFilter = (f: Filter) => updateParam("filter", f, DEFAULT_FILTER);
  const setSort = (s: Sort) => updateParam("sort", s, DEFAULT_SORT);
  // replace: true so typing doesn't add a history entry per keystroke
  const setSearch = (q: string) => updateParam("search", q, "", true);

  // Counts always come from ALL jobs, not the filtered list
  const counts = useMemo(
    () => ({
      Applied: jobs.filter((j) => j.status === "Applied").length,
      Interviewed: jobs.filter((j) => j.status === "Interviewed").length,
      Rejected: jobs.filter((j) => j.status === "Rejected").length,
    }),
    [jobs]
  );

  const visibleJobs = useMemo(() => {
    const term = search.trim().toLowerCase();
    return jobs
      .filter((j) => filter === "All" || j.status === filter)
      .filter(
        (j) =>
          !term ||
          j.company.toLowerCase().includes(term) ||
          j.position.toLowerCase().includes(term)
      )
      .sort((a, b) =>
        sort === "newest"
          ? b.dateApplied.localeCompare(a.dateApplied)
          : a.dateApplied.localeCompare(b.dateApplied)
      );
  }, [jobs, filter, search, sort]);

  return (
    <div className="home">
      <HomeNavBar />

      <main className="home--main">
        {/* Filters, search, sort */}
        <div className="home--toolbar">
          <div className="home--tabs">
            <button
              className={`tab ${filter === "All" ? "tab--active" : ""}`}
              onClick={() => setFilter("All")}
            >
              All {jobs.length}
            </button>
            {FILTERS.map((s) => (
              <button
                key={s}
                className={`tab ${filter === s ? "tab--active" : ""}`}
                onClick={() => setFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <SearchBar
            className="home--search"
            placeholder="Search company or role..."
            value={search}
            onChange={setSearch}
            ariaLabel="Search jobs"
          />

          <select
            className="home--sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort jobs"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Stat cards */}
        <section className="home--stats">
          {STATS.map(({ status, badge }) => (
            <Card key={status} className="stat">
              <span className="label">{status}</span>
              <p className="stat--count">{counts[status]}</p>
              <span className={`badge badge--${status.toLowerCase()}`}>
                {badge}
              </span>
            </Card>
          ))}
        </section>

        {/* Job list */}
        {loading && <p className="home--message">Loading your jobs...</p>}
        {error && (
          <p className="home--message" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && jobs.length === 0 && (
          <section className="home--empty">
            <h2 className="home--empty-title">No applications yet</h2>
            <p>Add your first job and it will show up here.</p>
            <Button to="/jobs/new">Add your first job</Button>
          </section>
        )}

        {!loading && jobs.length > 0 && visibleJobs.length === 0 && (
          <p className="home--message">No jobs match your search or filter.</p>
        )}

        {visibleJobs.length > 0 && (
          <section className="home--grid">
            {visibleJobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="home--cardlink"
              >
                <JobCard
                  companyName={job.company}
                  role={job.position}
                  status={job.status}
                  dateApplied={formatDate(job.dateApplied)}
                />
              </Link>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}