import { addBoardFunctionality } from './board.js';
import { pieceNames } from './pieces/pieceFactory.js';
import { factory as blackPieceFactory } from './pieces/blackPieceFactory.js';
import { factory as whitePieceFactory } from './pieces/whitePieceFactory.js';

function boardBuilder() {
    let board = {};
    board.pieces = {};

    function fromPieceLayoutString(pieceStringLayout) {
        pieceStringLayout = pieceStringLayout.trim().split('\n').join('-').split('-');
        let stringCounter = 0, pieceName;
        for (let i=8; i>0; i--)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                pieceName = pieceNames[pieceStringLayout[stringCounter].trim()];

                let piece = blackPieceFactory[pieceName.call]();
                if (pieceName.isWhite)
                    piece = whitePieceFactory[pieceName.call]();

                board.pieces["abcdefgh"[letter]+i.toString()] = piece;
                stringCounter++;
            }

        return this;
    }

    function usingInitialPieceDisposition() {
        fromPieceLayoutString(`
            BR-BH-BB-BQ-BK-BB-BH-BR
            BP-BP-BP-BP-BP-BP-BP-BP
            _-_-_-_-_-_-_-_
            _-_-_-_-_-_-_-_
            _-_-_-_-_-_-_-_
            _-_-_-_-_-_-_-_
            WP-WP-WP-WP-WP-WP-WP-WP
            WR-WH-WB-WQ-WK-WB-WH-WR
        `);
        return this;
    }

    function build() {
        return addBoardFunctionality(board);
    }

    return {
        usingInitialPieceDisposition,
        build
    }
}

export {
    boardBuilder
}
