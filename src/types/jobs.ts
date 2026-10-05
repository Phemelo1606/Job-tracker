export type JobStatus = "applied" | "interview" | "offer" | "rejected";

export interface Job {
    id: number;
    userId: number;
    company: string;
    position: string;
    status: JobStatus;
    dateApplied: string;
}

export type NewJob = Omit<Job, "id">;