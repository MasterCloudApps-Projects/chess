import { createPiece } from './piece.js';
import { moveRuleMap } from "../moveRule/moveRuleMap.js";
import { PieceColorEnum } from "./pieceColorEnum.js";
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
    const pawnFirstPositions = { B : '7', W : '2' };
    const color = abbreviation[0] === 'W' ? PieceColorEnum.White : PieceColorEnum.Black;
    return createPiece(
        abbreviation,
        position,
        abbreviation == '_'? undefined : moveRuleMap[PieceNameMap[abbreviation[1]]](
            position.includes(pawnFirstPositions[color.getAbbreviation()]),
            !color.isWhite()
        ));
}

export {
    piecesBuilder,
    getPiece
}
