import { PieceColorEnum } from "./pieceColorEnum.js";

function createPieceAbbreviation(abbreviation, color, factoryCall) {

    function getAbbreviation() {
        return abbreviation;
    }

    function getColor() {
        return color;
    }

    function getFactoryCall() {
        return factoryCall;
    }

    return {
        getAbbreviation,
        getColor,
        getFactoryCall,
    };
}

const PieceAbbreviationEnum = Object.freeze({
    BR: createPieceAbbreviation("BR", PieceColorEnum.Black, "getRook"),
    BH: createPieceAbbreviation("BH", PieceColorEnum.Black, "getHorse"),
    BB: createPieceAbbreviation("BB", PieceColorEnum.Black, "getBishop"),
    BQ: createPieceAbbreviation("BQ", PieceColorEnum.Black, "getQueen"),
    BK: createPieceAbbreviation("BK", PieceColorEnum.Black, "getKing"),
    BP: createPieceAbbreviation("BP", PieceColorEnum.Black, "getPawn"),
    WR: createPieceAbbreviation("WR", PieceColorEnum.White, "getRook"),
    WH: createPieceAbbreviation("WH", PieceColorEnum.White, "getHorse"),
    WB: createPieceAbbreviation("WB", PieceColorEnum.White, "getBishop"),
    WQ: createPieceAbbreviation("WQ", PieceColorEnum.White, "getQueen"),
    WK: createPieceAbbreviation("WK", PieceColorEnum.White, "getKing"),
    WP: createPieceAbbreviation("WP", PieceColorEnum.White, "getPawn"),
    _: createPieceAbbreviation("_", PieceColorEnum.Empty, "getEmptyPiece"),
});

export { PieceAbbreviationEnum };
