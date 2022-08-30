import { createFactory } from "./pieceFactory.js";
import { createPiece } from "./piece.js";
import { pieceTypes } from './pieceType.js';

const factory = createFactory();

factory._getRook = function (position) {
    return createPiece('BR', 'black rook', pieceTypes.black, position);
}

factory._getHorse = function (position) {
    return createPiece('BH', 'black horse', pieceTypes.black, position);
}

factory._getBishop = function (position) {
    return createPiece('BB', 'black bishop', pieceTypes.black, position);
}

factory._getQueen = function (position) {
    return createPiece('BQ', 'black queen', pieceTypes.black, position);
}

factory._getKing = function (position) {
    return createPiece('BK', 'black king', pieceTypes.black, position);
}

factory._getPawn = function (position) {
    return createPiece('BP', 'black pawn', pieceTypes.black, position);
}

export {
    factory
}
