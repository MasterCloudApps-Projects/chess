import { createFactory } from "./pieceFactory.js";
import { createPiece, pieceTypes } from "./piece.js";

const factory = createFactory();

factory._getRook = function () {
    return createPiece('WR', pieceTypes.white);
}

factory._getHorse = function () {
    return createPiece('WH', pieceTypes.white);
}

factory._getBishop = function () {
    return createPiece('WB', pieceTypes.white);
}

factory._getQueen = function () {
    return createPiece('WQ', pieceTypes.white);
}

factory._getKing = function () {
    return createPiece('WK', pieceTypes.white);
}

factory._getPawn = function () {
    return createPiece('WP', pieceTypes.white);
}

export {
    factory
}
