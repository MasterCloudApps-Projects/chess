import { createPieceMoveRule } from "./pieceMoveRule.js";
import { DirectionEnum } from "./directionEnum.js"


function getHorseMoveRule() {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        return getLShapes();
    };

    function getLShapes () {
        let movements = [];
        movements.push(...getLShapeMovement(DirectionEnum.NORTH, DirectionEnum.EAST));
        movements.push(...getLShapeMovement(DirectionEnum.NORTH, DirectionEnum.WEST));

        movements.push(...getLShapeMovement(DirectionEnum.SOUTH, DirectionEnum.EAST));
        movements.push(...getLShapeMovement(DirectionEnum.SOUTH, DirectionEnum.WEST));

        movements.push(...getLShapeMovement(DirectionEnum.EAST, DirectionEnum.NORTH));
        movements.push(...getLShapeMovement(DirectionEnum.EAST, DirectionEnum.SOUTH));

        movements.push(...getLShapeMovement(DirectionEnum.WEST, DirectionEnum.NORTH));
        movements.push(...getLShapeMovement(DirectionEnum.WEST, DirectionEnum.SOUTH));
        return movements;
    }

    //TODO: refactor duplicate code
    function getLShapeMovement(singleSquareDirection, doubleSquareDirection) {
        let movements = [];
        let origin = moveRule.getCurrentCoordinate();

        let partMovement = origin.getNextCoordinate(singleSquareDirection);
        if(isInvalidPartMovements(partMovement, origin))
            return movements;
        origin = partMovement;

        partMovement = origin.getNextCoordinate(doubleSquareDirection);
        if(isInvalidPartMovements(partMovement, origin))
            return movements;
        origin = partMovement;

        partMovement = origin.getNextCoordinate(doubleSquareDirection);
        if(isInvalidPartMovements(partMovement, origin))
            return movements;
        origin = partMovement;

        if (moveRule.isEmptyCoordinate(origin) || moveRule.isOpposingColor(origin))
                movements.push(origin);
        return movements;
    }

    function isInvalidPartMovements(origin, destination){
        return origin === destination;
    }

    return {
        ...moveRule,
        ...{
            getPossibleMovements
        }
    }
}

export {
    getHorseMoveRule
}
