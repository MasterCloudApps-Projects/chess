const gameHistory = createGameHistory();

function createGameHistory() {
    const games = [];

    function save(game) {
        games.push(game);
    }
    
    function findById(id) {
        return games.find(g => g.getUuid() === id);
    }

    return {
        save,
        findById
    }
}

export {
    gameHistory
}