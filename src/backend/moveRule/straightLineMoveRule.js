import { createPieceMoveRule } from "./pieceMoveRule.js";

function createStraightLineMoveRule(motionCoordinates) {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        let possibleMovements = [];
        for (let i=0; i < motionCoordinates.length; i++)
            possibleMovements.push(...getMovements(motionCoordinates[i]));
        return possibleMovements;
    }

    function getMovements(direction) {
        let movements = [];
        let origin = moveRule.getCurrentCoordinate();
        let nextSquare = origin.getNextCoordinate(direction);
        let possible = moveRule.isEmptyCoordinate(nextSquare) || moveRule.isOpposingColor(nextSquare);

        while(possible && !movements.map(mv=>mv.getPosition()).includes(nextSquare.getPosition())) {
            movements.push(nextSquare);
            if (moveRule.isOpposingColor(nextSquare))
                return movements;

            nextSquare = nextSquare.getNextCoordinate(direction);
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
