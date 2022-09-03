import { createPieceMovement } from "../pieceMovement.js";

function getHorseMovement() {
    let horseMovement = createPieceMovement();

    horseMovement.getPossibleMovements = function () {
        return this.getLShapes();
    };

    horseMovement.getLShapes = function () {
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
        let origin = horseMovement.currentPosition;

        if (horseMovement.goesOutOfBounds(singleSquareDirection, origin))
            return movements;
        origin = horseMovement[singleSquareDirection](origin);

        if (horseMovement.goesOutOfBounds(doubleSquareDirection, origin))
            return movements;
        origin = horseMovement[doubleSquareDirection](origin);

        if (horseMovement.goesOutOfBounds(doubleSquareDirection, origin))
            return movements;
        origin = horseMovement[doubleSquareDirection](origin);

        if (horseMovement.isEmptyCoordinate(origin) || horseMovement.isOpposingColor(origin))
                movements.push(origin);
        return movements;
    }

    return horseMovement;
}

export {
    getHorseMovement
}
