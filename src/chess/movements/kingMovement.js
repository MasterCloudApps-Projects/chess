import { createMovement } from "./movement.js";

/** King movement strategy.
*   The king can move one square north, south, east or west if that square is empty.
*/

function getKingMovement() {
    let kingMovement = createMovement();

    kingMovement.getErrorMessages = function () {
        return "Invalid king movement";
    }

    kingMovement.getPossibleMovements = function () {
        let possibleMovements = [];
        possibleMovements.push(...this.getMovements('getNextSquareNorth'));
        possibleMovements.push(...this.getMovements('getNextSquareSouth'));
        possibleMovements.push(...this.getMovements('getNextSquareEast'));
        possibleMovements.push(...this.getMovements('getNextSquareWest'));

        possibleMovements.push(...this.getMovements('getNextNorthEastDiagonal'));
        possibleMovements.push(...this.getMovements('getNextSouthEastDiagonal'));
        possibleMovements.push(...this.getMovements('getNextNorthWestDiagonal'));
        possibleMovements.push(...this.getMovements('getNextSouthWestDiagonal'));
        return possibleMovements;
    }

    kingMovement.getMovements = function (nextCoordinate) {
        let movements = [];
        let origin = this.currentPosition;
        let nextSquare = this[nextCoordinate](origin);
        if(this.isEmptyCoordinate(nextSquare) || this.isOpposingColor(nextSquare))
            movements.push(nextSquare)
        return movements;
    }

    return kingMovement;
}


export {
    getKingMovement
}
