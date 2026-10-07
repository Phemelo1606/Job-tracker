import Card from "./Card";
import type { JobStatus } from "../../types/jobs";
export type { JobStatus };



type JobCardProps = {
  companyName: string;
  role: string;
  status: JobStatus;
  dateApplied: string;
};

export default function JobCard({
  companyName,
  role,
  status,
  dateApplied,
}: JobCardProps) {
  return (
    <Card>
      <div className="card--top">
        <span className="label">{companyName}</span>
        <span className={`badge badge--${status.toLowerCase()}`}>{status}</span>
      </div>
      <h3 className="card--title">{role}</h3>
      <p className="label">Applied · {dateApplied}</p>
    </Card>
  );
}