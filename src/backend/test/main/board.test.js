import { layout } from '../utils/layoutBoard.js';
import { boardBuilder } from '../../main/boardBuilder.js';
import { PieceColorEnum } from '../../piece/pieceColorEnum.js';
import { boardToArray, strLayoutToArray } from '../utils/boardUtil.js';

let tryMoveBoard;
let checkMateBoard;
let checkBoard;
let stalemateBoard;

beforeEach(() => {
    tryMoveBoard = boardBuilder().fromPieceLayoutString(layout.tryMove).build();
    checkBoard = boardBuilder().fromPieceLayoutString(layout.check).build();
    checkMateBoard = boardBuilder().fromPieceLayoutString(layout.checkMate).build();
    stalemateBoard = boardBuilder().fromPieceLayoutString(layout.stalemate).build();
});

describe('Memento', () => {
    test('Create memento', () => {
        let actual = tryMoveBoard.createMemento().slice(0, -1).split('-');
        expect(actual).toEqual(strLayoutToArray(layout.tryMove));
    });

    test('Set memento', () => {
        const memento = tryMoveBoard.createMemento();
        tryMoveBoard.tryMove('d2', 'b2', PieceColorEnum.White);
        expect(boardToArray(tryMoveBoard)).not.toEqual(strLayoutToArray(layout.tryMove));
        tryMoveBoard.setMemento(memento);
        expect(boardToArray(tryMoveBoard)).toEqual(strLayoutToArray(layout.tryMove));
    });
});

describe('Try move', () => {
    test('Trying to move a blank piece', () => {
        expect(tryMoveBoard.tryMove('c2', 'c3', PieceColorEnum.White)).toBe("Invalid move: Attempting to move a wrong color piece.");
        expect(boardToArray(tryMoveBoard)).toEqual(strLayoutToArray(layout.tryMove));
    });

    test('Trying to move a black piece when it is turn of white', () => {
        expect(tryMoveBoard.tryMove('h5', 'g4', PieceColorEnum.White)).toBe("Invalid move: Attempting to move a wrong color piece.");
        expect(boardToArray(tryMoveBoard)).toEqual(strLayoutToArray(layout.tryMove));
    });

    test('Trying to move piece to the limit of the board', () => {
        expect(tryMoveBoard.tryMove('d2', 'a2', PieceColorEnum.White)).toBe(undefined);
        expect(boardToArray(tryMoveBoard)).toEqual(strLayoutToArray(layout.tryMoveAfterMoveToLimit));
    });

    test('Trying to eat an enemy piece', () => {
        expect(tryMoveBoard.tryMove('d2', 'd6', PieceColorEnum.White)).toBe(undefined);
        expect(boardToArray(tryMoveBoard)).toEqual(strLayoutToArray(layout.tryMoveAfterEating));
    });

    test('Trying to go through an enemy piece', () => {
        expect(tryMoveBoard.tryMove('d2', 'd7', PieceColorEnum.White)).toBe("Invalid white queen movement");
        expect(boardToArray(tryMoveBoard)).toEqual(strLayoutToArray(layout.tryMove));
    });

    test('Trying to perform a move which leads to checkMate', () => {
        expect(tryMoveBoard.tryMove('e2', 'e3', PieceColorEnum.White)).toBe("Invalid move: cannot end turn on check");
        expect(boardToArray(tryMoveBoard)).toEqual(strLayoutToArray(layout.tryMove));
    });
});

describe('Game state situations', () => {
    test('Board is not on check', () => {
        expect(tryMoveBoard.isColorOnCheck(PieceColorEnum.White)).not.toBeTruthy();
    });

    test('Board is on check', () => {
        expect(checkBoard.isColorOnCheck(PieceColorEnum.Black)).toBeTruthy();
    });

    test('Board is on checkmate', () => {
        expect(checkMateBoard.isColorOnCheck(PieceColorEnum.Black)).toBeTruthy();
        expect(checkMateBoard.isOnCheckMate(PieceColorEnum.Black)).toBeTruthy();
    });

    test('Board is on stalemate', () => {
        expect(stalemateBoard.isColorOnCheck(PieceColorEnum.Black)).not.toBeTruthy();
        expect(stalemateBoard.isOnCheckMate(PieceColorEnum.Black)).not.toBeTruthy();
        expect(stalemateBoard.isStalemate(PieceColorEnum.Black)).toBeTruthy();
    });
});