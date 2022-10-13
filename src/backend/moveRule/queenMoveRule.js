import { createPieceMoveRule } from "./pieceMoveRule.js";
import { getRookMoveRule } from "./rookMoveRule.js";
import { getBishopMoveRule } from "./bishopMoveRule.js";

function getQueenMoveRule() {
    let moveRule = createPieceMoveRule();
    let straightMovement = getRookMoveRule();
    let diagonalMovement = getBishopMoveRule();

    function getPossibleMovements () {
        straightMovement.updateCurrentPosition(moveRule.getCurrentCoordinate().getPosition(), moveRule.getBoardPieces());
        diagonalMovement.updateCurrentPosition(moveRule.getCurrentCoordinate().getPosition(), moveRule.getBoardPieces());
        let movements = straightMovement.getPossibleMovements();
        movements.push(...diagonalMovement.getPossibleMovements());
        return movements;
    }

    return {
        ...moveRule,
        ...{
            getPossibleMovements
        }
    }
}

export {
    getQueenMoveRule
}
