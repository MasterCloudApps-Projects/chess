import { createStraightLineMovement } from "../straightLineMovement.js";

function getBishopMovement() {
    let bishopMovementMotionCoordinates = [
        'getNextNorthEastDiagonal',
        'getNextNorthWestDiagonal',
        'getNextSouthEastDiagonal',
        'getNextSouthWestDiagonal'
    ];
    let bishopMovement = createStraightLineMovement(bishopMovementMotionCoordinates);

    return bishopMovement;
}

export {
    getBishopMovement
}
