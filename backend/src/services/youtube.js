import { google } from 'googleapis';
import { trustedChannels, isTrustedChannel } from '../config/channels.js';

// Get API key - will be populated by dotenv in index.js
const getApiKey = () => process.env.YOUTUBE_API_KEY;

// Log warning if key is missing (check at runtime, not module load time)
const checkApiKey = () => {
  const key = getApiKey();
  if (!key) {
    console.warn('⚠️  YOUTUBE_API_KEY not found. API requests will fail.');
    console.warn('   Make sure .env file exists in the backend root directory.');
  }
  return key;
};

let youtubeInstance = null;

const getYouTube = () => {
  if (!youtubeInstance) {
    const key = checkApiKey();
    youtubeInstance = google.youtube({
      version: 'v3',
      auth: key
    });
  }
  return youtubeInstance;
};

// Language and genre keywords for search
const languageKeywords = {
  tamil: ['tamil', 'kollywood', 'tamil movie'],
  telugu: ['telugu', 'tollywood', 'telugu movie'],
  hindi: ['hindi', 'bollywood', 'hindi movie'],
  malayalam: ['malayalam', 'mollywood', 'malayalam movie'],
  kannada: ['kannada', 'sandalwood', 'kannada movie']
};

const genreKeywords = {
  action: ['action', 'fight', 'mass', 'hero'],
  romance: ['romance', 'love', 'romantic', 'lover'],
  comedy: ['comedy', 'funny', 'comedian', 'laughs'],
  thriller: ['thriller', 'suspense', 'mystery', 'crime'],
  drama: ['drama', 'family', 'emotional', 'story'],
  horror: ['horror', 'scary', 'ghost', 'haunted']
};

/**
 * Build search query based on filters
 */
function buildSearchQuery({ search, language, genre }) {
  const parts = [];

  // Add search term
  if (search) {
    parts.push(search);
  }

  // Add language keywords
  if (language && language !== 'all') {
    const langKeywords = languageKeywords[language.toLowerCase()];
    if (langKeywords) {
      parts.push(langKeywords[0]);
    }
  }

  // Add genre keywords
  if (genre && genre !== 'all') {
    const genreKws = genreKeywords[genre.toLowerCase()];
    if (genreKws) {
      parts.push(genreKws[0]);
    }
  }

  // Always include full movie indicators
  parts.push('full movie');

  return parts.join(' ');
}

/**
 * Filter videos based on duration and quality criteria
 */
function filterVideos(items) {
  return items.filter(video => {
    // Skip if no snippet
    if (!video.snippet) return false;

    const title = video.snippet.title.toLowerCase();
    const channelTitle = video.snippet.channelTitle || '';

    // Exclude spam/short content
    const spamKeywords = [
      'scene', 'clip', 'trailer', 'teaser', 'promo',
      'song', 'video song', 'item song', 'making video',
      'behind the scenes', 'interview', 'review',
      'part 1', 'part 2', 'part 3', 'part 4', 'part 5',
      'hd clips', 'video clips', 'shorts'
    ];

    const isSpam = spamKeywords.some(keyword => title.includes(keyword));
    if (isSpam) return false;

    // Prefer trusted channels
    const isTrusted = isTrustedChannel(channelTitle);

    // Check duration (already filtered by API, but double-check title hints)
    const durationHint = title.match(/(\d+)\s*(hr|hour|min)/i);
    if (durationHint) {
      const value = parseInt(durationHint[1]);
      const isHours = durationHint[0].toLowerCase().includes('hr') ||
                      durationHint[0].toLowerCase().includes('hour');
      if (isHours && value < 1) return false;
    }

    // Score the video
    let score = 0;

    // Trusted channel bonus
    if (isTrusted) score += 50;

    // Full movie in title
    if (title.includes('full movie')) score += 20;

    // HD quality
    if (title.includes('hd') || title.includes('4k')) score += 10;

    // Language match bonus (if we can detect)
    for (const [lang, keywords] of Object.entries(languageKeywords)) {
      if (keywords.some(kw => title.includes(kw))) {
        score += 5;
        break;
      }
    }

    // Minimum threshold
    return score >= 10;
  });
}

/**
 * Detect language from video title
 */
