import { createPiece } from "./piece.js";
import { moveRules } from "../moveRule/moveRules.js";
import { PieceTypeEnum } from './pieceTypeEnum.js';


function createFactory() {

    function getEmptyPiece(position) {
        return createPiece('_', 'empty', PieceTypeEnum.Empty, position);
    }

    function getRook(color, position) {
        return createPiece(getNamePiece(color, 'R'), getFullNamePiece(color, 'rook'), color, position, moveRules.getRookMoveRule());
    }

    function getHorse(color, position) {
        return createPiece(getNamePiece(color, 'H'), getFullNamePiece(color, 'horse'), color, position, moveRules.getHorseMoveRule());
    }

    function getBishop(color, position) {
        return createPiece(getNamePiece(color, 'B'), getFullNamePiece(color, 'bishop'), color, position, moveRules.getBishopMoveRule());
    }

    function getQueen(color, position) {
        return createPiece(getNamePiece(color, 'Q'), getFullNamePiece(color, 'queen'), color, position, moveRules.getQueenMoveRule());
    }

    function getKing(color, position) {
        return createPiece(getNamePiece(color, 'K'), getFullNamePiece(color, 'king'), color, position, moveRules.getKingMoveRule());
    }

    function getPawn (color, position) {
        //TODO: decorate pawn
        const pawnFirstPositions = { 'BP' : '7', 'WP' : '2' };
        let pawnName = getNamePiece(color, 'P');
        return createPiece(pawnName, getFullNamePiece(color, 'pawn'), color, position,
            moveRules.getPawnMoveRule(position.includes(pawnFirstPositions[pawnName]), !color.getAbbreviation().includes('W')));
    }

    function getNamePiece(color, pieceAbbreviation){
        return color.getAbbreviation() + pieceAbbreviation;
    }

    function getFullNamePiece(color, name){
        return color.name + ' ' + name
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
