import { getPawnMovement } from "./impl/pawnMovement.js";
import { getBishopMovement } from "./impl/bishopMovement.js";
import { getRookMovement } from "./impl/rookMovement.js";
import { getHorseMovement } from "./impl/horseMovement.js";
import { getQueenMovement } from "./impl/queenMovement.js";
import { getKingMovement } from "./impl/kingMovement.js";

let movements = {
    getPawnMovement: getPawnMovement,
    getBishopMovement: getBishopMovement,
    getRookMovement: getRookMovement,
    getHorseMovement: getHorseMovement,
    getQueenMovement: getQueenMovement,
    getKingMovement: getKingMovement
}

export {
    movements
}

