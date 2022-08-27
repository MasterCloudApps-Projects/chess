import { pieceTypes, getOppositeColor } from './pieces/pieceType.js';
import { pieceNames, getKingColor } from './pieces/pieceName.js';
import { checkType } from './checkType.js';
import { factory as blackPieceFactory } from './pieces/blackPieceFactory.js';
import { factory as whitePieceFactory } from './pieces/whitePieceFactory.js';
import { getEmptyPiece } from './pieces/pieceFactory.js';

function createBoard() {
    let board = {};
    board.pieces = {};

    board.whiteMove = function(movementOrigin, movementDestination) {
        let checkStatus = this.getCheckByColor(pieceTypes.black);
        console.log('Is check black: ' + checkStatus.status); //PENDING evaluate checkMate

        if(this.isBlackPiece(movementOrigin)){
            this.errorMessage = 'Invalid move: Attempting to move a wrong color piece.';
            return;
        }

        if(checkType.check == checkStatus.status && checkStatus.getOutOfCheck &&
            !checkStatus.getOutOfCheck.includes(movementOrigin)  ){
            this.errorMessage = 'Must get out of check';
            return;
        }

        this.move(movementOrigin, movementDestination);
    };

    board.blackMove = function(movementOrigin, movementDestination) {
        let checkStatus = this.getCheckByColor(pieceTypes.white);
        console.log('Is check black: ' + checkStatus.status); //PENDING evaluate checkMate

        if(this.isWhitePiece(movementOrigin)){
            this.errorMessage = 'Invalid move: Attempting to move a wrong color piece.';
            return;
        }

        if(checkType.check == checkStatus.status && checkStatus.getOutOfCheck &&
            !checkStatus.getOutOfCheck.includes(movementOrigin)  ){
            this.errorMessage = 'Must get out of check';
            return;
        }

        this.move(movementOrigin, movementDestination);
    }

    board.move = function(movementOrigin, movementDestination) {
        if (this.pieces[movementOrigin].performMovement(movementDestination, this.pieces)) {
            this.pieces[movementDestination] = this.pieces[movementOrigin];
            this.pieces[movementDestination].position = movementDestination;
            this.createEmptyTile(movementOrigin);
            this.pieces[movementDestination].doAfterMovement();
            this.errorMessage = undefined;
            return;
        }
        this.errorMessage = getInvalidMovementError(this.pieces[movementOrigin].fullName);
    }

    board.movementsFromTheCoordinate = function(origin) {
        return this.pieces[origin].getPossibleMovements(this.pieces);
    }

    board.getPiece = function(coordinate ){
        return this.pieces[coordinate];
    }

    board.isEmptySquare = function(coordinate) {
        return this.pieces[coordinate].isEmpty();
    }

    board.isWhitePiece = function(coordinate) {
        return this.pieces[coordinate].isWhite();
    }

    board.isBlackPiece = function(coordinate) {
        return !this.pieces[coordinate].isWhite();
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

    board.getAllAttackpositionsByColor = function(color) {
        if (color === pieceTypes.empty)
            return [];
        const coordinatesUnderAttack = [];
        let pieces = this.getAllPiecesByColor(color);
        for (let i in pieces)
            coordinatesUnderAttack.push(...pieces[i].getAttackpositions(this.pieces));
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

    //TODO:
    board.getCheckByColor = function(color) {
        let check = {};
        let kingOppositePosition = this.getKingByColor(color);
        check.status = this.getCheckStatus(kingOppositePosition, color);
        //if(checkType.check == check.status) check.getOutOfCheck = this.getMovementToGetOutOfCheck(kingOppositePosition, color)
        return check;
    }


    board.getCheckStatus = function(kingOppositePosition, color) {
        if(this.isCheck(kingOppositePosition, color))
            return this.isCheckMate(kingOppositePosition, color) ? checkType.checkMate : checkType.check;
        return checkType.checkless;
    }

    board.isCheck = function(kingOppositePosition, color) {
        let dangerPositions = this.getAllAttackpositionsByColor(color);
        return dangerPositions.includes(kingOppositePosition) ? true : false;
    }

    board.getMovementToGetOutOfCheck = function(kingOppositePosition, color) {
        let possibleMovements = this.movementsFromTheCoordinate(kingOppositePosition);
        return undefined;
        //TODO: for each possible movement: simulate movement and recalculate check
    }

    board.isCheckMate = function(kingOppositePosition, color) {
        //TODO: uncomment and delete second return
        //return this.getMovmentToGetOutOfCheck > 0 ? false : true;
        return false;
    }
    //

    board.getKingByColor = function(color) {
        let king = getKingColor(getOppositeColor(color));
        let piecesOppositeColor = this.getAllCoordinatesByColor(getOppositeColor(color));
        for(let i = 0; i < piecesOppositeColor.length; i++) {
            if(this.pieces[piecesOppositeColor[i]].name === king)
                return piecesOppositeColor[i];
        }
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
