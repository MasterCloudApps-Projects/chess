import { createLongStrockPiece } from "./base/longStrokePiece.js";

/** Queen movement strategy.
*   The Queen queenMovementMotionCoordinates until it is blocked by another piece
*/

function getQueenMovement() {
    let queenMovementMotionCoordinates = ['getNextSquareNorth', 'getNextSquareSouth', 'getNextSquareEast',  'getNextSquareWest',
        'getNextNorthEastDiagonal', 'getNextNorthWestDiagonal', 'getNextSouthEastDiagonal',  'getNextSouthWestDiagonal'];
    let messageError = "Invalid quuen movement";

    let queenMovement = createLongStrockPiece(queenMovementMotionCoordinates, messageError);

    return queenMovement;
}


export {
    getQueenMovement
}
