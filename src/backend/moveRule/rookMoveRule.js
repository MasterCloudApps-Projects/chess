import { createStraightLineMoveRule } from "./straightLineMoveRule.js";
import { DirectionEnum } from "./directionEnum.js";

function getRookMoveRule() {
    let motionCoordinates = [
        DirectionEnum.north,
        DirectionEnum.south,
        DirectionEnum.east,
        DirectionEnum.west
    ];

    return {
        ...createStraightLineMoveRule(motionCoordinates)
    }
}

export {
    getRookMoveRule
}
