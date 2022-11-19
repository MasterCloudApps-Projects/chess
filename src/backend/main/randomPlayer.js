import { PieceColorEnum } from '../piece/pieceColorEnum.js';

const randomPlayer = createRandomPlayer();

function createRandomPlayer() {

    function getMovement(board) {
        let origins, origin, destinations;

        if (board.isColorOnCheck(PieceColorEnum.Black))
            return board.getValidMovementNotCausingCheck(PieceColorEnum.Black);

        origins = board.getAllSquaresOfBlackPieces();

        do {
            origin = generateRandomMovement(origins);
            destinations = board.movementsFromTheCoordinate(origin);
        } while(destinations.length === 0);

        return {
            origin: origin,
            destination: generateRandomMovement(destinations)
        };
    }

    function generateRandomMovement(squares){
        return squares[Math.floor(Math.random()*(squares.length))];
    }

    return  {
        getMovement
    }
}

export {
    randomPlayer
}
