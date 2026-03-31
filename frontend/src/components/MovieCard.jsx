function MovieCard({ movie }) {
  const {
    title,
    thumbnail,
    channelName,
    duration,
    youtubeUrl,
    language,
    genre,
    isTrustedChannel
  } = movie

  return (
    <div className="movie-card" style={{
      backgroundColor: '#181818',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
    }}>
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: '#0a0a0a' }}>
        <img
          src={thumbnail}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />

        {/* Duration Badge */}
        <span style={{
          position: 'absolute',
          bottom: '0.5rem',
          right: '0.5rem',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          fontSize: '0.75rem',
          paddingHorizontal: '0.5rem',
          paddingVertical: '0.25rem',
          borderRadius: '0.25rem',
          fontWeight: '500'
        }}>
          {duration}
        </span>

        {/* Trusted Channel Badge */}
        {isTrustedChannel && (
          <span style={{
            position: 'absolute',
            top: '0.5rem',
            left: '0.5rem',
            backgroundColor: '#E50914',
            color: 'white',
            fontSize: '0.75rem',
            paddingHorizontal: '0.5rem',
            paddingVertical: '0.25rem',
            borderRadius: '0.25rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}

        {/* Play Overlay */}
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = 1}
          onMouseOut={(e) => e.currentTarget.style.opacity = 0}
        >
          <div style={{
            backgroundColor: '#E50914',
            borderRadius: '9999px',
            padding: '1rem',
            transition: 'transform 0.3s'
          }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            <svg style={{ width: '2rem', height: '2rem', color: 'white', marginLeft: '0.25rem' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </a>
      </div>

      {/* Info */}
      <div style={{ padding: '1rem' }}>
        <h3 style={{
          fontWeight: '600',
          fontSize: '0.875rem',
          marginBottom: '0.5rem',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.5rem'
        }}>
          {title}
        </h3>

        <div style={{ marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#808080' }}>
            {channelName}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          {language && language !== 'Unknown' && (
            <span style={{
              fontSize: '0.75rem',
              paddingHorizontal: '0.5rem',
              paddingVertical: '0.25rem',
              backgroundColor: '#0a0a0a',
              borderRadius: '0.25rem',
              color: '#808080'
            }}>
              {language}
            </span>
          )}
          {genre && genre !== 'General' && (
            <span style={{
              fontSize: '0.75rem',
              paddingHorizontal: '0.5rem',
              paddingVertical: '0.25rem',
              backgroundColor: '#0a0a0a',
              borderRadius: '0.25rem',
              color: '#808080'
            }}>
              {genre}
            </span>
          )}
        </div>

        {/* Watch Button */}
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{
            display: 'block',
            width: '100%',
            padding: '0.5rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            textDecoration: 'none'
          }}
        >
          Watch Now
        </a>
      </div>
    </div>
  )
}

export default MovieCard
