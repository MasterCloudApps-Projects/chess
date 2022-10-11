import { createPiece } from "./piece.js";
import { createDecoratedPawnPiece } from "./piecePawnDecorator.js";
import { moveRuleMap } from "../moveRule/moveRuleMap.js";
import { PieceColorEnum } from './pieceColorEnum.js';

function createPieceFactory() {

    function getPiece(abbreviation, color, position, pieceName) {
        switch (pieceName) {
            case 'empty':
                return createPiece('_', pieceName, PieceColorEnum.Empty, position);
            case 'pawn':
                return createDecoratedPawnPiece(color, position);
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
