import { pieceTypes, getOppositeColor } from './pieces/pieceType.js';
import { pieceNames, getKingColor } from './pieces/pieceName.js';
import { factory as blackPieceFactory } from './pieces/blackPieceFactory.js';
import { factory as whitePieceFactory } from './pieces/whitePieceFactory.js';
import { getEmptyPiece } from './pieces/pieceFactory.js';

function createBoard() {
    let board = {};
    board.pieces = {};
    board.errorMessages = [];
    board.getErrorMessage = getErrorMessage;
    board.performMovement = performMovement;
    board.isEmptySquare = isEmptySquare;
    board.isWhitePiece = isWhitePiece;
    board.isBlackPiece = isBlackPiece;
    board.getBoardPieceNames = getBoardPieceNames;
    board.getAllSquaresOfBlackPieces = getAllSquaresOfBlackPieces;
    board.getAllEmptySquares = getAllEmptySquares;
    board.getPiece = getPiece;
    board.getAllAttackpositionsByColor = getAllAttackpositionsByColor;
    board.getAllPiecesByColor = getAllPiecesByColor;
    board.getAllCoordinatesByColor = getAllCoordinatesByColor;
    board.getKingByColor = getKingByColor;
    board.isCheckByColor = isCheckByColor;
    board.createEmptyTile = createEmptyTile;
    board.createMemento = createMemento;
    board.setMemento = setMemento;
    return board;
}

function performMovement(movementOrigin, movementDestination) {
    if (this.pieces[movementOrigin].performMovement(movementDestination, this.pieces)) {
        this.pieces[movementDestination] = this.pieces[movementOrigin];
        this.pieces[movementDestination].position = movementDestination;
        this.createEmptyTile(movementOrigin);
        this.pieces[movementDestination].doAfterMovement();
        return true;
    }
    this.errorMessage = getInvalidMovementError(this.pieces[movementOrigin].fullName);
    return false;
}

function getErrorMessage() {
    let result = this.errorMessage;
    this.errorMessage = undefined;
    return result;
}

function getInvalidMovementError(piece) {
    return 'Invalid ' + piece + ' movement';
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
    return this.getAllCoordinatesByColor(pieceTypes.black);
}

function getAllEmptySquares(){
    return this.getAllCoordinatesByColor(pieceTypes.empty);
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

function getAllAttackpositionsByColor(color) {
    if (color == pieceTypes.empty)
        return [];
    const coordinatesUnderAttack = [];
    let pieces = this.getAllPiecesByColor(color);
    for (let i in pieces)
        coordinatesUnderAttack.push(...pieces[i].getAttackpositions(this.pieces));
    return [...new Set(coordinatesUnderAttack)];
}

function isCheckByColor(color){
    let dangerPositions = this.getAllAttackpositionsByColor(color);
    let kingOppositePosition = this.getKingByColor(color);
    return dangerPositions.includes(kingOppositePosition);
}

function getKingByColor(color){
    let king = getKingColor(getOppositeColor(color));
    let piecesOppositeColor = this.getAllCoordinatesByColor(getOppositeColor(color));
    for(let i = 0; i < piecesOppositeColor.length; i++) {
        if(this.pieces[piecesOppositeColor[i]].name == king)
            return piecesOppositeColor[i];
    }
}

function getAllPiecesByColor(color) {
    const coloredPieces = [];
    let allColorCoordinates = this.getAllCoordinatesByColor(color);
    for (let i in allColorCoordinates)
        coloredPieces.push(this.pieces[allColorCoordinates[i]]);
    return coloredPieces;
}

function getAllCoordinatesByColor(color){
    const coloredSquares = [];
    for (let coordinate in this.pieces)
        if (this.pieces[coordinate].isOfColor(color))
            coloredSquares.push(coordinate);
    return coloredSquares;
}

function createMemento(){
    let boardString = "";
    const boardNames = this.getBoardPieceNames();
    for (let i = 1; i <= 8; i++)
        for (let letter = 0; letter < "abcdefgh".length; letter++) {
            let currentID = "abcdefgh"[letter] + i.toString();
            boardString += boardNames[currentID] + "-";
        }
    return boardString;
}

function setMemento(memento){
    memento = memento.split('-');
    let stringCounter = 0;
    for (let i = 1; i <= 8; i++)
        for (let letter = 0; letter < "abcdefgh".length; letter++) {
            let pieceName = pieceNames[memento[stringCounter].trim()];
            let position = "abcdefgh"[letter]+i.toString();
            let piece = blackPieceFactory[pieceName.call](position);
            if (pieceName.type == pieceTypes.white)
                piece = whitePieceFactory[pieceName.call](position);

            this.pieces[position] = piece;
            stringCounter++;
        }
}

export {
    createBoard
}
