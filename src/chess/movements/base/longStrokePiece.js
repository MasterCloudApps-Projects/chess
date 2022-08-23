import { createMovement } from "../movement.js";

/** Bishop movement strategy.
*   The bishop moves in a  straight diagonal line to any square of the board
*   until it is blocked by another piece
*/

function createLongStrockPiece(motionCoordinates, messageError) {
    let longStrockPiece = createMovement();

    longStrockPiece.motionCoordinates = motionCoordinates;
    longStrockPiece.messageError = messageError;

    longStrockPiece.getErrorMessages = function () {
        return this.messageError;
    }

    longStrockPiece.move = function (destination) {
        let movements = this.getPossibleMovements();
        if(!movements.includes(destination)) {
            return false;
        }
        return true;
    }

    longStrockPiece.getPossibleMovements = function ( ) {
        let possibleMovements = [];

        for (let i=0; i < this.motionCoordinates.length; i++){
            possibleMovements.push(...this.getMovements(this.motionCoordinates[i]));
        }

        return possibleMovements;
    }

    longStrockPiece.getMovements = function (nextCoordinate) {
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

    return longStrockPiece;
}


export {
    createLongStrockPiece
}
