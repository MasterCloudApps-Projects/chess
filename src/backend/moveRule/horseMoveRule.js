import { createPieceMoveRule } from "./pieceMoveRule.js";
import { DirectionEnum } from "./directionEnum.js"


function getHorseMoveRule() {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        return getLShapes();
    };

    function nextMoveRule() {
        return this;
    }

    function getLShapes () {
        let movements = [];
        for(let vertical of [DirectionEnum.NORTH, DirectionEnum.SOUTH]){
            for(let horizontal of [DirectionEnum.EAST, DirectionEnum.WEST]){
                movements.push(...getLShapeMovement(vertical, horizontal));
                movements.push(...getLShapeMovement(horizontal, vertical));
            }
        }
        return movements;
    }

    function getLShapeMovement(singleSquareDirection, doubleSquareDirection) {
        let movements = [];
        let origin = moveRule.getCurrentCoordinate();

        let directions = [singleSquareDirection, doubleSquareDirection, doubleSquareDirection];

        for(let direction of directions) {
            let partMovement = origin.getNextCoordinate(direction);
            if(isInvalidPartMovements(partMovement, origin))
                return movements;
            origin = partMovement;
        }

        if (moveRule.isEmptyCoordinate(origin) || moveRule.isOpposingColor(origin))
                movements.push(origin);
        return movements;
    }

    function isInvalidPartMovements(origin, destination){
        return origin.getPosition() === destination.getPosition();
    }

    return {
        ...moveRule,
        ...{
            getPossibleMovements,
            nextMoveRule
        }
    }
}

export {
    getHorseMoveRule
}
