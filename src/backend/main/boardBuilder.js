import { createBoard } from './board.js';
import { pieceTypes } from '../piece/pieceType.js';
import { pieceNames } from '../piece/pieceName.js';
import { createBlackFactory as blackPieceFactory } from '../piece/blackPieceFactory.js';
import { createWhiteFactory as whitePieceFactory } from '../piece/whitePieceFactory.js';

function boardBuilder() {
    let board = createBoard();

    function fromPieceLayoutString(pieceStringLayout) {
        pieceStringLayout = pieceStringLayout.trim().split('\n').join('-').split('-');
        let stringCounter = 0, pieceName;
        for (let i=8; i>0; i--)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                pieceName = pieceNames[pieceStringLayout[stringCounter].trim()];
                let position = "abcdefgh"[letter]+i.toString();

                //TODO: Review for possible refactoring -> blackPieceFactory[pieceName.call]
                let piece = blackPieceFactory()[pieceName.call](position);
                if (pieceName.type === pieceTypes.white)
                    piece = whitePieceFactory()[pieceName.call](position);

                board.pieces[position] = piece;
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
