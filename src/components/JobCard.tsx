import React from 'react';

interface JobCardProps {
  title: string;
  jobId: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, jobId }) => {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      background: 'white',
      transition: 'box-shadow 0.2s'
    }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{title}</h3>
      <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
        ID: {jobId}
      </p>
      <input
        type="text"
        placeholder="URL del repositorio de GitHub"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          marginBottom: '8px',
          fontSize: '14px'
        }}
      />
      <button
        style={{
          width: '100%',
          padding: '10px',
          background: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Postularme
      </button>
    </div>
  );
};

export default JobCard;