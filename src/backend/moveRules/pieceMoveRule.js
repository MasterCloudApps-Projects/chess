import { createAbstractMoveRule } from "./abstractMoveRule.js";

function createPieceMoveRule(){
    let pieceMovement = createAbstractMoveRule();

    pieceMovement.isPossibleMove = function (origin, destination, pieces) {
        this.updateCurrentPosition(origin, pieces);
        return (this.getPossibleMovements().includes(destination));
    };

    pieceMovement.getAttackMovements = function(origin, pieces) {
        this.updateCurrentPosition(origin, pieces);
        return this.attackMovements();
    }

    pieceMovement.attackMovements = function() {
        return this.getPossibleMovements();
    }

    pieceMovement.getPossibleMovements = function () {};
    pieceMovement.doAfterMovement = function () {};

    return pieceMovement;
}

export {
    createPieceMoveRule
}
