import { addBoardFunctionality } from './board.js';
// import piece factories from ./

function boardBuilder() {
    let board = {};
    board.pieces = {};

    function fromPieceLayoutString(pieceLayout) {
        pieceLayout = pieceLayout.trim().split('\n').join('-').split('-');
        let pieceLayoutCounter = 0;
        for (let i=8; i>0; i--)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                board.pieces["abcdefgh"[letter]+i.toString()] = pieceLayout[pieceLayoutCounter].trim();
                pieceLayoutCounter++;
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
