import { PieceColorEnum } from "./pieceColorEnum.js";

function createPieceAbbreviation(abbreviation, color, pieceName) {

    function getAbbreviation() {
        return abbreviation;
    }

    function getColor() {
        return color;
    }

    function getPieceName() {
        return pieceName;
    }

    return {
        getAbbreviation,
        getColor,
        getPieceName,
    };
}

const PieceAbbreviationEnum = Object.freeze({
    BR: createPieceAbbreviation("BR", PieceColorEnum.Black, "rook"),
    BH: createPieceAbbreviation("BH", PieceColorEnum.Black, "horse"),
    BB: createPieceAbbreviation("BB", PieceColorEnum.Black, "bishop"),
    BQ: createPieceAbbreviation("BQ", PieceColorEnum.Black, "queen"),
    BK: createPieceAbbreviation("BK", PieceColorEnum.Black, "king"),
    BP: createPieceAbbreviation("BP", PieceColorEnum.Black, "pawn"),
    WR: createPieceAbbreviation("WR", PieceColorEnum.White, "rook"),
    WH: createPieceAbbreviation("WH", PieceColorEnum.White, "horse"),
    WB: createPieceAbbreviation("WB", PieceColorEnum.White, "bishop"),
    WQ: createPieceAbbreviation("WQ", PieceColorEnum.White, "queen"),
    WK: createPieceAbbreviation("WK", PieceColorEnum.White, "king"),
    WP: createPieceAbbreviation("WP", PieceColorEnum.White, "pawn"),
    _: createPieceAbbreviation("_", PieceColorEnum.Empty, "empty"),
});

export { PieceAbbreviationEnum };
