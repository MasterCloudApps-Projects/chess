import { createBoard } from '../main/board.js';
import { getPiece } from '../piece/piecesBuilder.js';

function boardBuilder(initialDispositionParam, dimensionParam, letterParam) {
    let initialDisposition = initialDispositionParam;
    let dimension = dimensionParam;
    let letters = letterParam;
    let board = createBoard();

    function fromPieceLayoutString() {
        initialDisposition = initialDisposition.trim().split('\n').join('-').split('-');
        board.setPieces(buildPieces());
        return this;
    }

    function buildPieces(){
        let pieces = {};
        let stringCounter = 0;
        for (let i=dimension; i>0; i--){
            for (let letter = 0; letter < letters.length; letter++) {
                let position = letters[letter]+i.toString();
                let stringAbbreviation = initialDisposition[stringCounter].trim();
                let piece = getPiece(stringAbbreviation, position);
                pieces[position] = piece;
                stringCounter++;
            }
        }
        return pieces;
    }

    function build() {
        fromPieceLayoutString();
        return board;
    }

    return {
        build
    }
}

export {
    boardBuilder
}

