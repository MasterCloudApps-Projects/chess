import { createMovement } from "./movement.js";

function createPieceMovement(){
    let pieceMovement = createMovement();

    pieceMovement.possibleMovements;

    //TODO ?
    pieceMovement.killingMovements = function(){
        let killingMovements = [];
        for (let i in this.possibleMovements)
            if(this.isOpposingColor(this.possibleMovements[i]))
                killingMovements.push(this.possibleMovements[i]);
        return killingMovements;
    }

    return pieceMovement;
}

export {
    createPieceMovement
}
