import { createFactory } from "./pieceFactory.js";
import { createPiece, pieceTypes } from "./piece.js";

const factory = createFactory();

factory._getRook = function (position) {
    return createPiece('WR', pieceTypes.white, position);
}

factory._getHorse = function (position) {
    return createPiece('WH', pieceTypes.white, position);
}

factory._getBishop = function (position) {
    return createPiece('WB', pieceTypes.white, position);
}

factory._getQueen = function (position) {
    return createPiece('WQ', pieceTypes.white, position);
}

factory._getKing = function (position) {
    return createPiece('WK', pieceTypes.white, position);
}

factory._getPawn = function (position) {
    return createPiece('WP', pieceTypes.white, position);
}

export {
    factory
}
