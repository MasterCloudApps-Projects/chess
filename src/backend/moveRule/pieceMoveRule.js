import { createAbstractMoveRule } from "./abstractMoveRule.js";

function createPieceMoveRule(){
    let absMovement = createAbstractMoveRule();

    // Function overriden on lower child level requires 'this', otherwise calls local empty implementation
    function isPossibleMove (origin, destination, pieces) {
        absMovement.updateCurrentPosition(origin, pieces);
        return (this.getPossibleMovements().includes(destination));
    };

    function getAttackMovements (origin, pieces) {
        absMovement.updateCurrentPosition(origin, pieces);
        return this.getPossibleMovements();
    }

    function getPossibleMovements () {};

    return {
        ...absMovement,
        ...{
            isPossibleMove,
            getAttackMovements,
            getPossibleMovements,
        }
    }
}

export {
    createPieceMoveRule
}
