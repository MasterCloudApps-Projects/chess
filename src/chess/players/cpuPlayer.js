import { createErrorMessage } from '../io/message.js';
import { pieceTypes } from '../pieces/pieceType.js';

function cpuPlayer() {
    let player = {};

    player.performRandomMovement = function(board) {
        const movement = getMovement(board);
        if(!movement.error){
            board.blackMove(movement.origin, movement.destination);
            
        if (board.hasError())
                return this.performRandomMovement(board);
        }
        return movement;
    };


    return player;
}

function getMovement(board){
    let check = board.getCheckByColor(pieceTypes.white);

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
