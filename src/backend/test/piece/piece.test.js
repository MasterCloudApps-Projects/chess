import { createPieceMoveRule } from "../mock/pieceMoveRule.js";
import { createPiece } from "../../piece/piece.js";
import { getQueenMoveRule } from "../../moveRule/queenMoveRule.js";
import { boardBuilder } from '../utils/boardBuilderTest.js'
import { createCoordinate } from '../../moveRule/coordinate.js'
import { PieceColorEnum } from "../../piece/pieceColorEnum.js";


let pieceBlack;
let pieceWhite;
let pieceEmpty;
let mockPieceMoveRule = createPieceMoveRule();
let board;

beforeEach(() => {
    pieceBlack = createPiece('BP', 'a1', mockPieceMoveRule);
    pieceWhite = createPiece('WP', 'b2', mockPieceMoveRule);
    pieceEmpty = createPiece('_', 'c3');

    board = boardBuilder(`
    BP-BQ-BP
    _-_-_
    WP-WQ-WP`, 3, "abc").build();
});

describe('Access / modification', () => {
    test('Get abbreviation test', () => {
        let pieceBlackAbbreviation = pieceBlack.getAbbreviation();
        let pieceWhiteAbbreviation = pieceWhite.getAbbreviation();
        let pieceEmptyAbbreviation = pieceEmpty.getAbbreviation();
        expect(pieceBlackAbbreviation).toBe('BP');
        expect(pieceWhiteAbbreviation).toBe('WP');
        expect(pieceEmptyAbbreviation).toBe('_');
    });

    test('Update abbreviation test', () => {
        pieceBlack.setAbbreviation('BQ');
        pieceWhite.setAbbreviation('_');
        expect(pieceBlack.getAbbreviation()).toBe('BQ');
        expect(pieceWhite.getAbbreviation()).toBe('_');
    });

    test('Get full name test', () => {
        expect(pieceBlack.getFullName()).toBe('black pawn');
        expect(pieceWhite.getFullName()).toBe('white pawn');
        expect(pieceEmpty.getFullName()).toBe('empty');
    });

    test('Upadate full name test', () => {
        pieceBlack.setFullName('black queen');
        pieceWhite.setFullName('empty');
        expect(pieceBlack.getFullName()).toBe('black queen');
        expect(pieceWhite.getFullName()).toBe('empty');
    });

    test('Get full name test', () => {
        expect(pieceBlack.getPosition()).toBe('a1');
        expect(pieceWhite.getPosition()).toBe('b2');
        expect(pieceEmpty.getPosition()).toBe('c3');
    });

    test('Get movement rule test', () => {
        let queenMovementRule = getQueenMoveRule();
        pieceWhite.setMovementRule(queenMovementRule);
        expect(pieceBlack.getMovementRule()).toBe(mockPieceMoveRule);
        expect(pieceWhite.getMovementRule()).toBe(queenMovementRule);
        expect(pieceEmpty.getMovementRule()).toBe(undefined);
    });

    test('Update position test', () => {
        pieceBlack.setPosition('d4');
        pieceWhite.setPosition('e5');
        pieceEmpty.setPosition('f6');
        expect(pieceBlack.getPosition()).toBe('d4');
        expect(pieceWhite.getPosition()).toBe('e5');
        expect(pieceEmpty.getPosition()).toBe('f6');
    });
});

