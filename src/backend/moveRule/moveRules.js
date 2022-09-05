
import { getPawnMoveRule } from "./pawnMoveRule.js";
import { getBishopMoveRule } from "./bishopMoveRule.js";
import { getRookMoveRule } from "./rookMoveRule.js";
import { getHorseMoveRule } from "./horseMoveRule.js";
import { getQueenMoveRule } from "./queenMoveRule.js";
import { getKingMoveRule } from "./kingMoveRule.js";

let moveRules = {
    getPawnMoveRule: getPawnMoveRule,
    getBishopMoveRule: getBishopMoveRule,
    getRookMoveRule: getRookMoveRule,
    getHorseMoveRule: getHorseMoveRule,
    getQueenMoveRule: getQueenMoveRule,
    getKingMoveRule: getKingMoveRule
}

export {
    moveRules
}

