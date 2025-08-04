// Fetch and render 3 random games
fetch('data/games.json')
    .then(res => res.json())
    .then(games => {
        const picked = games.sort(() => 0.5 - Math.random()).slice(0, 3);
        const container = document.getElementById('randomGames');
        picked.forEach(game => {
            const card = document.createElement('article');
            card.className = 'game-card';
            card.innerHTML = `
        <img src="images/placeholder.png" alt="${game.name} cover" class="game-thumb">
        <h3>${game.name}</h3>
        <p>${game.genre}</p>
      `;
            container.appendChild(card);
            // Fetch header image from Steam
            fetch(`https://store.steampowered.com/api/appdetails?appids=${game.appid}`)
                .then(r => r.json())
                .then(json => {
                    const info = json[game.appid];
                    if (info.success && info.data.header_image) {
                        card.querySelector('.game-thumb').src = info.data.header_image;
                    }
                })
                .catch(() => { });
        });
    });
