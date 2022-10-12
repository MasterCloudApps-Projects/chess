import { PieceColorEnum } from "./pieceColorEnum.js";
import { createPiece } from './piece.js';
import { moveRuleMap } from "../moveRule/moveRuleMap.js";
import { createDecoratedPawnPiece } from "./piecePawnDecorator.js";
import { PieceAbbreviationEnum } from "./pieceAbbreviationEnum.js";

function createEmptyPiece(position) {
    return createPiece('_', 'empty', PieceColorEnum.Empty, position);
}

function createFigurePiece(pieceName, pieceAbbreviation, color, position) {
    return createPiece(pieceAbbreviation.getAbbreviation(), color.getLiteral()+' '+pieceName, color, position, moveRuleMap[pieceName]());
}

function createPawnPiece(color, position){
    return createDecoratedPawnPiece(color, position);
}


const PieceCreatorEnum = Object.freeze({
    BR: (position) => createFigurePiece("rook", PieceAbbreviationEnum.BR, PieceColorEnum.Black, position),
    BH: (position) => createFigurePiece("horse", PieceAbbreviationEnum.BH, PieceColorEnum.Black, position),
    BB: (position) => createFigurePiece("bishop", PieceAbbreviationEnum.BB, PieceColorEnum.Black, position),
    BQ: (position) => createFigurePiece("queen", PieceAbbreviationEnum.BQ, PieceColorEnum.Black, position),
    BK: (position) => createFigurePiece("king", PieceAbbreviationEnum.BK, PieceColorEnum.Black, position),
    BP: (position) => createPawnPiece(PieceColorEnum.Black, position),
    WR: (position) => createFigurePiece("rook", PieceAbbreviationEnum.WR, PieceColorEnum.White, position),
    WH: (position) => createFigurePiece("horse", PieceAbbreviationEnum.WH, PieceColorEnum.White, position),
    WB: (position) => createFigurePiece("bishop", PieceAbbreviationEnum.WB, PieceColorEnum.White, position),
    WQ: (position) => createFigurePiece("queen", PieceAbbreviationEnum.WQ, PieceColorEnum.White, position),
    WK: (position) => createFigurePiece("king", PieceAbbreviationEnum.WK, PieceColorEnum.White, position),
    WP: (position) => createPawnPiece(PieceColorEnum.White, position),
    _: (position) => createEmptyPiece(position),
});

export { PieceCreatorEnum };
