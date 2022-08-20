function cpuPlayer() {
    let player = {};
    player.performRandomMovement = performRandomMovement;
    return player;
}

function performRandomMovement(board) {
    board.performMovement('a8', 'a6');
}

export {
    cpuPlayer
}
