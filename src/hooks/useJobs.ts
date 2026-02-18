import { useState, useCallback } from 'react';
import { getCandidateByEmail, getJobs, applyToJob } from '../services/api';
import type { Candidate, Job } from '../types';

export function useJobs() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const fetchCandidate = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCandidateByEmail(email);
      setCandidate(data as Candidate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
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
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const submitApplication = useCallback(async (jobId: string, repoUrl: string) => {
    if (!candidate) {
      throw new Error('No candidate data available');
    }

    setSubmittingId(jobId);
    try {
      const result = await applyToJob({
        uuid: candidate.uuid,
        jobId,
        candidateId: candidate.candidateId,
        repoUrl,
      });
      return result;
    } finally {
      setSubmittingId(null);
    }
  }, [candidate]);

  return {
    candidate,
    jobs,
    loading,
    error,
    submittingId,
    fetchCandidate,
    fetchJobs,
    submitApplication
  };
}