function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Oops! Something went wrong</h2>
      <p style={{ color: '#808080', marginBottom: '1.5rem', maxWidth: '28rem', margin: '0 auto 1.5rem' }}>{message}</p>

      {onRetry && (
        <button onClick={onRetry} className="btn-primary" style={{
          padding: '0.75rem 2rem',
          fontSize: '1rem'
        }}>
          Try Again
        </button>
      )}

      <div style={{ marginTop: '2rem', color: '#808080', fontSize: '0.875rem', maxWidth: '28rem', margin: '2rem auto 0' }}>
        <p>Possible reasons:</p>
        <ul style={{ textAlign: 'left', marginTop: '0.5rem', spaceY: '0.25rem' }}>
          <li style={{ marginBottom: '0.25rem' }}>YouTube API quota limit reached</li>
          <li style={{ marginBottom: '0.25rem' }}>Network connection issue</li>
          <li style={{ marginBottom: '0.25rem' }}>Backend server not running</li>
        </ul>
      </div>
    </div>
  )
}

export default ErrorMessage
