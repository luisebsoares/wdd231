document.addEventListener('DOMContentLoaded', () => {
    let allGames = [];
    let currentView = 'grid';

    // Fetch and initialize
    fetch('data/games.json')
        .then(res => res.json())
        .then(games => {
            allGames = games;
            populateFilter(games);
            renderGames(games);
        });

    // Populate genre filter
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

    // Render games
    function renderGames(games) {
        const container = document.getElementById('gameList');
        container.className = `game-cards ${currentView}`;
        container.innerHTML = '';
        games.forEach(game => {
            // 1) Build card with empty <img>
            const card = document.createElement('article');
            card.className = 'game-card';
            card.innerHTML = `
      <img src="" alt="${game.name} cover" class="game-thumb">
      <h3>${game.name}</h3>
      <p>${game.genre}</p>
    `;
            // 2) Click opens modal
            card.addEventListener('click', () => openModal(game));
            container.appendChild(card);

            // 3) Fetch the Steam header image
            fetch(`https://store.steampowered.com/api/appdetails?appids=${game.appid}`)
                .then(res => res.json())
                .then(json => {
                    const info = json[game.appid];
                    if (info.success && info.data.header_image) {
                        card.querySelector('.game-thumb').src = info.data.header_image;
                    }
                })
                .catch(() => {
                    // on error you might supply a fallback image:
                    card.querySelector('.game-thumb').src = 'images/placeholder.png';
                });
        });
    }

    // View toggles
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

    // Modal logic
    function openModal(game) {
        document.getElementById('modalTitle').textContent = game.name;
        document.getElementById('modalDesc').textContent =
            game.short_description ||
            `${game.genre} game released ${game.release_date}`;
        document.getElementById('gameModal').showModal();
    }
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('gameModal').close();
    });
});
