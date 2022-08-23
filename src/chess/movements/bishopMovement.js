import { createMovement } from "./movement.js";

/** Bishop movement strategy.
*   The bishop moves in a  straight diagonal line to any square of the board
*   until it is blocked by another piece
*/

function getBishopMovement() {
    let bishopMovement = createMovement();

    bishopMovement.getErrorMessages = function () {
        return "Invalid bishop movement";
    }

    bishopMovement.move = function (destination) {
        let movements = this.getPossibleMovements();
        if(!movements.includes(destination)) {
            return false;
        }
        return true;
    }

    bishopMovement.getPossibleMovements = function () {
        let possibleMovements = [];
        possibleMovements.push(...this.getMovements('getNextNorthEastDiagonal'));
        possibleMovements.push(...this.getMovements('getNextNorthWestDiagonal'));
        possibleMovements.push(...this.getMovements('getNextSouthEastDiagonal'));
        possibleMovements.push(...this.getMovements('getNextSouthWestDiagonal'));
        return possibleMovements;
    }

    bishopMovement.getMovements = function (nextCoordinate) {
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
    
    return bishopMovement;
}


export {
    getBishopMovement
}
