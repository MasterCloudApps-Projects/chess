import { createErrorMessage } from '../io/message.js';

function cpuPlayer() {
    let player = {};

    player.performRandomMovement = function(board, check) {
        const movement = getMovement(board, check);
        if(!movement.error){
            if (!board.performMovement(movement.origin, movement.destination))
                return this.performRandomMovement(board);
        }
        return movement;
    };

    return player;
}

function getMovement(board, check){
    const origins = check.getOutOfCheck ? check.getOutOfCheck : board.getAllSquaresOfBlackPieces();
    let origin = generateRandomMovement(origins);
    let destinations = board.movementsFromTheCoordinate(origin);

    while (destinations.length == 0 && origins.length > 0) {
        origin = generateRandomMovement(origins);
        destinations = board.movementsFromTheCoordinate(origin);
        origins.filter(i => i == origin)
    }

    if(destinations.length == 0)
        return createErrorMessage('cpu player cannot make any more moves');

    let destination = generateRandomMovement(destinations);
    return {origin: origin, destination: destination };
}

function generateRandomMovement(squares){
    return squares[Math.floor(Math.random()*(squares.length - 1))];
}

export {
    cpuPlayer
}
