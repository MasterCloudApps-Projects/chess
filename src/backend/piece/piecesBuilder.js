import { createPiece } from './piece.js';
import { moveRuleMap } from "../moveRule/moveRuleMap.js";
import { createDecoratedPawnPiece } from "./piecePawnDecorator.js";
import { PieceNameMap } from "./pieceNameMap.js";

function piecesBuilder(pieceStringLayout){
    let pieces = {};

    function buildFromLayout() {
        let stringCounter = 0;
        for (let i=8; i>0; i--){
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                let position = "abcdefgh"[letter]+i.toString();
                let stringAbbreviation = pieceStringLayout[stringCounter].trim();
                let piece = getPiece(stringAbbreviation, position);
                pieces[position] = piece;
                stringCounter++;
            }
        }
        return pieces;
    }

    return {
        buildFromLayout
    }
}

function getPiece(abbreviation, position) {
    if (abbreviation.includes('P'))
        return createDecoratedPawnPiece(abbreviation, position);
    return createPiece(abbreviation, position,
        abbreviation == '_'? undefined : moveRuleMap[PieceNameMap[abbreviation[1]]]());
}

export {
    piecesBuilder,
    getPiece
}
