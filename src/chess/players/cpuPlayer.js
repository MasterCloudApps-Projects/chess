import { createErrorMessage } from '../io/message.js';
import { pieceTypes } from '../pieces/pieceType.js';

function cpuPlayer() {
    let player = {};

    player.performRandomMovement = function(board) {
        const movement = getMovement(board);
        if(!movement.error){
            board.move(movement.origin, movement.destination, pieceTypes.black);

        if (board.hasError())
                return this.performRandomMovement(board);
        }
        return movement;
    };

    return player;
}

function getMovement(board){
    //let check = board.getCheckByColor(pieceTypes.white);
    let origins;
    let destinations;

    /*if(check.getOutOfCheck || check.getOutOfCheck >= 0){
        origins = board.getKingByColor(color);
        destinations = board.destinations();
        return {origin: origins, destination: destination };
    }*/

    origins = board.getAllSquaresOfBlackPieces();
    let origin = generateRandomMovement(origins);
    destinations = board.movementsFromTheCoordinate(origin)

    /*while (destinations.length == 0 && origins.length > 0) {
        origin = generateRandomMovement(origins);
        destinations = board.movementsFromTheCoordinate(origin);
        origins.filter(i => i == origin)
    }

    if(origins.length == 0)
        return createErrorMessage('cpu player cannot make any more moves');*/

    return { origin: origin, destination: generateRandomMovement(board.getAllEmptySquares()) };
}

function generateRandomMovement(squares){
    return squares[Math.floor(Math.random()*(squares.length - 1))];
}

export {
    cpuPlayer
}
