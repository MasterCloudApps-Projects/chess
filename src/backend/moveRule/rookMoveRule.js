import { createStraightLineMoveRule } from "./straightLineMoveRule.js";

function getRookMoveRule() {
    let motionCoordinate = [
        'getNextSquareNorth',
        'getNextSquareSouth',
        'getNextSquareEast',
        'getNextSquareWest'
    ];

    return {
        ...createStraightLineMoveRule(motionCoordinate)
    }
}

export {
    getRookMoveRule
}
