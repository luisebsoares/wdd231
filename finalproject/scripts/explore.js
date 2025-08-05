document.addEventListener('DOMContentLoaded', () => {
    let allGames = [];
    let currentView = 'grid';

    // Load games.json from project root
    fetch('games.json')
        .then(res => res.json())
        .then(games => {
            allGames = games;
            populateFilter(games);
            renderGames(games);
        })
        .catch(err => console.error('Error loading games:', err));

    function populateFilter(games) {
        const select = document.getElementById('genreFilter');
        const genres = [...new Set(games.map(g => g.genre))].sort();
        genres.forEach(genre => {
            const opt = document.createElement('option');
            opt.value = genre;
            opt.textContent = genre;
            select.appendChild(opt);
        });

        select.addEventListener('change', () => {
            renderGames(getFiltered());
        });
    }

    function renderGames(games) {
        const container = document.getElementById('gameList');
        container.className = `game-cards ${currentView}`;
        container.innerHTML = '';

        games.forEach(game => {
            const card = document.createElement('article');
            card.className = 'game-card';
            card.innerHTML = `
        <img
          src="https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg"
          alt="${game.name} cover"
          class="game-thumb"
        >
        <h3>${game.name}</h3>
        <p>${game.genre}</p>
      `;
            card.addEventListener('click', () => openModal(game));
            container.appendChild(card);
        });
    }

    // Toggle grid/list views
    document.getElementById('gridView').addEventListener('click', () => {
        currentView = 'grid';
        toggleActive('gridView');
        renderGames(getFiltered());
    });

    document.getElementById('listView').addEventListener('click', () => {
        currentView = 'list';
        toggleActive('listView');
        renderGames(getFiltered());
    });

    function toggleActive(activeId) {
        ['gridView', 'listView'].forEach(id => {
            document.getElementById(id).classList.toggle('active', id === activeId);
        });
    }

    function getFiltered() {
        const genre = document.getElementById('genreFilter').value;
        return genre ? allGames.filter(g => g.genre === genre) : allGames;
    }

    function openModal(game) {
        document.getElementById('modalTitle').textContent = game.name;
        document.getElementById('modalDesc').innerHTML = `
  ${game.description || 'No description available.'}<br>
  <strong>Released:</strong> ${game.release_date}
`;
        document.getElementById('gameModal').showModal();
    }


    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('gameModal').close();
    });
});