export function detectLanguage(title) {
  const lowerTitle = title.toLowerCase();

  for (const [lang, keywords] of Object.entries(languageKeywords)) {
    if (keywords.some(kw => lowerTitle.includes(kw))) {
      return lang.charAt(0).toUpperCase() + lang.slice(1);
    }
  }

  // Try channel-based detection
  for (const [key, info] of Object.entries(trustedChannels)) {
    if (lowerTitle.includes(key) || info.name.toLowerCase().split(' ').some(w => lowerTitle.includes(w))) {
      return info.language[0];
    }
  }

  return 'Unknown';
}

/**
 * Detect genre from video title
 */
export function detectGenre(title) {
  const lowerTitle = title.toLowerCase();

  for (const [genre, keywords] of Object.entries(genreKeywords)) {
    if (keywords.some(kw => lowerTitle.includes(kw))) {
      return genre.charAt(0).toUpperCase() + genre.slice(1);
    }
  }

  return 'General';
}

/**
 * Parse ISO 8601 duration to minutes
 */
export function parseDuration(duration) {
  if (!duration) return 0;

  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  return hours * 60 + minutes + (seconds / 60);
}

/**
 * Format duration for display
 */
export function formatDuration(minutes) {
  if (minutes < 60) {
    return `${Math.round(minutes)}m`;
  }
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
}

/**
 * Search movies on YouTube
 */
export async function searchMovies({
  search = '',
  language = 'all',
  genre = 'all',
  pageToken = '',
  maxResults = 12
} = {}) {
  try {
    const youtube = getYouTube();
    const query = buildSearchQuery({ search, language, genre });

    const response = await youtube.search.list({
      part: 'snippet',
      q: query,
      type: 'video',
      videoDuration: 'long', // Only videos > 20 minutes
      maxResults: Math.min(maxResults * 2, 50), // Fetch extra for filtering
      pageToken,
      order: 'relevance',
      relevanceLanguage: language !== 'all' ? language : 'hi'
    });

    if (!response.data.items || response.data.items.length === 0) {
      return {
        movies: [],
        nextPageToken: null,
        totalResults: 0
      };
    }

    // Get video IDs for duration check
    const videoIds = response.data.items.map(item => item.id.videoId).join(',');

    const videosResponse = await youtube.videos.list({
      part: 'contentDetails,snippet',
      id: videoIds
    });

    // Filter and process videos
    const filtered = filterVideos(videosResponse.data.items || []);

    // Process into movie format
    const movies = filtered.map(video => {
      const duration = parseDuration(video.contentDetails?.duration);
      const title = video.snippet.title;

      return {
        id: video.id,
        title: title.replace(/\|/g, '-').trim(),
        thumbnail: video.snippet.thumbnails?.high?.url ||
                   video.snippet.thumbnails?.medium?.url ||
                   video.snippet.thumbnails?.default?.url,
        channelName: video.snippet.channelTitle,
        channelId: video.snippet.channelId,
        duration: formatDuration(duration),
        durationMinutes: duration,
        publishedAt: video.snippet.publishedAt,
        description: video.snippet.description,
        language: detectLanguage(title),
        genre: detectGenre(title),
        isTrustedChannel: isTrustedChannel(video.snippet.channelTitle),
        youtubeUrl: `https://youtube.com/watch?v=${video.id}`
      };
    });

    // Ensure we have enough results
    const finalMovies = movies.slice(0, maxResults);

    return {
      movies: finalMovies,
      nextPageToken: finalMovies.length >= maxResults ? response.data.nextPageToken : null,
      totalResults: response.data.pageInfo?.totalResults || 0
    };

  } catch (error) {
    console.error('YouTube API Error:', error.message);

    if (error.response?.status === 403) {
      throw new Error('YouTube API quota exceeded. Please try again later.');
    }

    throw error;
  }
}

/**
 * Get similar movies based on genre and language
 */
export async function getSimilarMovies(movie, limit = 6) {
  if (!movie) return [];

  try {
    const result = await searchMovies({
      search: '',
      language: movie.language.toLowerCase().includes('tamil') ? 'tamil' :
                movie.language.toLowerCase().includes('telugu') ? 'telugu' :
                movie.language.toLowerCase().includes('malayalam') ? 'malayalam' : 'all',
      genre: movie.genre.toLowerCase(),
      maxResults: limit + 2
    });

    // Exclude the current movie
    return result.movies.filter(m => m.id !== movie.id).slice(0, limit);

  } catch (error) {
    console.error('Error fetching similar movies:', error.message);
    return [];
  }
}
