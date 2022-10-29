import { PieceBuilderEnum } from '../piece/pieceBuilderEnum.js';

function piecesBuilder(pieceStringLayout){
    let pieces = {};

    function build() {
        let stringCounter = 0;
        for (let i=8; i>0; i--){
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                let position = "abcdefgh"[letter]+i.toString();
                let stringAbbreviation = pieceStringLayout[stringCounter].trim();
                let piece = PieceBuilderEnum[stringAbbreviation].buildPiece(position);
                pieces[position] = piece;
                stringCounter++;
            }
        }
        return pieces;
    }

    return {
        build
    }
}

export {
    piecesBuilder
}
