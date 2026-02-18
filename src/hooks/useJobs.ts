import { useState, useCallback } from 'react';
import { getCandidateByEmail, getJobs } from '../services/api';
import type { Candidate, Job } from '../types';

export function useJobs() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCandidateByEmail(email);
      setCandidate(data as Candidate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJobs();
      setJobs(data as Job[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    candidate,
    jobs,
    loading,
    error,
    fetchCandidate,
    fetchJobs
  };
}