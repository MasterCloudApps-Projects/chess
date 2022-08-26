import { createStraightLineMovement } from "../straightLineMovement.js";

function getRookMovement() {
    let rookMovementMotionCoordinates = ['getNextSquareNorth', 'getNextSquareSouth', 'getNextSquareEast',  'getNextSquareWest'];
    let rookMovement = createStraightLineMovement(rookMovementMotionCoordinates);
    return rookMovement;
}

export {
    getRookMovement
}
