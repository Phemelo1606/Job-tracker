import { useCallback, useEffect, useState } from "react";
import type { Job, NewJob, JobStatus } from "../types/jobs";
import * as api from "../api/jobs";
import { useAuth } from "../context/AuthContext";

export function useJobs() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    api
      .getJobs(user.id)
      .then(setJobs)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user]);

  const addJob = useCallback(async (job: NewJob) => {
    const created = await api.createJob(job);
    setJobs((prev) => [...prev, created]); // use the server's response (it has the id)
  }, []);

  const changeStatus = useCallback(async (id: number, status: JobStatus) => {
    const updated = await api.updateJobStatus(id, status);
    setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)));
  }, []);

  const removeJob = useCallback(async (id: number) => {
    await api.deleteJob(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  return { jobs, loading, error, addJob, changeStatus, removeJob };
}