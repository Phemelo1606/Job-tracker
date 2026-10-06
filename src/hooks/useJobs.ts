import { useCallback, useEffect, useState } from "react";
import type { Job, NewJob, JobStatus } from "../types/jobs";
import * as api from "../api/jobs";
import { useAuth } from "../context/AuthContext"; // 1. NEW import

export function useJobs() {
  const { user } = useAuth(); // 2. NEW: read the logged-in user

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return; // 3. CHANGED: wait for a user
    api
      .getJobs(user.id) // 4. CHANGED: pass the user's id
      .then(setJobs)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user]); // 5. CHANGED: re-run when the user changes

  // addJob, changeStatus, removeJob stay exactly as they were
}