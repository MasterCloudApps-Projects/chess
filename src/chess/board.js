import { pieceNames } from './pieces/pieceFactory.js';

function addBoardFunctionality(board) {
    board.performMovement = performMovement;
    board.isWhitePiece = isWhitePiece;
    board.getBoard = getBoard;
    return board;
}

function performMovement(movementOrigin, movementDestination) {
    let oldPiece = this.pieces[movementDestination];
    this.pieces[movementDestination] = this.pieces[movementOrigin];
    this.pieces[movementOrigin] = oldPiece;

    return this.pieces;
}

function getBoard(){
    return this.pieces;
}

function isWhitePiece(checkbox){
    return pieceNames[this.pieces[checkbox]].isWhite;
}

export {
    addBoardFunctionality
}
