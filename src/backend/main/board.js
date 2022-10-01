import { pieceTypes, getOppositeColor } from '../piece/pieceType.js';
import { pieceNames, getKingForColor } from '../piece/pieceName.js';
import { createBlackFactory as blackPieceFactory } from '../piece/blackPieceFactory.js';
import { createWhiteFactory as whitePieceFactory } from '../piece/whitePieceFactory.js';
import { createFactory } from '../piece/pieceFactory.js';

function createBoard() {
    let board = {};
    board.pieces = {};
    board.checkmate = false;

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
        move(movementOrigin, movementDestination);
        updateCheckStatus(playerColor, stateBeforeMoving);
    }

    function move(movementOrigin, movementDestination) {
        board.pieces[movementDestination] = board.pieces[movementOrigin];
        board.pieces[movementDestination].setPosition(movementDestination);
        createEmptyTile(movementOrigin);
        //TODO: refactor -> doAftherMovement method must be executed from the pawn
        //board.pieces[movementDestination].doAfterMovement();
    }

    function updateCheckStatus(playerColor, previousState) {
        if (board.isColorOnCheck(playerColor)) {
            board.errorMessage = 'Invalid move: cannot end turn on check';
            board.setMemento(previousState);
            return;
        }
        if (board.isColorOnCheck(getOppositeColor(playerColor))) {
            console.log('possible checkmate');
            console.log('is checkmate: ' + isColorOnCheckMate(getOppositeColor(playerColor)));
            if (isColorOnCheckMate(getOppositeColor(playerColor)))
                board.checkmate = true;
        }
    }

    board.isColorOnCheck = function (color) {
        let attackpos = getAllAttackPositionsByColor(getOppositeColor(color));
        let kingpos = getKingPositionByColor(color);
        return attackpos.includes(kingpos);
    }

    function isColorOnCheckMate(color) {
        if (!board.isColorOnCheck(color))
            return false;

        return board.getValidMovementWhileColorIsOnCheck(color) == undefined;
    }

    board.getValidMovementWhileColorIsOnCheck = function (color) {
        const previousState = this.createMemento();
        for (let coord of this.getAllCoordinatesByColor(color)) {
            for (let mov of this.movementsFromTheCoordinate(this.pieces[coord].getPosition())) {
                move(this.pieces[coord].getPosition(), mov);
                if (!this.isColorOnCheck(color)) {
                    this.setMemento(previousState);
                    return { origin: coord, destination: mov };
                }
                this.setMemento(previousState);
            }
        }
        return undefined;
    }

    board.movementsFromTheCoordinate = function(origin) {
        this.pieces[origin].updateCurrentPosition(origin, this.pieces);
        return this.pieces[origin].getPossibleMovements();
    }

    board.getBoardPieceNames = function() {
        let result = {};
        for (let key in this.pieces)
            result[key] = this.pieces[key].getName();

        return result;
    }

    board.getAllSquaresOfBlackPieces = function() {
        return this.getAllCoordinatesByColor(pieceTypes.black.name);
    }

    board.getAllEmptySquares = function() {
        return this.getAllCoordinatesByColor(pieceTypes.empty.name);
    }

    board.getAllCoordinatesByColor = function(color) {
        const coloredSquares = [];
        for (let coordinate in this.pieces)
            if (this.pieces[coordinate].isOfColor(color))
                coloredSquares.push(coordinate);
        return coloredSquares;
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

    function getAllAttackPositionsByColor(color) {
        if (color === pieceTypes.empty.name)
            return [];
        const coordinatesUnderAttack = [];
        let pieces = getAllPiecesByColor(color);
        for (let i in pieces)
            coordinatesUnderAttack.push(...pieces[i].getAttackPositions(board.pieces));
        return [...new Set(coordinatesUnderAttack)];
    }

    function getKingPositionByColor(color) {
        let king = getKingForColor(color);
        return getAllPiecesByColor(color).find(piece => piece.getName() === king).getPosition();
    }

    function getAllPiecesByColor(color) {
        const coloredPieces = [];
        let allColorCoordinates = board.getAllCoordinatesByColor(color);
        for (let i in allColorCoordinates)
            coloredPieces.push(board.pieces[allColorCoordinates[i]]);
        return coloredPieces;
    }


    function createEmptyTile(coordinate) {
        //TODO: refactor factory
        board.pieces[coordinate] = createFactory().getEmptyPiece(coordinate);
    }

    function getInvalidMovementError(piece) {
        return 'Invalid ' + piece + ' movement';
    }

    return board;
}

export {
    createBoard
}
