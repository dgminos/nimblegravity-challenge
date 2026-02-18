import { useState } from 'react';

interface JobCardProps {
  title: string;
  jobId: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, jobId }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');

  const validateGithubUrl = (url: string): boolean => {
   // Pattern for GitHub URLs: https://github.com/user/repository
    const pattern = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/;
    return pattern.test(url.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that it is not empty
    if (!repoUrl.trim()) {
      setError('Repository URL is required');
      return;
    }

    // Validate GitHub format
    if (!validateGithubUrl(repoUrl)) {
      setError('Invalid URL. Must be: https://github.com/user/repository');
      return;
    }

    // If it passes validations
    setError('');
    console.log('Valid URL! Applying to:', jobId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value);
    // Clear error when the user starts typing
    if (error) setError('');
  };

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      background: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>{title}</h3>
      <p style={{ color: '#666', fontSize: '14px' }}>ID: {jobId}</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <input
            type="url"
            value={repoUrl}
            onChange={handleChange}
            placeholder="https://github.com/user/repository"
            style={{
              width: '100%',
              padding: '10px',
              border: `2px solid ${error ? '#f44336' : '#ddd'}`,
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              background: error ? '#fff5f5' : 'white'
            }}
          />
          {error && (
            <p style={{
              color: '#f44336',
              fontSize: '12px',
              margin: '4px 0 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>⚠️</span> {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#1565c0'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#1976d2'}
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default JobCard;

