import { movements } from "../movements/movementsEnum.js";
import { pieceTypes } from './pieceType.js';
import { pieceNames } from './pieceName.js';

function createPiece(name, fullName, color, position) {
    let piece = {};
    piece.name = name;
    piece.fullName = fullName;
    piece.color = color;
    piece.position = position;

    piece.performMovement = performMovement;
    piece.getAttackpositions = getAttackpositions;
    piece.doAfterMovement = doAfterMovement;
    piece.getMovementError = getMovementError;
    piece.isWhite = isWhite;
    piece.isOpposingColor = isOpposingColor;
    piece.isOfColor = isOfColor;
    piece.isEmpty = isEmpty;
    return piece;
}

function performMovement(destination, pieces) {
    return this.movement.move(this.position, destination, pieces);
}

function getAttackpositions(pieces) {
    return this.movement.getKillingMovements(this.position, pieces);
}

function doAfterMovement() {
    this.movement.doAfterMovement(this.position);
}

function getMovementError() {
    return this.movement.getErrorMessages();
}

function isWhite() {
    return this.color == pieceTypes.white;
}

function isOfColor(color) {
    return this.color === color;
}

function isOpposingColor(piece) {
    return this.color != piece.color && !piece.isEmpty();
}

function isEmpty() {
    return this.color == pieceTypes.empty;
}

// Constructor/Decorator functions for use on pieceFactory.js, not to be added to piece!
const decorators = {
    decoratePawn: function decoratePawn(pawn) {
        pawn.movement = movements.getPawnMovement();
        pawn.isQueen = false;
        pawn.doAfterMovement = function () {
            this.movement.doAfterMovement(this.position);
            if (!this.isQueen && this.movement.shouldTurnToQueen()) {
                this.movement = movements.getQueenMovement();
                this.fullName = this.fullName.replace('pawn', 'queen')
                this.name = this.name.replace('P', 'Q');
                this.isQueen = true;
            }
        };
        return pawn;
    },

    decorateRook: function decorateRook(rook) {
        rook.movement = movements.getRookMovement();
        return rook;
    },

    decorateBishop: function decorateBishop(bishop) {
        bishop.movement = movements.getBishopMovement();
        return bishop;
    },

    decorateHorse: function decorateHorse(horse) {
        horse.movement = movements.getHorseMovement();
        return horse;
    },

    decorateQueen: function decorateQueen(queen) {
        queen.movement = movements.getQueenMovement();
        return queen;
    },

    decorateKing: function decorateKing(king) {
        king.movement = movements.getKingMovement();
        return king;
    }
};

export {
    createPiece,
    pieceTypes,
    pieceNames,
    decorators
}
