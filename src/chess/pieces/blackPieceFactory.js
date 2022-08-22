import { createFactory } from "./pieceFactory.js";
import { createPiece, pieceTypes } from "./piece.js";

const factory = createFactory();

factory._getRook = function () {
    return createPiece('BR', pieceTypes.black);
}

factory._getHorse = function () {
    return createPiece('BH', pieceTypes.black);
}

factory._getBishop = function () {
    return createPiece('BB', pieceTypes.black);
}

factory._getQueen = function () {
    return createPiece('BQ', pieceTypes.black);
}

factory._getKing = function () {
    return createPiece('BK', pieceTypes.black);
}

factory._getPawn = function () {
    return createPiece('BP', pieceTypes.black);
}

export {
    factory
}
