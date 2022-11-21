import { createRegistry }  from '../../main/registry.js';
import { layout } from "../utils/layoutBoard.js";
import { createBoard } from '../mock/board.js';

let registry;
let board;
let boardTwo;
let mockBoard = createBoard();

function mockCreateBoard() {
    return mockBoard;
}

jest.mock('../../main/board.js', () => ({
    createBoard: mockCreateBoard
}));

beforeEach(() => {
    board = layout.botton.replace('X', 'WP');
    boardTwo = layout.top.replace('X', 'WP');
    registry = createRegistry(mockBoard);
    jest.clearAllMocks();
});

describe('Register', () => {
    test('First Register Test', () => {
        const createMemento = jest.spyOn(mockBoard, 'createMemento').mockReturnValue(board);
        registry.register();
        expect(createMemento).toBeCalled();
    });
});

describe('Undo / Redo', () => {
    test('Undo when it is possible test', () => {
        jest.spyOn(mockBoard, 'createMemento')
                                  .mockReturnValue(board)
                                  .mockReturnValue(boardTwo);
        const setMemento = jest.spyOn(mockBoard, 'setMemento');
        registry.register();
        registry.register();
        registry.undo();
        expect(setMemento).toHaveBeenCalledWith(boardTwo);
        expect(setMemento).toHaveBeenCalledTimes(1);
    });

    test('Undo when it is not possible test', () => {
        const setMemento = jest.spyOn(mockBoard, 'setMemento');
        let result = registry.undo();
        expect(result).toBe(undefined);
        expect(setMemento).not.toBeCalled();
    });

    test('Redo when it is possible test', () => {
        jest.spyOn(mockBoard, 'createMemento')
                                  .mockReturnValue(board)
                                  .mockReturnValue(boardTwo);
        const setMemento = jest.spyOn(mockBoard, 'setMemento');
        registry.register();
        registry.undo();
        registry.redo();
        expect(setMemento).toHaveBeenCalledTimes(2);
        expect(setMemento).toHaveBeenLastCalledWith(boardTwo);
    });

    test('Redo when it is not possible test', () => {
        const setMemento = jest.spyOn(mockBoard, 'setMemento');
        console.log(registry.isRedoable())
        let result = registry.redo();
        expect(result).toBe(undefined);
        expect(setMemento).not.toBeCalled();
    });

    test('Undo when it is not possible', () => {
        expect(registry.undo()).toEqual(undefined);
    });
});

describe('IsRedoable / isUndoable', () => {
    test('Is undoable test', () => {
        registry.register();
        registry.undo();
        expect(registry.isUndoable()).toBeFalsy();
    });

    test('Not is undoable test', () => {
        expect(registry.isUndoable()).toBeFalsy();
    });

    test('Is redoable test', () => {
        registry.register();
        expect(registry.isRedoable()).toBeFalsy();
    });

    test('Not is redoable test', () => {
        expect(registry.isRedoable()).toBeFalsy();
    });
});
