import { pieceTypes, getOppositeColor } from './pieces/pieceType.js';
import { pieceNames, getKingForColor } from './pieces/pieceName.js';
import { factory as blackPieceFactory } from './pieces/blackPieceFactory.js';
import { factory as whitePieceFactory } from './pieces/whitePieceFactory.js';
import { getEmptyPiece } from './pieces/pieceFactory.js';

function createBoard() {
    let board = {};
    board.pieces = {};

    board.tryMove = function(movementOrigin, movementDestination, playerColor) {
        this.errorMessage = undefined;
        if(!this.pieces[movementOrigin].isOfColor(playerColor)) {
            this.errorMessage = 'Invalid move: Attempting to move a wrong color piece.';
            return;
        }
        if (!this.pieces[movementOrigin].isPossibleMove(movementDestination, this.pieces)){
            this.errorMessage = getInvalidMovementError(this.pieces[movementOrigin].fullName);
            return;
        }
        let stateBeforeMoving = this.createMemento();
        this.move(movementOrigin, movementDestination);
        this.updateCheckStatus(playerColor, stateBeforeMoving);
    }

    board.move = function(movementOrigin, movementDestination) {
        this.pieces[movementDestination] = this.pieces[movementOrigin];
        this.pieces[movementDestination].position = movementDestination;
        this.createEmptyTile(movementOrigin);
        this.pieces[movementDestination].doAfterMovement();
    }

    board.updateCheckStatus = function (playerColor, previousState) {
        if (this.isColorOnCheck(playerColor)) {
            this.errorMessage = 'Invalid move: cannot end turn on check';
            this.setMemento(previousState);
            return;
        }
        if (this.isColorOnCheck(getOppositeColor(playerColor))) {
            // check is it's checkmate
            console.log('possible checkmate');
            console.log('is checkmate: ' + this.isColorOnCheckMate(getOppositeColor(playerColor)));
        }
    }

    board.movementsFromTheCoordinate = function(origin) {
        this.pieces[origin].movement.updateCurrentPosition(origin, this.pieces);
        return this.pieces[origin].getPossibleMovements();
    }

    board.getBoardPieceNames = function() {
        let result = {};
        for (let key in this.pieces)
            result[key] = this.pieces[key].name;

        return result;
    }

    board.getAllSquaresOfBlackPieces = function() {
        return this.getAllCoordinatesByColor(pieceTypes.black);
    }

    board.getAllEmptySquares = function() {
        return this.getAllCoordinatesByColor(pieceTypes.empty);
    }

    board.getAllAttackPositionsByColor = function(color) {
        if (color === pieceTypes.empty)
            return [];
        const coordinatesUnderAttack = [];
        let pieces = this.getAllPiecesByColor(color);
        for (let i in pieces)
            coordinatesUnderAttack.push(...pieces[i].getAttackPositions(this.pieces));
        return [...new Set(coordinatesUnderAttack)];
    }

    board.getAllPiecesByColor = function(color) {
        const coloredPieces = [];
        let allColorCoordinates = this.getAllCoordinatesByColor(color);
        for (let i in allColorCoordinates)
            coloredPieces.push(this.pieces[allColorCoordinates[i]]);
        return coloredPieces;
    }

    board.getAllCoordinatesByColor = function(color) {
        const coloredSquares = [];
        for (let coordinate in this.pieces)
            if (this.pieces[coordinate].isOfColor(color))
                coloredSquares.push(coordinate);
        return coloredSquares;
    }

    board.isColorOnCheck = function (color) {
        let attackpos = this.getAllAttackPositionsByColor(getOppositeColor(color));
        let kingpos = this.getKingPositionByColor(color);
        return attackpos.includes(kingpos);
    }

    board.isColorOnCheckMate = function (color) {
        if (!this.isColorOnCheck(color))
            return false;

        const previousState = this.createMemento();
        for (let coord of this.getAllCoordinatesByColor(color)) {
            for (let mov of this.movementsFromTheCoordinate(this.pieces[coord].position)) {
                this.move(this.pieces[coord].position, mov);
                if (!this.isColorOnCheck(color)) {
                    this.setMemento(previousState);
                    return false;
                }
                this.setMemento(previousState);
            }
        }
        return true;
    }

    board.getKingPositionByColor = function(color) {
        let king = getKingForColor(color);
        return this.getAllPiecesByColor(color).find(piece => piece.name === king).position;
    }

    board.createEmptyTile = function(coordinate) {
        this.pieces[coordinate] = getEmptyPiece(coordinate);
    }

    board.createMemento = function() {
        let boardString = "";
        const boardNames = this.getBoardPieceNames();
        for (let i = 1; i <= 8; i++)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                let currentID = "abcdefgh"[letter] + i.toString();
                boardString += boardNames[currentID] + "-";
            }
        return boardString;
    }

    board.setMemento = function(memento) {
        memento = memento.split('-');
        let stringCounter = 0;
        for (let i = 1; i <= 8; i++)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                let pieceName = pieceNames[memento[stringCounter].trim()];
                let position = "abcdefgh"[letter]+i.toString();
                let piece = blackPieceFactory[pieceName.call](position);
                if (pieceName.type === pieceTypes.white)
                    piece = whitePieceFactory[pieceName.call](position);

                this.pieces[position] = piece;
                stringCounter++;
            }
    }

    board.getErrorMessage = function() {
        let result = this.errorMessage;
        this.errorMessage = undefined;
        return result;
    }

    board.hasError = function(){
        return this.errorMessage !== undefined;
    }

    return board;
}

function getInvalidMovementError(piece) {
    return 'Invalid ' + piece + ' movement';
}

export {
    createBoard
}
