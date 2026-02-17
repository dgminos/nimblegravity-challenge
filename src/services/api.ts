process.loadEnvFile()

const baseUrl = process.env.BASE_URL

export const getCandidateByEmail = async (email: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
    );
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching candidate:', error);
    throw error;
  }
};