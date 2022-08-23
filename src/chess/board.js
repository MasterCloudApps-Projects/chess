import { pieceTypes } from './pieces/piece.js';
import { getEmptyPiece } from './pieces/pieceFactory.js';

function createBoard() {
    let board = {};
    board.pieces = {};
    board.errorMessages = [];
    board.getErrorMessages = getErrorMessages;
    board.performMovement = performMovement;
    board.isEmptySquare = isEmptySquare;
    board.isWhitePiece = isWhitePiece;
    board.isBlackPiece = isBlackPiece;
    board.getBoardPieceNames = getBoardPieceNames;
    board.getAllSquaresOfBlackPieces = getAllSquaresOfBlackPieces;
    board.getAllEmptySquares = getAllEmptySquares;
    board.getPiece = getPiece;
    board.getAllByColor = getAllByColor;
    board.createEmptyTile = createEmptyTile;
    return board;
}

function performMovement(movementOrigin, movementDestination) {
    this.errorMessages = [];
    if (this.pieces[movementOrigin].performMovement(movementDestination, this.pieces)) {
        this.pieces[movementDestination] = this.pieces[movementOrigin];
        this.pieces[movementDestination].position = movementDestination;
        this.createEmptyTile(movementOrigin);
        return true;
    }
    this.errorMessages.push(this.pieces[movementOrigin].getMovementError());
    return false;
}

function getErrorMessages() {
    let result = this.errorMessages;
    this.errorMessages = [];
    return result;
}

function getBoardPieceNames() {
    let result = {};
    for (let key in this.pieces)
        result[key] = this.pieces[key].name;

    return result;
}

function createEmptyTile (coordinate) {
    this.pieces[coordinate] = getEmptyPiece(coordinate);
};

function getAllSquaresOfBlackPieces(){
    return this.getAllByColor(pieceTypes.black);
}

function getAllEmptySquares(){
    return this.getAllByColor(pieceTypes.empty);
}

function isBlackPiece(coordinate) {
    return !this.pieces[coordinate].isWhite();
}

function isWhitePiece(coordinate){
    return this.pieces[coordinate].isWhite();
}

function isEmptySquare(coordinate){
    return this.pieces[coordinate].isEmpty();
}

function getPiece(coordinate){
    return this.pieces[coordinate];
}

function getAllByColor(color){
    const coloredSquares = [];
    for (let piece in this.pieces)
        if (this.pieces[piece].isOfColor(color))
            coloredSquares.push(piece);
    return coloredSquares;
}

export {
    createBoard
}
