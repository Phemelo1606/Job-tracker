import Button from "../components/Buttons/Button";
import JobCard from "../components/JobCard/JobCard";
import type { JobStatus } from "../components/JobCard/JobCard";
import LandingPageNavBar from "../components/navbar/LandingPageNav";
import "../App.css";

type SampleJob = {
  id: number;
  companyName: string;
  role: string;
  status: JobStatus;
  dateApplied: string;
};

const sampleJobs: SampleJob[] = [
  { id: 1, companyName: "Company name", role: "Junior Software Developer", status: "Interviewed", dateApplied: "12 Sep 2026" },
  { id: 2, companyName: "Company name", role: "ICT Support Technician", status: "Applied", dateApplied: "03 Sep 2026" },
  { id: 3, companyName: "Company name", role: "Mobile App Developer", status: "Rejected", dateApplied: "21 Aug 2026" },
];

const features = [
  {
    title: "Track every application",
    text: "Save the company, role, date applied and duties, then edit or delete any entry.",
  },
  {
    title: "Search, filter and sort",
    text: "Find a job by company or role, filter by status, and sort by date applied.",
  },
  {
    title: "See status at a glance",
    text: "Yellow for applied, green for interviewed, red for rejected, with a count for each.",
  },
];

export default function LandingPage() {
  return (
    <div className="landing">
      <LandingPageNavBar />

      <main>
        <section className="hero">
          <div className="hero--copy">
            <p className="label">Your job search, organised</p>
            <h1 className="hero--title">
              Every application, all in <span className="accent">one</span> place.
            </h1>
            <p className="hero--text">
              Log each job you apply for, see what happened next, and never lose
              track of a reply again.
            </p>
            <div className="hero--actions">
              <Button to="/register" size="lg">
                Create an account
              </Button>
              <Button to="../pages/Login" variant="outline" size="lg">
                Log in
              </Button>
            </div>
          </div>

          <div className="hero--cards">
            {sampleJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </section>

        <section className="features">
          <p className="label">What you can do</p>
          <h2 className="section-title">Everything a job hunt needs.</h2>
          <div className="features--grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature">
                <h3 className="feature--title">{feature.title}</h3>
                <p className="feature--text">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <h2 className="cta--title">Start tracking your next application.</h2>
          <div className="cta--actions">
            <Button to="/register">Register</Button>
            <Button to="/login" variant="outline">
              Log in
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}