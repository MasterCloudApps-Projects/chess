import { pieceNames, pieceTypes } from './pieces/pieceFactory.js';

function addBoardFunctionality(board) {
    board.performMovement = performMovement;
    board.isEmptySquare = isEmptySquare;
    board.isWhitePiece = isWhitePiece;
    board.isBlackPiece = isBlackPiece;
    board.getBoard = getBoard;
    board.getAllSquaresOfBlackPieces = getAllSquaresOfBlackPieces;
    board.getAllEmptySquares = getAllEmptySquares;
    board.getPiece = getPiece;
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

function isBlackPiece(square){
    return isColor(this.pieces, square, pieceTypes.black);
}

function isWhitePiece(square){
    return isColor(this.pieces, square, pieceTypes.white);
}

function isEmptySquare(square){
    return isColor(this.pieces, square, null);
}

function isColor(pieces, square, color){
    return color == pieceNames[pieces[square]].type;
}

function getPiece(origin){
    return this.pieces[origin];
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
