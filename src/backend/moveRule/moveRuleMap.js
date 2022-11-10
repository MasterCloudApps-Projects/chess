
import { getPawnMoveRule } from "./pawnMoveRule.js";
import { getBishopMoveRule } from "./bishopMoveRule.js";
import { getRookMoveRule } from "./rookMoveRule.js";
import { getHorseMoveRule } from "./horseMoveRule.js";
import { getQueenMoveRule } from "./queenMoveRule.js";
import { getKingMoveRule } from "./kingMoveRule.js";

let moveRuleMap = {
    pawn: getPawnMoveRule,
    bishop: getBishopMoveRule,
    rook: getRookMoveRule,
    horse: getHorseMoveRule,
    queen: getQueenMoveRule,
    king: getKingMoveRule,
    empty: () => undefined
}

export {
    moveRuleMap
}

