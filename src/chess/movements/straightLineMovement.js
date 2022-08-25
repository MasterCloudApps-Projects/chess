import { createPieceMovement } from "./pieceMovement.js";

function createStraightLineMovement(motionCoordinates) {
    let straightLineMovement = createPieceMovement();

    straightLineMovement.motionCoordinates = motionCoordinates;

    straightLineMovement.getPossibleMovements = function ( ) {
        let possibleMovements = [];

        for (let i=0; i < this.motionCoordinates.length; i++){
            possibleMovements.push(...this.getMovements(this.motionCoordinates[i]));
        }

        return possibleMovements;
    }

    straightLineMovement.getMovements = function (nextCoordinate) {
        let movements = [];
        let origin = this.currentPosition;
        let nextSquare = this[nextCoordinate](origin);
        let possible = this.isEmptyCoordinate(nextSquare) || this.isOpposingColor(nextSquare);

        while(possible && !movements.includes(nextSquare)) {
            movements.push(nextSquare);
            if (this.isOpposingColor(nextSquare))
                return movements;

            nextSquare = this[nextCoordinate](nextSquare);
            possible = this.isEmptyCoordinate(nextSquare) || this.isOpposingColor(nextSquare);
        }
        return movements;
    }

    return straightLineMovement;
}

export {
    createStraightLineMovement
}
