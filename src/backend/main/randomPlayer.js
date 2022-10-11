import { PieceColorEnum } from '../piece/pieceColorEnum.js';

function randomPlayer() {

    function performRandomMovement(game) {
        console.log("CPU performing movement...");
        let movement, result;
        do {
            movement = getMovement(game.getBoard());
            result = game.play(movement.origin, movement.destination, PieceColorEnum.Black);
        } while (result.error);
    }

    function getMovement(board) {
        let origins;
        let destinations;

        if (board.isColorOnCheck(PieceColorEnum.Black))
            return board.getValidMovementWhileColorIsOnCheck(PieceColorEnum.Black);

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
        performRandomMovement
    }
}

export {
    randomPlayer
}
