import { createPieceMoveRule } from "./pieceMoveRule.js";

function createStraightLineMoveRule(motionCoordinates) {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        let possibleMovements = [];
        for (let i=0; i < motionCoordinates.length; i++)
            possibleMovements.push(...getMovements(motionCoordinates[i]));
        return possibleMovements;
    }

    function getMovements(nextCoordinate) {
        let movements = [];
        let origin = moveRule.getCurrentPosition();
        let nextSquare = moveRule.getNextSquare(origin, nextCoordinate);
        let possible = moveRule.isEmptyCoordinate(nextSquare) || moveRule.isOpposingColor(nextSquare);

        while(possible && !movements.includes(nextSquare)) {
            movements.push(nextSquare);
            if (moveRule.isOpposingColor(nextSquare))
                return movements;

            nextSquare = moveRule.getNextSquare(nextSquare, nextCoordinate);
            possible = moveRule.isEmptyCoordinate(nextSquare) || moveRule.isOpposingColor(nextSquare);
        }
        return movements;
    }

    return {
        ...moveRule,
        ...{
            getPossibleMovements
        }
    }
}

export {
    createStraightLineMoveRule
}
