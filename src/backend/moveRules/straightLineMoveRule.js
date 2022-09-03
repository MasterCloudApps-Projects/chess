import { createPieceMoveRule } from "./pieceMoveRule.js";

function createStraightLineMoveRule(motionCoordinates) {
    let moveRule = createPieceMoveRule();

    moveRule.motionCoordinates = motionCoordinates;

    moveRule.getPossibleMovements = function ( ) {
        let possibleMovements = [];
        for (let i=0; i < this.motionCoordinates.length; i++)
            possibleMovements.push(...getMovements(this.motionCoordinates[i]));
        return possibleMovements;
    }

    function getMovements(nextCoordinate) {
        let movements = [];
        let origin = moveRule.currentPosition;
        let nextSquare = moveRule[nextCoordinate](origin);
        let possible = moveRule.isEmptyCoordinate(nextSquare) || moveRule.isOpposingColor(nextSquare);

        while(possible && !movements.includes(nextSquare)) {
            movements.push(nextSquare);
            if (moveRule.isOpposingColor(nextSquare))
                return movements;

            nextSquare = moveRule[nextCoordinate](nextSquare);
            possible = moveRule.isEmptyCoordinate(nextSquare) || moveRule.isOpposingColor(nextSquare);
        }
        return movements;
    }

    return moveRule;
}

export {
    createStraightLineMoveRule
}
