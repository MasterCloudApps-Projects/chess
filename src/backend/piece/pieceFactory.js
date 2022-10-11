import { createPiece } from "./piece.js";
import { moveRules } from "../moveRule/moveRules.js";
import { PieceColorEnum } from './pieceColorEnum.js';

function createPieceFactory() {

    function getEmptyPiece(position) {
        return createPiece('_', 'empty', PieceColorEnum.Empty, position);
    }

    function getRook(abbreviation, color, position) {
        return createPiece(abbreviation, color.getLiteral()+' rook', color, position, moveRules.getRookMoveRule());
    }

    function getHorse(abbreviation, color, position) {
        return createPiece(abbreviation, color.getLiteral()+' horse', color, position, moveRules.getHorseMoveRule());
    }

    function getBishop(abbreviation, color, position) {
        return createPiece(abbreviation, color.getLiteral()+' bishop', color, position, moveRules.getBishopMoveRule());
    }

    function getQueen(abbreviation, color, position) {
        return createPiece(abbreviation, color.getLiteral()+' queen', color, position, moveRules.getQueenMoveRule());
    }

    function getKing(abbreviation, color, position) {
        return createPiece(abbreviation, color.getLiteral()+' king', color, position, moveRules.getKingMoveRule());
    }

    function getPawn (abbreviation, color, position) {
        //TODO: decorate pawn
        const pawnFirstPositions = { BP : '7', WP : '2' };
        return createPiece(abbreviation, color.getLiteral()+' king', color, position,
            moveRules.getPawnMoveRule(position.includes(pawnFirstPositions[abbreviation]), !color.getAbbreviation().includes('W')));
    }

    return {
        getEmptyPiece,
        getRook,
        getHorse,
        getBishop,
        getQueen,
        getKing,
        getPawn
    };
}

export {
    createPieceFactory
}
