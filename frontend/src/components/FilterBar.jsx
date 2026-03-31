import { useState } from 'react'

const languages = [
  { id: 'all', name: 'All Languages' },
  { id: 'hindi', name: 'Hindi' },
  { id: 'tamil', name: 'Tamil' },
  { id: 'telugu', name: 'Telugu' },
  { id: 'malayalam', name: 'Malayalam' },
  { id: 'kannada', name: 'Kannada' }
]

const genres = [
  { id: 'all', name: 'All Genres' },
  { id: 'action', name: 'Action' },
  { id: 'romance', name: 'Romance' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'thriller', name: 'Thriller' },
  { id: 'drama', name: 'Drama' },
  { id: 'horror', name: 'Horror' }
]

function FilterBar({ language, genre, onFilterChange, resultCount }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Filter Toggle (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          backgroundColor: '#181818',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          border: 'none',
          cursor: 'pointer',
          color: 'white'
        }}
      >
        <span style={{ fontWeight: '500' }}>Filters</span>
        <svg
          style={{
            width: '1.25rem',
            height: '1.25rem',
            transition: 'transform 0.2s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filters */}
      <div style={{
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#181818',
        borderRadius: '0.5rem'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Language Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#808080', marginBottom: '0.25rem' }}>Language</label>
            <select
              value={language}
              onChange={(e) => onFilterChange(e.target.value, genre)}
              style={{
                backgroundColor: '#0a0a0a',
                color: 'white',
                border: '1px solid #0a0a0a',
                borderRadius: '0.25rem',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                outline: 'none',
                minWidth: '140px',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.borderColor = '#E50914'}
              onBlur={(e) => e.target.style.borderColor = '#0a0a0a'}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Genre Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#808080', marginBottom: '0.25rem' }}>Genre</label>
            <select
              value={genre}
              onChange={(e) => onFilterChange(language, e.target.value)}
              style={{
                backgroundColor: '#0a0a0a',
                color: 'white',
                border: '1px solid #0a0a0a',
                borderRadius: '0.25rem',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                outline: 'none',
                minWidth: '140px',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.borderColor = '#E50914'}
              onBlur={(e) => e.target.style.borderColor = '#0a0a0a'}
            >
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ color: '#808080', fontSize: '0.875rem' }}>
          <span style={{ color: 'white', fontWeight: '500' }}>{resultCount}</span> results
        </div>
      </div>
    </div>
  )
}

export default FilterBar
