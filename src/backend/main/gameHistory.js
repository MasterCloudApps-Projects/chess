const games = [];

function save(game) {
    games.push(game);
}

function findById(id) {
    return games.find(g => g.getUuid() === id);
}


export {
    save, findById
}
