const baseUrl = import.meta.env.VITE_BASE_URL

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error HTTP: ${response.status}`);
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
    console.error('Error en getCandidateByEmail:', error);
    throw new Error('No se pudo conectar con el servidor');
  }
};

export const getJobs = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/jobs/get-list`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error en getJobs:', error);
    throw new Error('No se pudieron cargar las posiciones');
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
    console.error('Error en applyToJob:', error);
    throw new Error('No se pudo enviar la postulación');
  }
};