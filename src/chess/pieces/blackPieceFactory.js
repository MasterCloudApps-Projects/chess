import { createFactory } from "./pieceFactory.js";
import { createPiece, pieceTypes } from "./piece.js";

const factory = createFactory();

factory._getRook = function (position) {
    return createPiece('BR', pieceTypes.black, position);
}

factory._getHorse = function (position) {
    return createPiece('BH', pieceTypes.black, position);
}

factory._getBishop = function (position) {
    return createPiece('BB', pieceTypes.black, position);
}

factory._getQueen = function (position) {
    return createPiece('BQ', pieceTypes.black, position);
}

factory._getKing = function (position) {
    return createPiece('BK', pieceTypes.black, position);
}

factory._getPawn = function (position) {
    return createPiece('BP', pieceTypes.black, position);
}

export {
    factory
}
