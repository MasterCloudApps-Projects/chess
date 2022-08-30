import { createPieceMovement } from "../pieceMovement.js";
import { getRookMovement } from "./rookMovement.js";
import { getBishopMovement } from "./bishopMovement.js";

function getQueenMovement() {
    let queenMovement = createPieceMovement();
    let straightMovement = getRookMovement();
    let diagonalMovement = getBishopMovement();

    queenMovement.getPossibleMovements = function () {
        straightMovement.updateCurrentPosition(this.currentPosition, this.boardPieces);
        diagonalMovement.updateCurrentPosition(this.currentPosition, this.boardPieces);
        let movements = straightMovement.getPossibleMovements();
        movements.push(...diagonalMovement.getPossibleMovements());
        return movements;
    }

    return queenMovement;
}

export {
    getQueenMovement
}
