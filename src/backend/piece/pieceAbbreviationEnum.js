import { PieceColorEnum } from "./pieceColorEnum.js";
import { createPiece } from './piece.js';
import { moveRuleMap } from "../moveRule/moveRuleMap.js";
import { createDecoratedPawnPiece } from "./piecePawnDecorator.js";

function createPieceAbbreviation(abbreviation, color, pieceName, buildPieceCall) {

    function getAbbreviation() {
        return abbreviation;
    }

    function getColor() {
        return color;
    }

    function getPieceName() {
        return pieceName;
    }

    function buildPiece(position) {
        if (buildPieceCall != undefined)
            return buildPieceCall(position);
        return createPiece(abbreviation, color.getLiteral()+' '+pieceName, color, position, moveRuleMap[pieceName]());
    }

    return {
        getAbbreviation,
        getColor,
        getPieceName,
        buildPiece
    };
}

const PieceAbbreviationEnum = Object.freeze({
    BR: createPieceAbbreviation("BR", PieceColorEnum.Black, "rook"),
    BH: createPieceAbbreviation("BH", PieceColorEnum.Black, "horse"),
    BB: createPieceAbbreviation("BB", PieceColorEnum.Black, "bishop"),
    BQ: createPieceAbbreviation("BQ", PieceColorEnum.Black, "queen"),
    BK: createPieceAbbreviation("BK", PieceColorEnum.Black, "king"),
    BP: createPieceAbbreviation("BP", PieceColorEnum.Black, "pawn",
        (position) => createDecoratedPawnPiece(PieceColorEnum.Black, position)),
    WR: createPieceAbbreviation("WR", PieceColorEnum.White, "rook"),
    WH: createPieceAbbreviation("WH", PieceColorEnum.White, "horse"),
    WB: createPieceAbbreviation("WB", PieceColorEnum.White, "bishop"),
    WQ: createPieceAbbreviation("WQ", PieceColorEnum.White, "queen"),
    WK: createPieceAbbreviation("WK", PieceColorEnum.White, "king"),
    WP: createPieceAbbreviation("WP", PieceColorEnum.White, "pawn",
        (position) => createDecoratedPawnPiece(PieceColorEnum.White, position)),
    _: createPieceAbbreviation("_", PieceColorEnum.Empty, "empty",
        (position) => createPiece('_', 'empty', PieceColorEnum.Empty, position)),
});

export { PieceAbbreviationEnum };
