import { createPiece } from "./piece.js";
import { moveRuleMap } from "../moveRule/moveRuleMap.js";
import { PieceColorEnum } from './pieceColorEnum.js';

function createPieceFactory() {

    function getPiece(abbreviation, color, position, pieceName) {
        const pawnFirstPositions = { BP : '7', WP : '2' };
        switch (pieceName) {
            case 'empty':
                return createPiece('_', pieceName, PieceColorEnum.Empty, position);
            case 'pawn':
                return createPiece(abbreviation, color.getLiteral()+' '+pieceName, color, position,
                    moveRuleMap.pawn(position.includes(pawnFirstPositions[abbreviation]), !color.isWhite()));
            default:
                return createPiece(abbreviation, color.getLiteral()+' '+pieceName, color, position, moveRuleMap[pieceName]());
        }
    }

    return {
        getPiece
    };
}

export {
    createPieceFactory
}
