function cpuPlayer() {
    let player = {};
    player.performRandomMovement = performRandomMovement;
    return player;
}

function performRandomMovement(board) {
    let origin = generateRandomMovement(board.getAllSquaresOfBlackPieces());
    let destination = generateRandomMovement(board.getAllEmptySquares());
    if (!board.performMovement(origin, destination))
        return performRandomMovement(board);
}


function generateRandomMovement(squares){
    return squares[Math.floor(Math.random()*(squares.length - 1))]
}

export {
    cpuPlayer
}
