import { createPiece } from './piece.js';
import { moveRuleMap } from '../moveRule/moveRuleMap.js';
import { PieceColorEnum } from "./pieceColorEnum.js";

function createDecoratedPawnPiece(abbreviation, position) {
    const pawnFirstPositions = { B : '7', W : '2' };
    const color = abbreviation[0] === 'W' ? PieceColorEnum.White : PieceColorEnum.Black;

    let piece = createPiece(
        abbreviation,
        position,
        moveRuleMap.pawn(
            position.includes(pawnFirstPositions[color.getAbbreviation()]), !color.isWhite()));
    piece.isQueen = false;

    function isPossibleMove(destination, pieces) {
        let isItPossible = piece.isPossibleMove(destination, pieces);
        return isItPossible;
    }

    return {
        ...piece,
        ... {
            isPossibleMove
        }
    }
}

export {
    createDecoratedPawnPiece
}
