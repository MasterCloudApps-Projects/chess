import { createStraightLineMovement } from "./straightLineMovement.js";

/** Rook movement strategy.
*   The rook moves in a straight line horizontally or vertically to any square of the board
*   until it is blocked by another piece
*/

function getRookMovement() {
    let rookMovementMotionCoordinates = ['getNextSquareNorth', 'getNextSquareSouth', 'getNextSquareEast',  'getNextSquareWest'];
    let messageError = "Invalid rook movement";

    let rookMovement = createStraightLineMovement(rookMovementMotionCoordinates, messageError);

    return rookMovement;
}

export {
    getRookMovement
}
