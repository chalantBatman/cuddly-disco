const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  resultsDiv.textContent = 'Loading...';

  try {
    const res = await fetch(`/api/games?search=${encodeURIComponent(query)}`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    const data = await res.json();
    const games = Array.isArray(data.results) ? data.results : [];

    resultsDiv.innerHTML = '';
    if (games.length === 0) {
      resultsDiv.textContent = 'No results found.';
      return;
    }

    games.forEach((game) => {
      const gameDiv = document.createElement('div');
      gameDiv.innerHTML = `
        <h3>${game.name}</h3>
        <p>Released: ${game.released || 'N/A'}</p>
        <p>Rating: ${game.rating ?? 'N/A'}</p>
      `;
      resultsDiv.appendChild(gameDiv);
    });
  } catch (err) {
    resultsDiv.textContent = `Error: ${err.message}`;
    console.error(err);
  }
});
