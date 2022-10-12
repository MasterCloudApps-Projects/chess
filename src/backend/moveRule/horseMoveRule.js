import { createPieceMoveRule } from "./pieceMoveRule.js";
import { DirectionEnum } from "./directionEnum.js"


function getHorseMoveRule() {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        return getLShapes();
    };

    function getLShapes () {
        let movements = [];
        movements.push(...getLShapeMovement(DirectionEnum.north, DirectionEnum.east));
        movements.push(...getLShapeMovement(DirectionEnum.north, DirectionEnum.west));

        movements.push(...getLShapeMovement(DirectionEnum.south, DirectionEnum.east));
        movements.push(...getLShapeMovement(DirectionEnum.south, DirectionEnum.west));

        movements.push(...getLShapeMovement(DirectionEnum.east, DirectionEnum.north));
        movements.push(...getLShapeMovement(DirectionEnum.east, DirectionEnum.south));

        movements.push(...getLShapeMovement(DirectionEnum.west, DirectionEnum.north));
        movements.push(...getLShapeMovement(DirectionEnum.west, DirectionEnum.south));
        return movements;
    }

    //TODO: refactor duplicate code
    function getLShapeMovement(singleSquareDirection, doubleSquareDirection) {
        let movements = [];
        let origin = moveRule.getCurrentPosition();

        let partMovement = moveRule.getNextSquare(origin, singleSquareDirection);
        if(isInvalidPartMovements(partMovement, origin))
            return movements;
        origin = partMovement;

        partMovement = moveRule.getNextSquare(origin, doubleSquareDirection);
        if(isInvalidPartMovements(partMovement, origin))
            return movements;
        origin = partMovement;

        partMovement = moveRule.getNextSquare(origin, doubleSquareDirection);
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
