import { createMovement } from "./movement.js";

function getHorseMovement() {
    let horseMovement = createMovement();

    horseMovement.move = function (destination) {
        let movements = this.getPossibleMovements();
        if(!movements.includes(destination)) {
            console.log("Invalid horse movement"); //TODO: exception
            return false;
        }
        return true;
    };

    horseMovement.getPossibleMovements = function () {
        return this.getLShapes();
    };

    horseMovement.getLShapes = function () {
        let movements = [];
        movements.push(...this.getLShapeMovement('getNextSquareNorth', 'getNextSquareEast'));
        movements.push(...this.getLShapeMovement('getNextSquareNorth', 'getNextSquareWest'));

        movements.push(...this.getLShapeMovement('getNextSquareSouth', 'getNextSquareEast'));
        movements.push(...this.getLShapeMovement('getNextSquareSouth', 'getNextSquareWest'));

        movements.push(...this.getLShapeMovement('getNextSquareEast', 'getNextSquareNorth'));
        movements.push(...this.getLShapeMovement('getNextSquareEast', 'getNextSquareSouth'));

        movements.push(...this.getLShapeMovement('getNextSquareWest', 'getNextSquareNorth'));
        movements.push(...this.getLShapeMovement('getNextSquareWest', 'getNextSquareSouth'));
        return movements;
    }

    horseMovement.getLShapeMovement = function (singleSquareDirection, doubleSquareDirection) {
        let movements = [];
        let origin = this.currentPosition;

        if (this.goesOutOfBounds(singleSquareDirection, origin))
            return movements;
        origin = this[singleSquareDirection](origin);

        if (this.goesOutOfBounds(doubleSquareDirection, origin))
            return movements;
        origin = this[doubleSquareDirection](origin);

        if (this.goesOutOfBounds(doubleSquareDirection, origin))
            return movements;
        origin = this[doubleSquareDirection](origin);

        if (this.isEmptyCoordinate(origin) || this.isOpposingColor(origin))
                movements.push(origin);
        return movements;
    }

    return horseMovement;
}

export {
    getHorseMovement
}
