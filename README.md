# Game Search

A simple game search frontend with a tiny Node/Express proxy that calls the RAWG API without exposing your API key to the browser.

## Features
- Search games by name using RAWG
- Server-side proxy injects the API key
- Minimal, framework-free frontend

## Requirements
- Node.js 18+ (or compatible)

## Setup
1. Install dependencies:
   - `npm install`
2. Create your env file with your RAWG key:
   - Copy `.env.example` to `.env`
   - Set `RAWG_KEY=your_rawg_api_key_here`

## Run
- Start the server:
  - `npm start`
- Open the app:
  - http://localhost:3000

## How It Works
- Frontend (`index.html`, `script.js`) makes requests to the local proxy endpoint:
  - `GET /api/games?search=<query>`
- Server (`server.js`) forwards the request to RAWG:
  - `https://api.rawg.io/api/games?key=RAWG_KEY&search=<query>`
- The API key is read from `.env` via `dotenv` and never sent to the client.

## Files
- `index.html` — UI and form
- `style.css` — basic styles
- `script.js` — fetches from `/api/games` and renders results
- `server.js` — Express static server + RAWG proxy
- `.env` — local secrets (ignored by git)
- `.env.example` — template env file
- `.gitignore` — excludes `.env` and `node_modules/`

## Notes
- Keep `.env` out of version control (already ignored).
- If you rotate keys, update `.env` and restart the server.
- For deployment, use host-provided env vars and run the same `server.js`.

