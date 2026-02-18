import { useState, useCallback } from 'react';
import { getCandidateByEmail } from '../services/api';
import type { Candidate } from '../types';

export function useJobs() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
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

  return {
    candidate,
    loading,
    error,
    fetchCandidate
  };
}