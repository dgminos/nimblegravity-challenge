const baseUrl = import.meta.env.VITE_BASE_URL

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error: ${response.status}`);
  }
  return response.json();
};

export const getCandidateByEmail = async (email: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('getCandidateByEmail error:', error);
    throw new Error('Could not connect to server. Please try again later.');
  }
};

export const getJobs = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/jobs/get-list`);
    return handleResponse(response);
  } catch (error) {
    console.error('getJobs error:', error);
    throw new Error('Could not load job positions');
  }
};

export const applyToJob = async (application: {
  uuid: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
}) => {
  try {
    const response = await fetch(`${baseUrl}/api/candidate/apply-to-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(application),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('applyToJob error:', error);
    throw new Error('Failed to submit application');
  }
};