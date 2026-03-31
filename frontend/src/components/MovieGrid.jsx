import MovieCard from './MovieCard'

function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem'
    }}>
      {movies.map((movie, index) => (
        <div key={movie.id} className="fade-in" style={{ animationDelay: `${index * 50}ms` }}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  )
}

export default MovieGrid
