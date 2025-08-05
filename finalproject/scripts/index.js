fetch('games.json')
    .then(res => res.json())
    .then(games => {
        const picked = games.sort(() => 0.5 - Math.random()).slice(0, 3);
        const container = document.getElementById('randomGames');

        picked.forEach(game => {
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
            container.appendChild(card);
        });
    })
    .catch(err => console.error('Error loading games:', err));