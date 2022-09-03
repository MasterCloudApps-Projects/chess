import { createPieceMoveRule } from "./pieceMoveRule.js";
import { getRookMoveRule } from "./rookMoveRule.js";
import { getBishopMoveRule } from "./bishopMoveRule.js";

function getQueenMoveRule() {
    let moveRule = createPieceMoveRule();
    let straightMovement = getRookMoveRule();
    let diagonalMovement = getBishopMoveRule();

    moveRule.getPossibleMovements = function () {
        straightMovement.updateCurrentPosition(this.currentPosition, this.boardPieces);
        diagonalMovement.updateCurrentPosition(this.currentPosition, this.boardPieces);
        let movements = straightMovement.getPossibleMovements();
        movements.push(...diagonalMovement.getPossibleMovements());
        return movements;
    }

    return moveRule;
}

export {
    getQueenMoveRule
}
