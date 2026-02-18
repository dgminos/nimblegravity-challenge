import { useEffect } from 'react';
import { useJobs } from './hooks/useJobs'
import JobCard from './components/JobCard';

const email = import.meta.env.VITE_MY_EMAIL;

function App() {
  const { candidate, jobs, loading, error, fetchCandidate, fetchJobs } = useJobs();

  useEffect(() => {
    const init = async () => {
      await fetchCandidate(email);
      await fetchJobs();
    };
    init();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Nimble Gravity Challenge
      </h1>
      
      {error && (
        <div style={{ 
          color: '#721c24',
          background: '#f8d7da',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}

      {candidate && (
        <div style={{ 
          background: '#e3f2fd',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #bbdefb'
        }}>
          <h2 style={{ marginBottom: '10px' }}>
            {candidate.firstName} {candidate.lastName}
          </h2>
          <p style={{ color: '#1976d2' }}>{candidate.email}</p>
        </div>
      )}

      <h2 style={{ marginBottom: '20px' }}>
        Posiciones Disponibles ({jobs.length})
      </h2>

  <div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '20px'
}}>
  {jobs.map(job => (
    <JobCard
      key={job.id}
      jobId={job.id}
      title={job.title}
    />  
  ))}
</div>
    </div>
  );
}

export default App;

