import { createPiece } from "./piece.js";
import { moveRules } from "../moveRule/moveRules.js";
import { pieceTypes } from './pieceType.js';


function createFactory() {

    function getEmptyPiece(position) {
        return createPiece('_', 'empty', pieceTypes.empty.name, position);
    }

    function getRook(color, position) {
        return createPiece(color.abbreviate + 'R', color.name + ' rook', color.name, position, moveRules.getRookMoveRule());
    }

    function getHorse(color, position) {
        return createPiece(color.abbreviate + 'H', color.name + ' horse', color.name, position, moveRules.getHorseMoveRule());
    }

    function getBishop(color, position) {
        return createPiece(color.abbreviate + 'B', color.name + ' bishop', color.name, position, moveRules.getBishopMoveRule());
    }

    function getQueen(color, position) {
        return createPiece(color.abbreviate + 'Q', color.name + ' queen', color.name, position, moveRules.getQueenMoveRule());
    }

    function getKing(color, position) {
        return createPiece(color.abbreviate + 'K', color.name + ' king', color.name, position, moveRules.getKingMoveRule());
    }

    function getPawn (color, position) {
        //TODO: decorate pawn
        const pawnFirstPositions = { 'BP' : '7', 'WP' : '2' };
        let pawnName = color.abbreviate + 'P';
        return createPiece(pawnName, color.name + 'pawn', color.name, position,
            moveRules.getPawnMoveRule(position.includes(pawnFirstPositions[pawnName]), !color.abbreviate.includes('W')));

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
    createFactory
}
