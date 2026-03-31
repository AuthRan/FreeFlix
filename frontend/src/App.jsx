import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MovieGrid from './components/MovieGrid'
import FilterBar from './components/FilterBar'
import LoadingSkeleton from './components/LoadingSkeleton'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function App() {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [language, setLanguage] = useState('all')
  const [genre, setGenre] = useState('all')
  const [pageToken, setPageToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const fetchMovies = useCallback(async (newSearch = false) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        language,
        genre,
        limit: '12'
      })

      if (!newSearch && pageToken) {
        params.set('pageToken', pageToken)
      }

      const response = await fetch(`${API_BASE_URL}/movies/search?${params}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch movies')
      }

      setMovies(prev => newSearch ? data.data.movies : [...prev, ...data.data.movies])
      setPageToken(data.data.nextPageToken)
      setHasSearched(true)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, language, genre, pageToken])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setMovies([])
    setPageToken('')
    setHasSearched(false)

    if (query.trim()) {
      fetchMovies(true)
    }
  }

  const handleFilterChange = (newLanguage, newGenre) => {
    setLanguage(newLanguage)
    setGenre(newGenre)
    setMovies([])
    setPageToken('')
    setHasSearched(false)

    if (searchQuery.trim()) {
      setTimeout(() => fetchMovies(true), 0)
    }
  }

  const handleLoadMore = () => {
    if (pageToken && !loading) {
      fetchMovies()
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
      <Header onSearch={handleSearch} />

      {!hasSearched && !loading && (
        <Hero onSearch={handleSearch} />
      )}

      {hasSearched && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          <FilterBar
            language={language}
            genre={genre}
            onFilterChange={handleFilterChange}
            resultCount={movies.length}
          />

          {error ? (
            <ErrorMessage message={error} onRetry={() => fetchMovies(true)} />
          ) : (
            <>
              <MovieGrid movies={movies} />

              {loading && <LoadingSkeleton />}

              {!loading && movies.length > 0 && pageToken && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                  <button
                    onClick={handleLoadMore}
                    className="btn-secondary"
                    style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}
                  >
                    Load More
                  </button>
                </div>
              )}

              {!loading && movies.length === 0 && searchQuery && (
                <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                  <p style={{ color: '#808080', fontSize: '1.25rem' }}>
                    No movies found for "{searchQuery}"
                  </p>
                  <p style={{ color: '#808080', marginTop: '0.5rem' }}>
                    Try different keywords or filters
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <footer style={{ borderTop: '1px solid #181818', marginTop: '5rem', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', color: '#808080', fontSize: '0.875rem' }}>
          <p>FreeFlix - Discover legally available full movies on YouTube</p>
          <p style={{ marginTop: '0.5rem' }}>
            All content is hosted on YouTube and belongs to respective copyright holders.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
