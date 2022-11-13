import { getPawnMoveRule }  from '../../moveRule/pawnMoveRule';
import { boardBuilder } from '../../main/boardBuilder.js';
import { layout } from './utils/layoutBoard.js'

let pawnWhite;
let pawnBlack;
let bottonWhiteBoard;
let bottonBlackBoard;
let topWhiteBoard;
let topBlackBoard;
let surroundedWhiteBoard;
let surroundedBlackBoard;
let surroundedOpositeWhiteBoard;
let surroundedOpositeBlackBoard;

beforeEach(() => {
    pawnWhite = getPawnMoveRule(true, false);
    pawnBlack = getPawnMoveRule(true, true);

    bottonWhiteBoard = boardBuilder().fromPieceLayoutString(layout.botton.replace('X', 'WP')).build();
    topBlackBoard = boardBuilder().fromPieceLayoutString(layout.top.replace('X', 'BP')).build();
    topWhiteBoard = boardBuilder().fromPieceLayoutString(layout.top.replace('X', 'WP')).build();
    bottonBlackBoard = boardBuilder().fromPieceLayoutString(layout.botton.replace('X', 'BP')).build();
    surroundedWhiteBoard = boardBuilder().fromPieceLayoutString(layout.surrounded.replace(/X/g, 'WP')).build()
    surroundedBlackBoard = boardBuilder().fromPieceLayoutString(layout.surrounded.replace(/X/g, 'BP')).build()
    surroundedOpositeWhiteBoard = boardBuilder().fromPieceLayoutString(layout.surroundedByOpposite.replace('X', 'WP').replace(/Y/g, 'BP')).build();
    surroundedOpositeBlackBoard = boardBuilder().fromPieceLayoutString(layout.surroundedByOpposite.replace('X', 'BP').replace(/Y/g, 'WP')).build();
});

describe('Get Possible Moves', () => {
    test('Get Forward Possible Movements for White Test', () => {
        let possibleCoordinate = [];
        pawnWhite.updateCurrentPosition('b1', bottonWhiteBoard.getPieces());

        pawnWhite.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.includes("b2")).toBeTruthy();
        expect(possibleCoordinate.includes("b3")).toBeTruthy();
    });

    test('Get Forward Possible Movements for Black Test', () => {
        let possibleCoordinate = [];
        pawnBlack.updateCurrentPosition('b8', topBlackBoard.getPieces());

        pawnBlack.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.includes("b7")).toBeTruthy();
        expect(possibleCoordinate.includes("b6")).toBeTruthy();
    });

    test('Get Forward Not Possible: white is at the end', () => {
        let possibleCoordinate = [];
        pawnWhite.updateCurrentPosition('b8', topWhiteBoard.getPieces());

        pawnWhite.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.length === 0).toBeTruthy();
    });

    test('Get Forward Not Possible: black is at the end', () => {
        let possibleCoordinate = [];
        pawnBlack.updateCurrentPosition('b1', bottonBlackBoard.getPieces());

        pawnBlack.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.length === 0).toBeTruthy()
    });

    test('Get Forward Not Possible: pawn is surrounded', () => {
        let possibleCoordinateWhite = [];
        let possibleCoordinateBlack = [];
        pawnWhite.updateCurrentPosition('d2', surroundedWhiteBoard.getPieces());
        pawnBlack.updateCurrentPosition('d2', surroundedBlackBoard.getPieces());

        pawnWhite.getPossibleMovements().forEach(p => possibleCoordinateWhite.push(p.getPosition()));
        pawnBlack.getPossibleMovements().forEach(p => possibleCoordinateBlack.push(p.getPosition()));

        expect(possibleCoordinateWhite.length === 0).toBeTruthy();
        expect(possibleCoordinateBlack.length === 0).toBeTruthy();
    });

    test('Get Forward Possible Eating Movements for White Test', () => {
        let possibleCoordinate = [];
        pawnWhite.updateCurrentPosition('d2', surroundedOpositeWhiteBoard.getPieces());

        pawnWhite.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.includes("e3")).toBeTruthy();
        expect(possibleCoordinate.includes("c3")).toBeTruthy();
        expect(possibleCoordinate.includes("c1")).toBeFalsy();
        expect(possibleCoordinate.includes("e1")).toBeFalsy();
    });

    test('Get Forward Possible Eating Movements for Black Test', () => {
        let possibleCoordinate = [];
        pawnBlack.updateCurrentPosition('d2', surroundedOpositeBlackBoard.getPieces());

        pawnBlack.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.includes("c1")).toBeTruthy();
        expect(possibleCoordinate.includes("e1")).toBeTruthy();
        expect(possibleCoordinate.includes("e3")).toBeFalsy();
        expect(possibleCoordinate.includes("c3")).toBeFalsy();
    });
});

