import { pieceTypes } from './pieces/pieceType.js';

function randomPlayer() {

    function getMovement(board) {
        let origins;
        let destinations;

        if (board.isColorOnCheck(pieceTypes.black))
            return board.getValidMovementWhileColorIsOnCheck(pieceTypes.black);

        origins = board.getAllSquaresOfBlackPieces();
        let origin = generateRandomMovement(origins);
        destinations = board.movementsFromTheCoordinate(origin)

        return {
            origin: origin,
            destination: generateRandomMovement(destinations)
        };
    }

    function generateRandomMovement(squares){
        return squares[Math.floor(Math.random()*(squares.length - 1))];
    }

    return  {
        performRandomMovement: function(game) {
            let movement, result;
            do {
                movement = getMovement(game.board);
                result = game.play(movement.origin, movement.destination, pieceTypes.black);
            } while (result.error);
        }
    }
}

export {
    randomPlayer
}
