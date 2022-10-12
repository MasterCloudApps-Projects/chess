import { createBoard } from './board.js';
import { PieceCreatorEnum } from '../piece/pieceCreatorEnum.js';

function boardBuilder() {
    let board = createBoard();

    function fromPieceLayoutString(pieceStringLayout) {
        pieceStringLayout = pieceStringLayout.trim().split('\n').join('-').split('-');
        let stringCounter = 0;
        for (let i=8; i>0; i--)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                let position = "abcdefgh"[letter]+i.toString();
                let piece = PieceCreatorEnum[pieceStringLayout[stringCounter].trim()](position);
                board.getPieces()[position] = piece;
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
