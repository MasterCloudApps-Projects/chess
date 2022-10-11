import { createBoard } from './board.js';
import { PieceAbbreviationEnum } from '../piece/pieceAbbreviationEnum.js';
import { createPieceFactory } from '../piece/pieceFactory.js';

function boardBuilder() {
    let board = createBoard();

    function fromPieceLayoutString(pieceStringLayout) {
        let pieceFactory = createPieceFactory();
        pieceStringLayout = pieceStringLayout.trim().split('\n').join('-').split('-');
        let stringCounter = 0, pieceAbbreviation;
        for (let i=8; i>0; i--)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                pieceAbbreviation = PieceAbbreviationEnum[pieceStringLayout[stringCounter].trim()];
                let position = "abcdefgh"[letter]+i.toString();

                let piece = pieceFactory.getPiece(
                    pieceAbbreviation.getAbbreviation(),
                    pieceAbbreviation.getColor(),
                    position,
                    pieceAbbreviation.getPieceName());

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
