import { pieceTypes } from '../pieces/pieceType.js';

function cpuPlayer() {
    let player = {};

    player.performRandomMovement = function(board) {
        let movement;
        do {
            movement = getMovement(board);
            if(!movement.error)
                board.tryMove(movement.origin, movement.destination, pieceTypes.black);
        } while (board.hasError());
        return movement;
    };

    return player;
}

function getMovement(board) {
    let origins;
    let destinations;

    origins = board.getAllSquaresOfBlackPieces();
    let origin = generateRandomMovement(origins);
    destinations = board.movementsFromTheCoordinate(origin)

    return { origin: origin, destination: generateRandomMovement(destinations) }; //board.getAllEmptySquares()
}

function generateRandomMovement(squares){
    return squares[Math.floor(Math.random()*(squares.length - 1))];
}

export {
    cpuPlayer
}
