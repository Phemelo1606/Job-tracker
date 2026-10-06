export type JobStatus = "Applied" | "Interviewed"  | "Rejected";

export interface Job {
    id: number;
    userId: number;
    company: string;
    position: string;
    status: JobStatus;
    dateApplied: string;
    duties: string;
}

export type NewJob = Omit<Job, "id">;