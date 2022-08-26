import { createAbstractMovement } from "./abstractMovement.js";

function createPieceMovement(){
    let pieceMovement = createAbstractMovement();

    pieceMovement.move = function (origin, destination, pieces) {
        this.updateCurrentPosition(origin, pieces);
        return (this.getPossibleMovements().includes(destination));
    };

    pieceMovement.getKillingMovements = function(origin, pieces) {
        this.updateCurrentPosition(origin, pieces);
        return this.killingMovements();
    }

    pieceMovement.killingMovements = function() {
        let killingMovements = [];
        let possibleMovements = this.getPossibleMovements();

        for (let i in possibleMovements) // Individual movements already check this, loop is unnecessary
            if(this.isOpposingColor(possibleMovements[i]))
                killingMovements.push(possibleMovements[i]);
        return possibleMovements;
    }

    pieceMovement.getPossibleMovements = function () {};
    pieceMovement.doAfterMovement = function () {};

    return pieceMovement;
}

export {
    createPieceMovement
}
