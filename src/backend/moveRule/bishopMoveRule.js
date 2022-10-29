import { createStraightLineMoveRule } from "./straightLineMoveRule.js";
import { DirectionEnum } from "./directionEnum.js";

function getBishopMoveRule() {
    let motionCoordinates = [
        DirectionEnum.NORTHEAST,
        DirectionEnum.NORTHWEST,
        DirectionEnum.SOUTHEAST,
        DirectionEnum.SOUTHWEST
    ];

    return {
        ...createStraightLineMoveRule(motionCoordinates)
    }
}

export {
    getBishopMoveRule
}
