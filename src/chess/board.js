import { pieceNames, pieceTypes } from './pieces/pieceFactory.js';

function addBoardFunctionality(board) {
    board.performMovement = performMovement;
    board.isWhitePiece = isWhitePiece;
    board.getBoard = getBoard;
    board.getAllSquaresOfBlackPieces = getAllSquaresOfBlackPieces;
    board.getAllEmptySquares = getAllEmptySquares;
    return board;
}

function performMovement(movementOrigin, movementDestination) {
    let oldPiece = this.pieces[movementDestination];
    this.pieces[movementDestination] = this.pieces[movementOrigin];
    this.pieces[movementOrigin] = oldPiece;
}

function getBoard(){
    return this.pieces;
}

function getAllSquaresOfBlackPieces(){
    return getAllByColor(this.pieces, pieceTypes.black);
}

function getAllEmptySquares(){
    return getAllByColor(this.pieces, null);
}

function isWhitePiece(checkbox){
    return pieceTypes.white == pieceNames[this.pieces[checkbox]].type;
}

export {
    addBoardFunctionality
}


function getAllByColor(pieces, color){
    const squares = [];
    const keys = Object.keys(pieces);
    for(let i = 0; i < keys.length; i++){
        if(color  == pieceNames[pieces[keys[i]]].type){
            squares.push(keys[i])
        }
    }
    return squares;
}
