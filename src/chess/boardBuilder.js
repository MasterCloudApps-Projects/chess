import { addBoardFunctionality } from './board.js';
// import piece factories from ./

function boardBuilder() {
    let board = {};

    function usingInitialPieceDisposition() {
        board.pieces = {};
        board.pieces.a1 = 'WR'; // 'WR' string to be substituted with a piece object from factory etc
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
