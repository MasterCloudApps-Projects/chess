import { createStraightLineMovement } from "../straightLineMovement.js";

function getQueenMovement() {
    let queenMovementMotionCoordinates = ['getNextSquareNorth', 'getNextSquareSouth', 'getNextSquareEast',  'getNextSquareWest',
        'getNextNorthEastDiagonal', 'getNextNorthWestDiagonal', 'getNextSouthEastDiagonal',  'getNextSouthWestDiagonal'];
    let queenMovement = createStraightLineMovement(queenMovementMotionCoordinates);
    return queenMovement;
}

export {
    getQueenMovement
}
