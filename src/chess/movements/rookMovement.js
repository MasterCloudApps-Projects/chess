import { createMovement } from "./movement.js";

/** Rook movement strategy.
*   The rook moves in a straight line horizontally or vertically to any square of the board
*   until it is blocked by another piece
*/

function getRookMovement() {
    let rookMovement = createMovement();

    rookMovement.getErrorMessages = function () {
        return "Invalid rook movement";
    }

    rookMovement.move = function (destination) {
        let movements = this.getPossibleMovements();
        if(!movements.includes(destination)) {
            return false;
        }
        return true;
    }

    rookMovement.getPossibleMovements = function () {
        let possibleMovements = [];
        possibleMovements.push(...this.getMovements('getNextSquareNorth'));
        possibleMovements.push(...this.getMovements('getNextSquareSouth'));
        possibleMovements.push(...this.getMovements('getNextSquareEast'));
        possibleMovements.push(...this.getMovements('getNextSquareWest'));
        return possibleMovements;
    }

    rookMovement.getMovements = function (nextCoordinate) {
        let movements = [];
        let origin = this.currentPosition;
        let nextSquare = this[nextCoordinate](origin);
        let possible = this.isEmptyCoordinate(nextSquare) || this.isOpposingColor(nextSquare);

        while(nextSquare && possible && !movements.includes(nextSquare)){
            movements.push(nextSquare);
            nextSquare = this[nextCoordinate](nextSquare);
            possible = this.isEmptyCoordinate(nextSquare) || this.isOpposingColor(nextSquare);
        }
        return movements;
    }
    return rookMovement;
}


export {
    getRookMovement
}
