import { createStraightLineMoveRule } from "./straightLineMoveRule.js";
import { DirectionEnum } from "./directionEnum.js";

function getBishopMoveRule() {
    let motionCoordinates = [
        DirectionEnum.northEast,
        DirectionEnum.northWest,
        DirectionEnum.southEast,
        DirectionEnum.southWest
    ];

    return {
        ...createStraightLineMoveRule(motionCoordinates)
    }
}

export {
    getBishopMoveRule
}
