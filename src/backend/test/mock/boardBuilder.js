import { createBoard } from './board.js'

function createBoardBuilder() {
    let board = createBoard();

    function usingInitialPieceDisposition(){
        return this;
    }

    function build(){
        return board;
    }

    return {
        usingInitialPieceDisposition,
        build
    }
}

export {
    createBoardBuilder
}
