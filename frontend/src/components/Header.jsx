import { useState } from 'react'

function Header({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #2a2a2a'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <span style={{ color: '#E50914', fontSize: '1.875rem', fontWeight: 'bold', letterSpacing: '-0.025em' }}>
              FreeFlix
            </span>
          </a>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} style={{ flex: 1, maxWidth: '42rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies (e.g., 'Telugu action movie', 'Tamil romance')"
                style={{
                  width: '100%',
                  backgroundColor: '#181818',
                  color: 'white',
                  border: '1px solid #181818',
                  borderRadius: '0.375rem',
                  padding: '0.75rem 1rem 0.75rem 1.25rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E50914'}
                onBlur={(e) => e.target.style.borderColor = '#181818'}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#E50914',
                  border: 'none',
                  borderRadius: '0.25rem',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f40612'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#E50914'}
              >
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Nav Links */}
          <nav className="hidden md:flex" style={{ display: 'none' }} md={{ display: 'flex' }}>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#808080', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.target.style.color = 'white'}
              onMouseOut={(e) => e.target.style.color = '#808080'}
            >
              YouTube
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