describe('Is Possible Moves', () => {

    test('Is Possible Moves White Test', () => {
        expect(pawnWhite.isPossibleMove('b1', 'b2', bottonWhiteBoard.getPieces())).toBeTruthy();
        expect(pawnWhite.isPossibleMove('b1', 'b3', bottonWhiteBoard.getPieces())).toBeTruthy();

        expect(pawnWhite.isPossibleMove('d2', 'e3', surroundedOpositeWhiteBoard.getPieces())).toBeTruthy();
        expect(pawnWhite.isPossibleMove('d2', 'c3', surroundedOpositeWhiteBoard.getPieces())).toBeTruthy();
    });

    test('Is Possible Moves Black Test', () => {
        expect(pawnBlack.isPossibleMove('b3', 'b2', bottonBlackBoard.getPieces())).toBeTruthy();
        expect(pawnBlack.isPossibleMove('b3', 'b1', topBlackBoard.getPieces())).toBeTruthy();

        expect(pawnBlack.isPossibleMove('d2', 'c1', surroundedOpositeBlackBoard.getPieces())).toBeTruthy();
        expect(pawnBlack.isPossibleMove('d2', 'e1', surroundedOpositeBlackBoard.getPieces())).toBeTruthy();
    });

    test('Is Not Possible Moves White Test', () => {
        let pawnWhite = getPawnMoveRule(false, false);
        expect(pawnWhite.isPossibleMove('b1', 'b3', bottonWhiteBoard.getPieces())).toBeFalsy();
        expect(pawnWhite.isPossibleMove('d2', 'e1', surroundedOpositeWhiteBoard.getPieces())).toBeFalsy();
        expect(pawnWhite.isPossibleMove('d2', 'c1', surroundedOpositeWhiteBoard.getPieces())).toBeFalsy();
    });

    test('Is Not Possible Moves Black Test', () => {
        let pawnBlack = getPawnMoveRule(false, true);
        expect(pawnBlack.isPossibleMove('b3', 'b1', bottonBlackBoard.getPieces())).toBeFalsy();
        expect(pawnBlack.isPossibleMove('d2', 'e3', surroundedOpositeBlackBoard.getPieces())).toBeFalsy();
        expect(pawnBlack.isPossibleMove('d2', 'c3', surroundedOpositeBlackBoard.getPieces())).toBeFalsy();
    });
});

describe('Get Attack Movements', () => {
    test('Get Attack Movements for White Test', () => {
        let moves = pawnWhite.getAttackMovements('d2', surroundedOpositeWhiteBoard.getPieces());
        expect(moves.includes("e3")).toBeTruthy();
        expect(moves.includes("c3")).toBeTruthy();
    });

    test('Get Attack Movements for Black Test', () => {
        let moves = pawnBlack.getAttackMovements('d2', surroundedOpositeBlackBoard.getPieces());
        expect(moves.includes("c1")).toBeTruthy();
        expect(moves.includes("c1")).toBeTruthy();
    });

    test('Get Not Attack Movements for White Test', () => {
        let moves = pawnWhite.getAttackMovements('b1', bottonWhiteBoard.getPieces());
        expect(moves).toStrictEqual([]);
    });

    test('Get Not  Attack Movements for Black Test', () => {
        let moves = pawnWhite.getAttackMovements('b3', bottonBlackBoard.getPieces());
        expect(moves).toStrictEqual([]);
    });
});

describe('Get Next Move Rule', () => {

    test('Get Next Move Rule Pawn White Test', () => {
        pawnWhite.updateCurrentPosition('b1', bottonWhiteBoard.getPieces());
        let nextRule = pawnWhite.getNextMoveRule('P');
        expect(nextRule.moveRule).toBe(pawnWhite);
        expect(nextRule.abbreviation).toBe('P');
    });

    test('Get Next Move Rule Pawn Black Test', () => {
        pawnBlack.updateCurrentPosition('b8', topBlackBoard.getPieces());
        let nextRule = pawnBlack.getNextMoveRule('P');
        expect(nextRule.moveRule).toBe(pawnBlack);
        expect(nextRule.abbreviation).toBe('P');
    });

    test('Get Next Move Rule Queen White Test', () => {
        pawnWhite.updateCurrentPosition('b8', topBlackBoard.getPieces());
        let nextRule = pawnWhite.getNextMoveRule('P');
        expect(nextRule.abbreviation).toBe('Q');
    });

    test('Get Next Move Rule Queen Black Test', () => {
        pawnBlack.updateCurrentPosition('b1', bottonBlackBoard.getPieces());
        let nextRule = pawnBlack.getNextMoveRule('P');
        expect(nextRule.abbreviation).toBe('Q');
    });
});
