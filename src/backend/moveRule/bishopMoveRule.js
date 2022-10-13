import { createStraightLineMoveRule } from "./straightLineMoveRule.js";
import { DirectionEnum } from "./directionEnum.js";

function getBishopMoveRule() {
    let motionCoordinates = [
        DirectionEnum.NORTHEAST_DIAGONAL,
        DirectionEnum.NORTHWEST_DIAGONAL,
        DirectionEnum.SOUTHEAST_DIAGONAL,
        DirectionEnum.SOUTHWEST_DIAGONAL
    ];

    return {
        ...createStraightLineMoveRule(motionCoordinates)
    }
}

export {
    getBishopMoveRule
}
