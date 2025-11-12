const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

function showSpinner() {
  resultsDiv.classList.remove('row', 'g-3');
  resultsDiv.innerHTML = `
    <div class="d-flex justify-content-center py-5 w-100">
      <div class="spinner-border" role="status" aria-label="Loading"></div>
    </div>
  `;
}

function renderGames(games) {
  resultsDiv.classList.add('row', 'g-3');
  resultsDiv.innerHTML = '';
  if (!games.length) {
    resultsDiv.classList.remove('row', 'g-3');
    resultsDiv.innerHTML = '<p class="text-muted">No results found.</p>';
    return;
  }

  games.forEach((game) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

    const img = game.background_image || '';
    const rating = game.rating ?? 'N/A';
    const released = game.released || 'N/A';

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        ${img ? `<img src="${img}" class="card-img-top" alt="${game.name}">` : ''}
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${game.name}</h5>
          <p class="card-text mb-1"><strong>Released:</strong> ${released}</p>
          <div class="mt-auto">
            <span class="badge text-bg-secondary">Rating: ${rating}</span>
          </div>
        </div>
      </div>
    `;
    resultsDiv.appendChild(col);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  showSpinner();

  try {
    const res = await fetch(`/api/games?search=${encodeURIComponent(query)}`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    const data = await res.json();
    const games = Array.isArray(data.results) ? data.results : [];
    renderGames(games);
  } catch (err) {
    resultsDiv.classList.remove('row', 'g-3');
    resultsDiv.innerHTML = `<div class="alert alert-danger" role="alert">${err.message}</div>`;
    console.error(err);
  }
});
