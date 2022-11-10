import { createPieceMoveRule } from "./pieceMoveRule.js";
import { DirectionEnum } from "./directionEnum.js"

function getKingMoveRule() {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        let possibleMovements = [];
        for(let prop in DirectionEnum) {
            let movement = getMovement(DirectionEnum[prop]);
            if(movement !== undefined) {
                possibleMovements.push(movement);
            }
        }
        return possibleMovements;
    }

    function getMovement(direction) {
        let nextSquare = moveRule.getCurrentCoordinate().getNextCoordinate(direction);
        if(moveRule.isEmptyCoordinate(nextSquare) || moveRule.isOpposingColor(nextSquare))
            return nextSquare;
        return undefined;
    }

    return {
        ...moveRule,
        ...{
            getPossibleMovements
        }
    }
}

export {
    getKingMoveRule
}
