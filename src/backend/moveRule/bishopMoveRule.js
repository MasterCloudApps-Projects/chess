import { createStraightLineMoveRule } from "./straightLineMoveRule.js";

function getBishopMoveRule() {
    let motionCoordinates = [
        'getNextNorthEastDiagonal',
        'getNextNorthWestDiagonal',
        'getNextSouthEastDiagonal',
        'getNextSouthWestDiagonal'
    ];
    return {
        ...createStraightLineMoveRule(motionCoordinates)
    }
}

export {
    getBishopMoveRule
}
