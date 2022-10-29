import { createPiece } from './piece.js';
import { moveRuleMap } from "../moveRule/moveRuleMap.js";
import { createDecoratedPawnPiece } from "./piecePawnDecorator.js";
import { PieceNameEnum } from "./pieceNameEnum.js";

function createCommonPiece(abbreviation) {
    function buildPiece(position) {
        return createPiece(abbreviation, position, moveRuleMap[PieceNameEnum[abbreviation[1]]]());
    }

    return {
        buildPiece
    };
}

function createEmptyPiece(abbreviation) {
    function buildPiece(position) {
        return createPiece(abbreviation, position);
    }

    return {
        buildPiece
    };
}

function createPawnPiece(abbreviation) {
    function buildPiece(position) {
        return createDecoratedPawnPiece(abbreviation, position);
    }

    return {
        buildPiece
    };
}

const PieceBuilderEnum = Object.freeze({
    BR: createCommonPiece("BR"),
    BH: createCommonPiece("BH"),
    BB: createCommonPiece("BB"),
    BQ: createCommonPiece("BQ"),
    BK: createCommonPiece("BK"),
    BP: createPawnPiece("BP"),
    WR: createCommonPiece("WR"),
    WH: createCommonPiece("WH"),
    WB: createCommonPiece("WB"),
    WQ: createCommonPiece("WQ"),
    WK: createCommonPiece("WK"),
    WP: createPawnPiece("WP"),
    _: createEmptyPiece("_"),
});

export { PieceBuilderEnum };