describe('Movements', () => {
    test('Update current position test', () => {
        let updateCurrentPosition = jest.spyOn(mockPieceMoveRule, 'updateCurrentPosition');
        pieceBlack.updateCurrentPosition('c4', board.getPieces());
        expect(updateCurrentPosition).toHaveBeenCalledWith('c4', board.getPieces());
    });

    test('Is possible move test', () => {
        let queenMoveRule = getQueenMoveRule();
        let nextMoveRule = { moveRule: queenMoveRule, abbreviation: 'Q' };
        let isPossibleMove = jest.spyOn(mockPieceMoveRule, 'isPossibleMove');
        let updateCurrentPosition = jest.spyOn(mockPieceMoveRule, 'updateCurrentPosition');
        let getNextMoveRule = jest.spyOn(mockPieceMoveRule, 'getNextMoveRule');
        isPossibleMove.mockReturnValue(true);
        getNextMoveRule.mockReturnValue(nextMoveRule);

        let isPossible = pieceBlack.isPossibleMove('c4', board.getPieces());

        expect(isPossibleMove).toHaveBeenCalledWith('a1', 'c4', board.getPieces());
        expect(updateCurrentPosition).toHaveBeenCalledWith('c4', board.getPieces());
        expect(pieceBlack.getMovementRule()).toBe(queenMoveRule);
        expect(pieceBlack.getAbbreviation()).toBe('BQ');
        expect(pieceBlack.getFullName()).toBe('black queen');
        expect(isPossible).toBeTruthy();
    });

    test('Is not possible move test', () => {
        let isPossibleMove = jest.spyOn(mockPieceMoveRule, 'isPossibleMove');
        isPossibleMove.mockReturnValue(false);
        let isNotPossible = pieceBlack.isPossibleMove('c4', board.getPieces());
        expect(isPossibleMove).toHaveBeenCalledWith('a1', 'c4', board.getPieces());
        expect(isNotPossible).toBeFalsy();
    });

    test('Get possible movements test', () => {
        let movements = [createCoordinate(2, 5)];
        let getPossibleMovements = jest.spyOn(mockPieceMoveRule, 'getPossibleMovements');
        getPossibleMovements.mockReturnValue(movements);

        let possibleMovements = pieceBlack.getPossibleMovements(board.getPieces());

        expect(getPossibleMovements).toHaveBeenCalledWith('a1', board.getPieces());
        expect(possibleMovements).toStrictEqual(['e2']);
    });

    test('Get attack movements test', () => {
        let movements = ['e2', 'a4'];
        let getAttackMovements = jest.spyOn(mockPieceMoveRule, 'getAttackMovements');
        getAttackMovements.mockReturnValue(movements);

        let possibleMovements = pieceBlack.getAttackPositions(board.getPieces());

        expect(getAttackMovements).toHaveBeenCalledWith('a1', board.getPieces());
        expect(possibleMovements).toStrictEqual(movements);
    });

    test('Get movement error', () => {
        let error = 'this is a move error';
        let getErrorMessages = jest.spyOn(mockPieceMoveRule, 'getErrorMessages');
        getErrorMessages.mockReturnValue(error);

        let movementError = pieceBlack.getMovementError();

        expect(getErrorMessages).toHaveBeenCalled();
        expect(movementError).toStrictEqual(error);
    });
});

describe('Identification of the piece', () => {
    test('Is white test', () => {
        expect(pieceBlack.isWhite()).toBeFalsy();
        expect(pieceWhite.isWhite()).toBeTruthy();
        expect(pieceEmpty.isWhite()).toBeFalsy();
    });

    test('Is opposite color of white test', () => {
        expect(pieceBlack.isOpposingColor(pieceWhite)).toBeTruthy();
        expect(pieceWhite.isOpposingColor(pieceWhite)).toBeFalsy();
    });

    test('Is opposite color of black test', () => {
        expect(pieceBlack.isOpposingColor(pieceBlack)).toBeFalsy();
        expect(pieceWhite.isOpposingColor(pieceBlack)).toBeTruthy();
    });

    test('Is opposite color of empty test', () => {
        expect(pieceBlack.isOpposingColor(pieceEmpty)).toBeFalsy();
        expect(pieceWhite.isOpposingColor(pieceEmpty)).toBeFalsy();
    });

    test('Is of color white test', () => {
        expect(pieceBlack.isOfColor(PieceColorEnum.White)).toBeFalsy();
        expect(pieceWhite.isOfColor(PieceColorEnum.White)).toBeTruthy();
        expect(pieceEmpty.isOfColor(PieceColorEnum.White)).toBeFalsy();
    });

    test('Is of color black test', () => {
        expect(pieceBlack.isOfColor(PieceColorEnum.Black)).toBeTruthy();
        expect(pieceWhite.isOfColor(PieceColorEnum.Black)).toBeFalsy();
        expect(pieceEmpty.isOfColor(PieceColorEnum.Black)).toBeFalsy();
    });

    test('Is of color empty test', () => {
        expect(pieceBlack.isOfColor(PieceColorEnum.Empty)).toBeFalsy();
        expect(pieceWhite.isOfColor(PieceColorEnum.Empty)).toBeFalsy();
        expect(pieceEmpty.isOfColor(PieceColorEnum.Empty)).toBeTruthy();
    });

    test('Is empty test', () => {
        expect(pieceBlack.isEmpty()).toBeFalsy();
        expect(pieceWhite.isEmpty()).toBeFalsy();
        expect(pieceEmpty.isEmpty()).toBeTruthy();
    });
});
