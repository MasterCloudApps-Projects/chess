import { createPieceMovement } from "./pieceMovement.js";

function createStraightLineMovement(motionCoordinates) {
    let straightLineMovement = createPieceMovement();

    straightLineMovement.motionCoordinates = motionCoordinates;

    straightLineMovement.getPossibleMovements = function ( ) {
        let possibleMovements = [];
        for (let i=0; i < this.motionCoordinates.length; i++)
            possibleMovements.push(...getMovements(this.motionCoordinates[i]));
        return possibleMovements;
    }

    function getMovements(nextCoordinate) {
        let movements = [];
        let origin = straightLineMovement.currentPosition;
        let nextSquare = straightLineMovement[nextCoordinate](origin);
        let possible = straightLineMovement.isEmptyCoordinate(nextSquare) || straightLineMovement.isOpposingColor(nextSquare);

        while(possible && !movements.includes(nextSquare)) {
            movements.push(nextSquare);
            if (straightLineMovement.isOpposingColor(nextSquare))
                return movements;

            nextSquare = straightLineMovement[nextCoordinate](nextSquare);
            possible = straightLineMovement.isEmptyCoordinate(nextSquare) || straightLineMovement.isOpposingColor(nextSquare);
        }
        return movements;
    }

    return straightLineMovement;
}

export {
    createStraightLineMovement
}
