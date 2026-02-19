import type { JobApplication } from '../types';

const baseUrl = import.meta.env.VITE_BASE_URL

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    let errorData: unknown = { raw: text };
    try {
      errorData = text ? JSON.parse(text) : { raw: '' };
    } catch {
      errorData = { raw: text };
    }
    const raw = (errorData as { raw?: unknown })?.raw;

    const baseMessage =
      (errorData as { message?: string }).message ||
      (errorData as { error?: string }).error ||
      (typeof raw === 'string' && raw.trim() ? raw : '') ||
      `HTTP error: ${response.status}`;
    const details = (errorData as { details?: unknown }).details;
    const detailsText = details ? ` | details: ${JSON.stringify(details)}` : '';
    const message = `${baseMessage}${detailsText}`;

    const err = new Error(message);
    (err as unknown as { status?: number }).status = response.status;
    (err as unknown as { data?: unknown }).data = errorData;
    throw err;
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
    throw new Error('Could not connect to server. Please try again later.');
  }
};

export const getJobs = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/jobs/get-list`);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Could not load job positions');
  }
};

export const applyToJob = async (application: JobApplication) => {
  try {
    const payload: JobApplication = {
      uuid: application.uuid,
      jobId: application.jobId,
      candidateId: application.candidateId,
      applicationId: application.applicationId,
      repoUrl: application.repoUrl,
    };

    const payloadJson = JSON.stringify(payload);
    const response = await fetch(`${baseUrl}/api/candidate/apply-to-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payloadJson,
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to submit application');
  }
};