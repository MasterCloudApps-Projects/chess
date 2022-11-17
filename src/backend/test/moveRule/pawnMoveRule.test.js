import { getPawnMoveRule }  from '../../moveRule/pawnMoveRule';
import { boardBuilder } from '../../main/boardBuilder.js';
import { layout } from './utils/layoutBoard.js'
import { getPossibleCoordiantes } from './utils/move.js'

let pawnWhite;
let pawnBlack;
let bottonWhiteBoard;
let bottonBlackBoard;
let topWhiteBoard;
let topBlackBoard;
let surroundedWhiteBoard;
let surroundedBlackBoard;
let surroundedEnemiesWhiteBoard;
let surroundedEnemiesBlackBoard;

beforeEach(() => {
    pawnWhite = getPawnMoveRule(true, false);
    pawnBlack = getPawnMoveRule(true, true);

    bottonWhiteBoard = boardBuilder().fromPieceLayoutString(layout.botton.replace('X', 'WP')).build();
    topBlackBoard = boardBuilder().fromPieceLayoutString(layout.top.replace('X', 'BP')).build();
    topWhiteBoard = boardBuilder().fromPieceLayoutString(layout.top.replace('X', 'WP')).build();
    bottonBlackBoard = boardBuilder().fromPieceLayoutString(layout.botton.replace('X', 'BP')).build();
    surroundedWhiteBoard = boardBuilder().fromPieceLayoutString(layout.surrounded.replace('X', 'WP').replace(/Y/g, 'WP')).build();
    surroundedBlackBoard = boardBuilder().fromPieceLayoutString(layout.surrounded.replace('X', 'BP').replace(/Y/g, 'BP')).build();
    surroundedEnemiesWhiteBoard = boardBuilder().fromPieceLayoutString(layout.surrounded.replace('X', 'WP').replace(/Y/g, 'BP')).build();
    surroundedEnemiesBlackBoard = boardBuilder().fromPieceLayoutString(layout.surrounded.replace('X', 'BP').replace(/Y/g, 'WP')).build();
});

describe('Get possible moves', () => {
    test('Forward movement of white test', () => {
        let possibleCoordinate = getPossibleCoordiantes('b1', bottonWhiteBoard.getPieces(), pawnWhite);
        expect(possibleCoordinate.includes("b2")).toBeTruthy();
        expect(possibleCoordinate.includes("b3")).toBeTruthy();
    });

    test('Forward movement of black test', () => {
        let possibleCoordinate = getPossibleCoordiantes('b8', topBlackBoard.getPieces(), pawnBlack);
        expect(possibleCoordinate.includes("b7")).toBeTruthy();
        expect(possibleCoordinate.includes("b6")).toBeTruthy();
    });

    test('No forward movement of white: is at the end test', () => {
        let possibleCoordinate = getPossibleCoordiantes('b8', topWhiteBoard.getPieces(), pawnWhite);
        expect(possibleCoordinate.length === 0).toBeTruthy();
    });

    test('No forward movement of black: is at the end test', () => {
        let possibleCoordinate = getPossibleCoordiantes('b1', bottonBlackBoard.getPieces(), pawnBlack);
        expect(possibleCoordinate.length === 0).toBeTruthy()
    });

    test('No forward movement: is surrounded test', () => {
        let possibleCoordinateWhite = getPossibleCoordiantes('d2', surroundedWhiteBoard.getPieces(), pawnWhite);
        let possibleCoordinateBlack = getPossibleCoordiantes('d2', surroundedBlackBoard.getPieces(), pawnBlack);
        expect(possibleCoordinateWhite.length === 0).toBeTruthy();
        expect(possibleCoordinateBlack.length === 0).toBeTruthy();
    });

    test('White\'s attacking move test', () => {
        let possibleCoordinate = getPossibleCoordiantes('d2', surroundedEnemiesWhiteBoard.getPieces(), pawnWhite);
        expect(possibleCoordinate.includes("e3")).toBeTruthy();
        expect(possibleCoordinate.includes("c3")).toBeTruthy();
        expect(possibleCoordinate.includes("c1")).toBeFalsy();
        expect(possibleCoordinate.includes("e1")).toBeFalsy();
    });

    test('Black\'s attacking move test', () => {
        let possibleCoordinate = getPossibleCoordiantes('d2', surroundedEnemiesBlackBoard.getPieces(), pawnBlack);
        expect(possibleCoordinate.includes("c1")).toBeTruthy();
        expect(possibleCoordinate.includes("e1")).toBeTruthy();
        expect(possibleCoordinate.includes("e3")).toBeFalsy();
        expect(possibleCoordinate.includes("c3")).toBeFalsy();
    });
});

