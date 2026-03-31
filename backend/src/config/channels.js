/**
 * Whitelist of trusted YouTube channels for legal full movies
 * These channels are verified and known for legitimate content
 */

export const trustedChannels = {
  // Hindi / Bollywood
  'goldminestelefilms': {
    name: 'Goldmines Telefilms',
    language: ['Hindi', 'Hindi Dubbed'],
    genres: ['Action', 'Drama', 'Romance'],
    verified: true
  },
  'goldminesmovies': {
    name: 'Goldmines Movies',
    language: ['Hindi', 'Hindi Dubbed'],
    genres: ['Action', 'Drama', 'Comedy'],
    verified: true
  },
  'adityamovies': {
    name: 'Aditya Movies',
    language: ['Telugu', 'Hindi Dubbed'],
    genres: ['Action', 'Drama', 'Romance'],
    verified: true
  },
  'adityavideos': {
    name: 'Aditya Videos',
    language: ['Telugu', 'Hindi Dubbed'],
    genres: ['Action', 'Romance', 'Comedy'],
    verified: true
  },
  'volgavideo': {
    name: 'Volga Video',
    language: ['Hindi Dubbed'],
    genres: ['Action', 'Drama'],
    verified: true
  },
  'filmyhit': {
    name: 'FilmyHit',
    language: ['Hindi Dubbed', 'Telugu', 'Tamil'],
    genres: ['Action', 'Thriller'],
    verified: true
  },
  'shreyamovies': {
    name: 'Shreya Movies',
    language: ['Hindi Dubbed'],
    genres: ['Action', 'Drama'],
    verified: true
  },
  'moviesadda': {
    name: 'Movies Adda',
    language: ['Hindi Dubbed', 'Telugu'],
    genres: ['Action', 'Comedy'],
    verified: true
  },

  // Tamil channels
  'sunpictures': {
    name: 'Sun Pictures',
    language: ['Tamil'],
    genres: ['Action', 'Drama', 'Thriller'],
    verified: true
  },
  'redgiantmovies': {
    name: 'Red Giant Movies',
    language: ['Tamil'],
    genres: ['Action', 'Comedy', 'Drama'],
    verified: true
  },
  'tridentarts': {
    name: 'Trident Arts',
    language: ['Tamil'],
    genres: ['Action', 'Thriller', 'Drama'],
    verified: true
  },
  'pridezpictures': {
    name: 'Pride Z Pictures',
    language: ['Tamil'],
    genres: ['Action', 'Drama'],
    verified: true
  },

  // Telugu channels
  'sureshproductions': {
    name: 'Suresh Productions',
    language: ['Telugu'],
    genres: ['Action', 'Drama', 'Comedy'],
    verified: true
  },
  'aditya360entertainment': {
    name: 'Aditya 360 Entertainment',
    language: ['Telugu'],
    genres: ['Action', 'Romance'],
    verified: true
  },

  // Malayalam channels
  'manoramamax': {
    name: 'ManoramaMAX',
    language: ['Malayalam'],
    genres: ['Drama', 'Thriller', 'Comedy'],
    verified: true
  },
  'asianetmovies': {
    name: 'Asianet Movies',
    language: ['Malayalam'],
    genres: ['Action', 'Drama', 'Thriller'],
    verified: true
  },

  // General/Regional
  'ultraindia': {
    name: 'Ultra India',
    language: ['Hindi', 'Bhojpuri'],
    genres: ['Action', 'Drama', 'Comedy'],
    verified: true
  },
  'tipsfilms': {
    name: 'Tips Films',
    language: ['Hindi'],
    genres: ['Action', 'Romance', 'Comedy'],
    verified: true
  },
  'shemaro': {
    name: 'Shemaroo',
    language: ['Hindi', 'Gujarati'],
    genres: ['Drama', 'Comedy', 'Action'],
    verified: true
  },
  'rajshri': {
    name: 'Rajshri',
    language: ['Hindi'],
    genres: ['Family', 'Drama', 'Romance'],
    verified: true
  }
};

// Channel IDs for API queries (will be populated dynamically)
export const trustedChannelNames = Object.keys(trustedChannels);

export function getChannelInfo(channelTitle) {
  if (!channelTitle) return null;

  const lowerTitle = channelTitle.toLowerCase();
  for (const [key, info] of Object.entries(trustedChannels)) {
    if (lowerTitle.includes(key) || info.name.toLowerCase().includes(lowerTitle)) {
      return { key, ...info };
    }
  }
  return null;
}

export function isTrustedChannel(channelTitle) {
  return getChannelInfo(channelTitle) !== null;
}
