import { createStraightLineMoveRule } from "./straightLineMoveRule.js";
import { DirectionEnum } from "./directionEnum.js";

function getRookMoveRule() {
    let motionCoordinates = [
        DirectionEnum.NORTH,
        DirectionEnum.SOUTH,
        DirectionEnum.EAST,
        DirectionEnum.WEST
    ];

    return {
        ...createStraightLineMoveRule(motionCoordinates)
    }
}

export {
    getRookMoveRule
}
