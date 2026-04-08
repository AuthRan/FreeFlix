# FreeFlix 🎬

Discover legally available full movies on YouTube. A platform that helps users find full-length movies from trusted/official YouTube channels.

![FreeFlix](https://img.shields.io/badge/status-ready-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## Features

- 🔍 **Smart Search** - Find movies by language, genre, or keywords
- 🎭 **Multiple Languages** - Tamil, Telugu, Hindi, Malayalam, Kannada
- 🎬 **Genre Filters** - Action, Romance, Comedy, Thriller, Drama, Horror
- ✅ **Verified Channels** - Only content from trusted official channels
- ⏱️ **Duration Filter** - Only shows videos longer than 60 minutes
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Netflix-inspired UI** - Clean, modern dark theme

## Screenshots
Main Menu :
<img width="1919" height="974" alt="image" src="https://github.com/user-attachments/assets/ec9d501c-13f3-4335-b133-4e8fa6fdc2ea" />
Search Options :
<img width="1919" height="976" alt="image" src="https://github.com/user-attachments/assets/cd87e4eb-0ec2-45bb-b8b4-90c586f88257" />


## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- Modern ES6+ JavaScript

### Backend
- Node.js with Express
- YouTube Data API v3
- RESTful API design

## Prerequisites

- Node.js 18+ and npm
- YouTube Data API v3 key

## Getting Started

### 1. Clone the Repository

```bash
cd freeFlix
```

### 2. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### 3. Set Up Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your YouTube API key
# YOUTUBE_API_KEY=your_actual_api_key
```

### 4. Set Up Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env if needed (default works for local dev)
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### 6. Open the App

Navigate to `http://localhost:5173` in your browser.

## Project Structure

```
freeFlix/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── channels.js      # Trusted channel whitelist
│   │   ├── routes/
│   │   │   └── movies.js        # API routes
│   │   ├── services/
│   │   │   └── youtube.js       # YouTube API integration
│   │   └── index.js             # Express server entry
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieGrid.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## API Endpoints

### Search Movies
```
GET /api/movies/search?q=telugu+action&language=telugu&genre=action&limit=12
```

Query Parameters:
- `q` - Search query (optional)
- `language` - Filter by language (hindi, tamil, telugu, malayalam, kannada, all)
- `genre` - Filter by genre (action, romance, comedy, thriller, drama, horror, all)
- `pageToken` - Pagination token (optional)
- `limit` - Max results per page (default: 12)

### Get Languages
```
GET /api/movies/languages
```

### Get Genres
```
GET /api/movies/genres
```

### Health Check
```
GET /health
```

## Trusted Channels

The app prioritizes content from verified channels including:
- Goldmines Telefilms
- Aditya Movies
- Sun Pictures
- Red Giant Movies
- Tips Films
- Shemaroo
- Rajshri
- And many more official channels

## Troubleshooting

### "YouTube API quota exceeded"
- The free tier has a daily quota limit
- Wait 24 hours for quota to reset
- Or request a quota increase from Google Cloud Console

### Backend not connecting
- Ensure backend is running on port 5000
- Check that `VITE_API_URL` in frontend/.env points to the correct backend URL

### No results showing
- Try different search terms
- Check that your YouTube API key is valid
- Verify the API is enabled in Google Cloud Console

## License

MIT License - feel free to use this project for learning or personal use.

## Disclaimer

This platform only indexes content that is legally available on YouTube from official/trusted channels. All video content is hosted on YouTube and belongs to their respective copyright holders. FreeFlix does not host any video content.

---

Built with ❤️ for movie lovers
