import express from 'express';
import { searchMovies, getSimilarMovies } from '../services/youtube.js';

const router = express.Router();

/**
 * GET /api/movies/search
 * Search for movies with optional filters
 *
 * Query params:
 * - q: search query
 * - language: tamil, telugu, hindi, malayalam, all (default: all)
 * - genre: action, romance, comedy, thriller, drama, all (default: all)
 * - pageToken: pagination token
 * - limit: max results (default: 12)
 */
router.get('/search', async (req, res, next) => {
  try {
    const {
      q = '',
      language = 'all',
      genre = 'all',
      pageToken = '',
      limit = '12'
    } = req.query;

    const result = await searchMovies({
      search: q,
      language,
      genre,
      pageToken,
      maxResults: parseInt(limit, 10)
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/movies/:id/similar
 * Get similar movies based on a movie
 */
router.get('/:id/similar', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { limit = '6' } = req.query;

    // First get the movie details (we need language/genre)
    // For now, we'll fetch similar based on minimal info
    const similar = await getSimilarMovies(
      { id },
      parseInt(limit, 10)
    );

    res.json({
      success: true,
      data: { movies: similar }
    });

  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/movies/languages
 * Get available language filters
 */
router.get('/languages', (req, res) => {
  res.json({
    success: true,
    data: {
      languages: [
        { id: 'all', name: 'All Languages' },
        { id: 'hindi', name: 'Hindi' },
        { id: 'tamil', name: 'Tamil' },
        { id: 'telugu', name: 'Telugu' },
        { id: 'malayalam', name: 'Malayalam' },
        { id: 'kannada', name: 'Kannada' }
      ]
    }
  });
});

/**
 * GET /api/movies/genres
 * Get available genre filters
 */
router.get('/genres', (req, res) => {
  res.json({
    success: true,
    data: {
      genres: [
        { id: 'all', name: 'All Genres' },
        { id: 'action', name: 'Action' },
        { id: 'romance', name: 'Romance' },
        { id: 'comedy', name: 'Comedy' },
        { id: 'thriller', name: 'Thriller' },
        { id: 'drama', name: 'Drama' },
        { id: 'horror', name: 'Horror' }
      ]
    }
  });
});

export default router;
