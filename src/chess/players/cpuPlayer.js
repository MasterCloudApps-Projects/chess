function cpuPlayer() {
    let player = {};

    player.performRandomMovement = function(board) {
        const origin = generateRandomMovement(board.getAllSquaresOfBlackPieces());
        const destination = generateRandomMovement(board.getAllEmptySquares());
        if (!board.performMovement(origin, destination))
            return this.performRandomMovement(board);
    };

    return player;
}

function generateRandomMovement(squares){
    return squares[Math.floor(Math.random()*(squares.length - 1))]
}

export {
    cpuPlayer
}
