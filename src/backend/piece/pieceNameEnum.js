import { PieceTypeEnum } from "./pieceTypeEnum.js";

function createPieceName(name, color, factoryCall) {
    function getName() {
        return name;
    }

    function getColor() {
        return color;
    }

    function getFactoryCall() {
        return factoryCall;
    }

    return {
        getName,
        getColor,
        getFactoryCall,
    };
}

const PieceNameEnum = Object.freeze({
    BR: createPieceName("BR", PieceTypeEnum.Black, "getRook"),
    BH: createPieceName("BH", PieceTypeEnum.Black, "getHorse"),
    BB: createPieceName("BB", PieceTypeEnum.Black, "getBishop"),
    BQ: createPieceName("BQ", PieceTypeEnum.Black, "getQueen"),
    BK: createPieceName("BK", PieceTypeEnum.Black, "getKing"),
    BP: createPieceName("BP", PieceTypeEnum.Black, "getPawn"),
    WR: createPieceName("WR", PieceTypeEnum.White, "getRook"),
    WH: createPieceName("WH", PieceTypeEnum.White, "getHorse"),
    WB: createPieceName("WB", PieceTypeEnum.White, "getBishop"),
    WQ: createPieceName("WQ", PieceTypeEnum.White, "getQueen"),
    WK: createPieceName("WK", PieceTypeEnum.White, "getKing"),
    WP: createPieceName("WP", PieceTypeEnum.White, "getPawn"),
    _: createPieceName("WR", PieceTypeEnum.Empty, "getEmptyPiece"),
});

export { PieceNameEnum };
