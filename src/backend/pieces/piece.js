import { movements } from "../movements/movementsEnum.js";
import { pieceTypes } from './pieceType.js';

function createPiece(name, fullName, color, position) {
    let piece = {};
    piece.name = name;
    piece.fullName = fullName;
    piece.color = color;
    piece.position = position;

    piece.isPossibleMove = function(destination, pieces) {
        return this.movement.isPossibleMove(this.position, destination, pieces);
    }

    piece.getPossibleMovements = function(pieces) {
        return this.movement.getPossibleMovements(this.position, pieces);
    }

    piece.doAfterMovement = function() {
        this.movement.doAfterMovement(this.position);
    }

    piece.getAttackPositions = function(pieces) {
        return this.movement.getAttackMovements(this.position, pieces);
    }

    piece.isWhite = function() {
        return this.color === pieceTypes.white;
    }

    piece.isOpposingColor = function(piece) {
        return this.color !== piece.color && !piece.isEmpty();
    }

    piece.isOfColor = function(color) {
        return this.color === color;
    }

    piece.isEmpty = function() {
        return this.color === pieceTypes.empty;
    }

    piece.getMovementError = function() {
        return this.movement.getErrorMessages();
    }

    return piece;
}

// Constructor/Decorator functions for use on pieceFactory.js, not to be added to piece!
const decorators = {
    decoratePawn: function decoratePawn(pawn) {
        const pawnFirstPositions = { 'BP' : '7', 'WP' : '2' }
        pawn.movement = movements.getPawnMovement(
            pawn.position.includes(pawnFirstPositions[pawn.name]),
            !pawn.isWhite());
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
    decorators
}
