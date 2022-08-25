import { createFactory } from "./pieceFactory.js";
import { createPiece, pieceTypes } from "./piece.js";

const factory = createFactory();

factory._getRook = function (position) {
    return createPiece('WR','white rook', pieceTypes.white, position);
}

factory._getHorse = function (position) {
    return createPiece('WH','white horse', pieceTypes.white, position);
}

factory._getBishop = function (position) {
    return createPiece('WB', 'white bishop', pieceTypes.white, position);
}

factory._getQueen = function (position) {
    return createPiece('WQ', 'white queen', pieceTypes.white, position);
}

factory._getKing = function (position) {
    return createPiece('WK', 'white king', pieceTypes.white, position);
}

factory._getPawn = function (position) {
    return createPiece('WP', 'white pawn', pieceTypes.white, position);
}

export {
    factory
}
