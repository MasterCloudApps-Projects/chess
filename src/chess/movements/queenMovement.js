import { createStraightLineMovement } from "./straightLineMovement.js";

/** Queen movement strategy.
*   The Queen queenMovementMotionCoordinates until it is blocked by another piece
*/

function getQueenMovement() {
    let queenMovementMotionCoordinates = ['getNextSquareNorth', 'getNextSquareSouth', 'getNextSquareEast',  'getNextSquareWest',
        'getNextNorthEastDiagonal', 'getNextNorthWestDiagonal', 'getNextSouthEastDiagonal',  'getNextSouthWestDiagonal'];
    let messageError = "Invalid queen movement";

    let queenMovement = createStraightLineMovement(queenMovementMotionCoordinates, messageError);

    return queenMovement;
}


export {
    getQueenMovement
}
