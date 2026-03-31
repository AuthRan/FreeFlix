function Hero({ onSearch }) {
  const quickSearches = [
    { label: 'Telugu Action', query: 'Telugu action full movie' },
    { label: 'Tamil Romance', query: 'Tamil romantic full movie' },
    { label: 'Hindi Dubbed', query: 'Hindi dubbed South Indian full movie' },
    { label: 'Malayalam Thriller', query: 'Malayalam thriller full movie' }
  ]

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, rgba(229, 9, 20, 0.2), rgba(20, 20, 20, 0.5), #141414)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1rem 2rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          lineHeight: 1.1
        }}>
          Discover Free Full Movies
          <span style={{ color: '#E50914' }}> on YouTube</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#808080',
          maxWidth: '42rem',
          margin: '0 auto 2rem'
        }}>
          Watch legally available full-length movies from trusted channels.
          South Indian films, Bollywood, and more — all in one place.
        </p>

        {/* Quick Search Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          {quickSearches.map((item) => (
            <button
              key={item.label}
              onClick={() => onSearch(item.query)}
              style={{
                paddingHorizontal: '1rem',
                paddingVertical: '0.5rem',
                backgroundColor: 'rgba(24, 24, 24, 0.8)',
                border: '1px solid #181818',
                borderRadius: '9999px',
                color: 'white',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#E50914'
                e.target.style.borderColor = '#E50914'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(24, 24, 24, 0.8)'
                e.target.style.borderColor = '#181818'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
          maxWidth: '48rem',
          margin: '3rem auto 0'
        }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'rgba(24, 24, 24, 0.5)', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎬</div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Full Length Movies</h3>
            <p style={{ color: '#808080', fontSize: '0.875rem' }}>Only movies over 60 minutes</p>
          </div>

          <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'rgba(24, 24, 24, 0.5)', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✓</div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Legal & Verified</h3>
            <p style={{ color: '#808080', fontSize: '0.875rem' }}>From official YouTube channels</p>
          </div>

          <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'rgba(24, 24, 24, 0.5)', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🌍</div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Multiple Languages</h3>
            <p style={{ color: '#808080', fontSize: '0.875rem' }}>Tamil, Telugu, Hindi, Malayalam</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