describe('Is possible moves', () => {
    test('Is possible movement of white test', () => {
        expect(pawnWhite.isPossibleMove('b1', 'b2', bottonWhiteBoard.getPieces())).toBeTruthy();
        expect(pawnWhite.isPossibleMove('b1', 'b3', bottonWhiteBoard.getPieces())).toBeTruthy();

        expect(pawnWhite.isPossibleMove('d2', 'e3', surroundedEnemiesWhiteBoard.getPieces())).toBeTruthy();
        expect(pawnWhite.isPossibleMove('d2', 'c3', surroundedEnemiesWhiteBoard.getPieces())).toBeTruthy();
    });

    test('is possible movement of black test', () => {
        expect(pawnBlack.isPossibleMove('b3', 'b2', bottonBlackBoard.getPieces())).toBeTruthy();
        expect(pawnBlack.isPossibleMove('b3', 'b1', topBlackBoard.getPieces())).toBeTruthy();

        expect(pawnBlack.isPossibleMove('d2', 'c1', surroundedEnemiesBlackBoard.getPieces())).toBeTruthy();
        expect(pawnBlack.isPossibleMove('d2', 'e1', surroundedEnemiesBlackBoard.getPieces())).toBeTruthy();
    });

    test('Is not possible movement of white test', () => {
        let pawnWhite = getPawnMoveRule(false, false);
        expect(pawnWhite.isPossibleMove('b1', 'b3', bottonWhiteBoard.getPieces())).toBeFalsy();
        expect(pawnWhite.isPossibleMove('d2', 'e1', surroundedEnemiesWhiteBoard.getPieces())).toBeFalsy();
        expect(pawnWhite.isPossibleMove('d2', 'c1', surroundedEnemiesWhiteBoard.getPieces())).toBeFalsy();
    });

    test('Is possible movement of black test', () => {
        let pawnBlack = getPawnMoveRule(false, true);
        expect(pawnBlack.isPossibleMove('b3', 'b1', bottonBlackBoard.getPieces())).toBeFalsy();
        expect(pawnBlack.isPossibleMove('d2', 'e3', surroundedEnemiesBlackBoard.getPieces())).toBeFalsy();
        expect(pawnBlack.isPossibleMove('d2', 'c3', surroundedEnemiesBlackBoard.getPieces())).toBeFalsy();
    });
});

describe('Get attack movements', () => {
    test('There are attack movements for white test', () => {
        let moves = pawnWhite.getAttackMovements('d2', surroundedEnemiesWhiteBoard.getPieces());
        expect(moves.includes("e3")).toBeTruthy();
        expect(moves.includes("c3")).toBeTruthy();
    });

    test('There are attack movements for black test', () => {
        let moves = pawnBlack.getAttackMovements('d2', surroundedEnemiesBlackBoard.getPieces());
        expect(moves.includes("c1")).toBeTruthy();
        expect(moves.includes("c1")).toBeTruthy();
    });

    test('No attack movements for white test', () => {
        let moves = pawnWhite.getAttackMovements('d2', surroundedWhiteBoard.getPieces());
        expect(moves).toStrictEqual([]);
    });

    test('GNo attack movements for black test', () => {
        let moves = pawnBlack.getAttackMovements('d2', surroundedBlackBoard.getPieces());
        expect(moves).toStrictEqual([]);
    });
});

describe('Get next move rule', () => {
    test('Next move is a white pawn test', () => {
        pawnWhite.updateCurrentPosition('b1', bottonWhiteBoard.getPieces());
        let nextRule = pawnWhite.getNextMoveRule('P');
        expect(nextRule.moveRule).toBe(pawnWhite);
        expect(nextRule.abbreviation).toBe('P');
    });

    test('Next move is a black pawn test', () => {
        pawnBlack.updateCurrentPosition('b8', topBlackBoard.getPieces());
        let nextRule = pawnBlack.getNextMoveRule('P');
        expect(nextRule.moveRule).toBe(pawnBlack);
        expect(nextRule.abbreviation).toBe('P');
    });

    test('Next move is a white queen test', () => {
        pawnWhite.updateCurrentPosition('b8', topBlackBoard.getPieces());
        let nextRule = pawnWhite.getNextMoveRule('P');
        expect(nextRule.abbreviation).toBe('Q');
    });

    test('Next move is a black queen test', () => {
        pawnBlack.updateCurrentPosition('b1', bottonBlackBoard.getPieces());
        let nextRule = pawnBlack.getNextMoveRule('P');
        expect(nextRule.abbreviation).toBe('Q');
    });
});
