import { createBoard } from './board.js';
import { pieceNames, pieceTypes } from './pieces/piece.js';
import { factory as blackPieceFactory } from './pieces/blackPieceFactory.js';
import { factory as whitePieceFactory } from './pieces/whitePieceFactory.js';

function boardBuilder() {
    let board = createBoard();

    function fromPieceLayoutString(pieceStringLayout) {
        pieceStringLayout = pieceStringLayout.trim().split('\n').join('-').split('-');
        let stringCounter = 0, pieceName;
        for (let i=8; i>0; i--)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                pieceName = pieceNames[pieceStringLayout[stringCounter].trim()];

                let piece = blackPieceFactory[pieceName.call]();
                if (pieceName.type == pieceTypes.white)
                    piece = whitePieceFactory[pieceName.call]();

                piece.position = "abcdefgh"[letter]+i.toString();
                board.pieces[piece.position] = piece;
                stringCounter++;
            }

        return this;
    }

    function usingInitialPieceDisposition() {
        fromPieceLayoutString(`
            BR-BH-BB-BK-BQ-BB-BH-BR
            BP-BP-BP-BP-BP-BP-BP-BP
            _-_-_-_-_-_-_-_
            _-_-_-_-_-_-_-_
            _-_-_-_-_-_-_-_
            _-_-_-_-_-_-_-_
            WP-WP-WP-WP-WP-WP-WP-WP
            WR-WH-WB-WK-WQ-WB-WH-WR
        `);
        return this;
    }

    function build() {
        return board;
    }

    return {
        fromPieceLayoutString,
        usingInitialPieceDisposition,
        build
    }
}

export {
    boardBuilder
}
