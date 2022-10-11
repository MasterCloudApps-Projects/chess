import { createPiece } from './piece.js';
import { moveRuleMap } from '../moveRule/moveRuleMap.js';

function createDecoratedPawnPiece(color, position) {
    const pawnFirstPositions = { B : '7', W : '2' };

    let piece = createPiece(
        color.getAbbreviation()+'P',
        color.getLiteral()+' pawn',
        color,
        position,
        moveRuleMap.pawn(
            position.includes(pawnFirstPositions[color.getAbbreviation()]), !color.isWhite()));

    function isPossibleMove(destination, pieces) {
        let isItPossible = piece.isPossibleMove(destination, pieces);
        if (isItPossible)
            doAfterMovement(destination);
        return isItPossible;
    }

    function doAfterMovement(newPosition) {
        piece.getMovementRule().doAfterMovement(newPosition);
        if(piece.getMovementRule().shouldTurnToQueen())
            transformToQueen();
    }

    function transformToQueen() {
        piece.setMovementRule(moveRuleMap.queen());
        piece.setFullName(piece.getFullName().replace('pawn', 'queen'));
        piece.setAbbreviation(piece.getAbbreviation().replace('P', 'Q'));
    }

    return {
        ...piece,
        ... {
            isPossibleMove
        }
    }
}

export {
    createDecoratedPawnPiece
}
