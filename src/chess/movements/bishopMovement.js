import { createLongStrockPiece } from "./base/longStrokePiece.js";

/** Bishop movement strategy.
*   The bishop moves in a  straight diagonal line to any square of the board
*   until it is blocked by another piece
*/

function getBishopMovement() {
    let bishopMovementMotionCoordinates = ['getNextNorthEastDiagonal', 'getNextNorthWestDiagonal', 'getNextSouthEastDiagonal',  'getNextSouthWestDiagonal'];
    let messageError = "Invalid bishop movement";
    let bishopMovement = createLongStrockPiece(bishopMovementMotionCoordinates, messageError);
    return bishopMovement;
}


export {
    getBishopMovement
}
