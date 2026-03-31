function LoadingSkeleton() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem'
    }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          backgroundColor: '#181818',
          borderRadius: '0.5rem',
          overflow: 'hidden'
        }}>
          {/* Thumbnail Skeleton */}
          <div style={{
            aspectRatio: '16/9',
            background: 'linear-gradient(90deg, #1a1a1a 0px, #2a2a2a 40px, #1a1a1a 80px)',
            backgroundSize: '200px 100%',
            animation: 'skeleton 1.5s ease-in-out infinite'
          }} />

          {/* Info Skeleton */}
          <div style={{ padding: '1rem', spaceY: '0.75rem' }}>
            <div style={{
              height: '1rem',
              background: 'linear-gradient(90deg, #1a1a1a 0px, #2a2a2a 40px, #1a1a1a 80px)',
              backgroundSize: '200px 100%',
              borderRadius: '0.25rem',
              width: '100%',
              marginBottom: '0.5rem',
              animation: 'skeleton 1.5s ease-in-out infinite'
            }} />
            <div style={{
              height: '1rem',
              background: 'linear-gradient(90deg, #1a1a1a 0px, #2a2a2a 40px, #1a1a1a 80px)',
              backgroundSize: '200px 100%',
              borderRadius: '0.25rem',
              width: '75%',
              marginBottom: '0.5rem',
              animation: 'skeleton 1.5s ease-in-out infinite'
            }} />
            <div style={{
              height: '2.25rem',
              background: 'linear-gradient(90deg, #1a1a1a 0px, #2a2a2a 40px, #1a1a1a 80px)',
              backgroundSize: '200px 100%',
              borderRadius: '0.25rem',
              width: '100%',
              marginTop: '1rem',
              animation: 'skeleton 1.5s ease-in-out infinite'
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
