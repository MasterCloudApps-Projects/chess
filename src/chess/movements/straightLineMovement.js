import { createMovement } from "./movement.js";

function createStraightLineMovement(motionCoordinates, messageError) {
    let straightLineMovement = createMovement();

    straightLineMovement.motionCoordinates = motionCoordinates;
    straightLineMovement.messageError = messageError;

    straightLineMovement.getErrorMessages = function () {
        return this.messageError;
    }

    straightLineMovement.move = function (destination) {
        let movements = this.getPossibleMovements();
        if(!movements.includes(destination)) {
            return false;
        }
        return true;
    }

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
