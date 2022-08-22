import { pieceNames, pieceTypes } from './pieces/piece.js';

function createBoard() {
    let board = {};
    board.pieces = {};
    board.performMovement = performMovement;
    board.isEmptySquare = isEmptySquare;
    board.isWhitePiece = isWhitePiece;
    board.isBlackPiece = isBlackPiece;
    board.getBoard = getBoard;
    board.getBoardPieceNames = getBoardPieceNames;
    board.getAllSquaresOfBlackPieces = getAllSquaresOfBlackPieces;
    board.getAllEmptySquares = getAllEmptySquares;
    board.getPiece = getPiece;
    board.getPieceColor = getPieceColor;
    return board;
}

function performMovement(movementOrigin, movementDestination) {
    this.pieces[movementOrigin].performMovement(movementDestination, this.pieces);
}

function getBoard() {
    return this.pieces;
}

function getBoardPieceNames() {
    let result = {};
    for (let key in this.pieces)
        result[key] = this.pieces[key].name;

    return result;
}

function getAllSquaresOfBlackPieces(){
    return getAllByColor(this.pieces, pieceTypes.black);
}

function getAllEmptySquares(){
    return getAllByColor(this.pieces, null);
}

function isBlackPiece(coordinate){
    return isColor(this.pieces, scoordinate, pieceTypes.black);
}

function isWhitePiece(coordinate){
    return isColor(this.pieces, coordinate, pieceTypes.white);
}

function isEmptySquare(coordinate){
    return isColor(this.pieces, coordinate, pieceTypes.empty);
}

function isColor(pieces, coordinate, color){
    return pieces[coordinate].color == color;
}

function getPiece(coordinate){
    return this.pieces[coordinate];
}

function getPieceColor(coordinate){
    return pieceNames[this.pieces[coordinate]].type;
}

function getAllByColor(pieces, color){
    const coloredSquares = [];
    const coordinates = Object.keys(pieces);

    for(let i = 0; i < coordinates.length; i++)
        if(pieces[coordinates[i]].color == color)
            coloredSquares.push(coordinates[i])

    return coloredSquares;
}

export {
    createBoard
}
