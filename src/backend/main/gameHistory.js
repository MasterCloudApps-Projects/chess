const games = [];

function save(game) {
    games.push(game);
}

function findById(id) {
    return games.find(g => g.uuid === id);
}


export {
    save, findById
}
