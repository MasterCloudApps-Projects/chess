import { createPieceMoveRule } from "./pieceMoveRule.js";

function getHorseMoveRule() {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        return getLShapes();
    };

    function getLShapes () {
        let movements = [];
        movements.push(...getLShapeMovement(moveRule.getNextSquareNorth, moveRule.getNextSquareEast));
        movements.push(...getLShapeMovement(moveRule.getNextSquareNorth, moveRule.getNextSquareWest));

        movements.push(...getLShapeMovement(moveRule.getNextSquareSouth, moveRule.getNextSquareEast));
        movements.push(...getLShapeMovement(moveRule.getNextSquareSouth, moveRule.getNextSquareWest));

        movements.push(...getLShapeMovement(moveRule.getNextSquareEast, moveRule.getNextSquareNorth));
        movements.push(...getLShapeMovement(moveRule.getNextSquareEast, moveRule.getNextSquareSouth));

        movements.push(...getLShapeMovement(moveRule.getNextSquareWest, moveRule.getNextSquareNorth));
        movements.push(...getLShapeMovement(moveRule.getNextSquareWest, moveRule.getNextSquareSouth));
        return movements;
    }

    function getLShapeMovement(singleSquareDirection, doubleSquareDirection) {
        let movements = [];
        let origin = moveRule.getCurrentPosition();

        if (moveRule.goesOutOfBounds(singleSquareDirection, origin))
            return movements;
        origin = singleSquareDirection(origin);

        if (moveRule.goesOutOfBounds(doubleSquareDirection, origin))
            return movements;
        origin = doubleSquareDirection(origin);

        if (moveRule.goesOutOfBounds(doubleSquareDirection, origin))
            return movements;
        origin = doubleSquareDirection(origin);

        if (moveRule.isEmptyCoordinate(origin) || moveRule.isOpposingColor(origin))
                movements.push(origin);
        return movements;
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
