import { createPieceMoveRule } from "./pieceMoveRule.js";

function getHorseMoveRule() {
    let moveRule = createPieceMoveRule();

    moveRule.getPossibleMovements = function () {
        return this.getLShapes();
    };

    moveRule.getLShapes = function () {
        let movements = [];
        movements.push(...getLShapeMovement('getNextSquareNorth', 'getNextSquareEast'));
        movements.push(...getLShapeMovement('getNextSquareNorth', 'getNextSquareWest'));

        movements.push(...getLShapeMovement('getNextSquareSouth', 'getNextSquareEast'));
        movements.push(...getLShapeMovement('getNextSquareSouth', 'getNextSquareWest'));

        movements.push(...getLShapeMovement('getNextSquareEast', 'getNextSquareNorth'));
        movements.push(...getLShapeMovement('getNextSquareEast', 'getNextSquareSouth'));

        movements.push(...getLShapeMovement('getNextSquareWest', 'getNextSquareNorth'));
        movements.push(...getLShapeMovement('getNextSquareWest', 'getNextSquareSouth'));
        return movements;
    }

    function getLShapeMovement(singleSquareDirection, doubleSquareDirection) {
        let movements = [];
        let origin = moveRule.currentPosition;

        if (moveRule.goesOutOfBounds(singleSquareDirection, origin))
            return movements;
        origin = moveRule[singleSquareDirection](origin);

        if (moveRule.goesOutOfBounds(doubleSquareDirection, origin))
            return movements;
        origin = moveRule[doubleSquareDirection](origin);

        if (moveRule.goesOutOfBounds(doubleSquareDirection, origin))
            return movements;
        origin = moveRule[doubleSquareDirection](origin);

        if (moveRule.isEmptyCoordinate(origin) || moveRule.isOpposingColor(origin))
                movements.push(origin);
        return movements;
    }

    return moveRule;
}

export {
    getHorseMoveRule
}
