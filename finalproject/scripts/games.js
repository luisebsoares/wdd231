export async function loadGames() {
    try {
        const res = await fetch('games.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error loading games:', error);
        return [];
    }
}

export function getGenres(games) {
    return [...new Set(games.map(g => g.genre))].sort();
}

export function filterGamesByGenre(games, genre) {
    return genre ? games.filter(g => g.genre === genre) : games;
}
