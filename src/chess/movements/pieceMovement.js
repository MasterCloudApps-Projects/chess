import { createMovement } from "./movement.js";

function createPieceMovement(){
    let pieceMovement = createMovement();

    pieceMovement.getPossibleMovements = function () {};

    pieceMovement.doAfterMovement = function () {};

    pieceMovement.killingMovements = function() {
        let killingMovements = [];
        let possibleMovements = this.getPossibleMovements();

        for (let i in possibleMovements)
            if(this.isOpposingColor(possibleMovements[i]))
                killingMovements.push(possibleMovements[i]);
        return killingMovements;
    }

    pieceMovement.move = function (origin, destination, pieces) {
        this.updateCurrentPosition(origin, pieces);
        return (this.getPossibleMovements().includes(destination));
    };

    pieceMovement.getKillingMovements = function(origin, pieces) {
        this.updateCurrentPosition(origin, pieces);
        return this.killingMovements();
    }

    return pieceMovement;
}

export {
    createPieceMovement
}
