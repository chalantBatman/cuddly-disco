const express = require('express');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const RAWG_KEY = process.env.RAWG_KEY;

if (!RAWG_KEY) {
  console.warn('Warning: RAWG_KEY is not set in .env');
}

// Serve static files (index.html, script.js, etc.)
app.use(express.static(path.join(__dirname)));

// Proxy endpoint to fetch games from RAWG without exposing the API key to the client
app.get('/api/games', async (req, res) => {
  try {
    const { search } = req.query;
    const q = typeof search === 'string' ? search.trim() : '';
    if (!q) return res.status(400).json({ error: 'Missing search query' });

    const { data } = await axios.get('https://api.rawg.io/api/games', {
      params: { key: RAWG_KEY, search: q },
      timeout: 10000,
    });

    res.json(data);
  } catch (e) {
    const status = e.response?.status || 500;
    const details = e.response?.data || e.message;
    console.error('RAWG proxy error:', status, details);
    res.status(status).json({ error: 'Upstream error', details });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

