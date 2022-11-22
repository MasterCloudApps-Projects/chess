import { createGame }  from '../../main/game.js';
import { randomPlayer }  from '../../main/randomPlayer.js';
import { PieceColorEnum } from '../../piece/pieceColorEnum.js';
import { createBoardBuilder } from '../mock/boardBuilder.js';
import { createRegistry } from '../mock/registry.js';

let game;
let mockBoard;
let mockBoardBuilder = createBoardBuilder()
let mockRegistry = createRegistry();

function mockCreateRegistry() {
    return mockRegistry;
}

function mockCreateBoardBuilder() {
    mockBoard = mockBoardBuilder.build();
    return mockBoardBuilder;
}

jest.mock('../../main/registry.js', () => ({
    createRegistry: mockCreateRegistry
}));

jest.mock('../../main/boardBuilder.js', () => ({
    boardBuilder: mockCreateBoardBuilder
}));


beforeEach(() => {
    game = createGame('1');
});

describe('Access', () => {
    test('get board test', () => {
        expect(game.getBoard()).toStrictEqual(mockBoard);
    });

    test('get Uuid game test', () => {
        expect(game.getUuid()).toBe('1');
    });
});

describe('Undo / redo', () => {
    test('undo test', () => {
        const undo = jest.spyOn(mockRegistry, 'undo').mockReturnValue(undefined);
        game.undo();
        expect(undo).toBeCalled();
    });

    test('redo test', () => {
        const redo = jest.spyOn(mockRegistry, 'redo').mockReturnValue(undefined);
        game.redo();
        expect(redo).toBeCalled();
    });
});

describe('Random movement', () => {
    test('Get random movement test', () => {
        const getMovement = jest.spyOn(randomPlayer, 'getMovement').mockReturnValue("Test Get Movement CPU");
        const gameResponse = game.getRandomMovement();
        expect(getMovement).toBeCalled();
        expect(gameResponse.data).toBe("Test Get Movement CPU");
        expect(gameResponse.error).toBe(false);
    });
});

describe('Play', () => {
    test('To make the movement test', () => {
        const boardCoordinates = jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue(['a2']);
        const boardTry = jest.spyOn(mockBoard, 'tryMove').mockReturnValue(undefined);
        const boardIsNotOnCheck = jest.spyOn(mockBoard, 'isOnCheckMate').mockReturnValue(undefined);
        const boardIsNotStalemate= jest.spyOn(mockBoard, 'isStalemate').mockReturnValue(undefined);

        const playResult = game.play('a1', 'a2', PieceColorEnum.White);

        expect(boardCoordinates).toBeCalled();
        expect(boardTry).toHaveBeenLastCalledWith('a1', 'a2', PieceColorEnum.White)
        expect(boardIsNotOnCheck).toHaveBeenCalledWith(PieceColorEnum.Black)
        expect(boardIsNotStalemate).toHaveBeenCalledWith(PieceColorEnum.Black)
        expect(playResult.error).toBe(false);
    });

    test('It is not the player\'s turn test', () => {
        const errorTurn = game.play('a1', 'a2', PieceColorEnum.Black);
        expect(errorTurn.error).toBe(true);
        expect(errorTurn.errorMessage).toBe("Not black's turn to play.");
    });

    test('Finishing pieces  on the board test', () => {
        const coloredSquares = [];
        const boardEmpty = jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue(coloredSquares);
        const endResult = game.play('a1', 'a2', PieceColorEnum.White);
        expect(boardEmpty).toBeCalled();
        expect(endResult.error).toBe(false);
    });

    test('End Game in check mate test', () => {
        const boardCoordinates = jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue(['a2']);
        const boardTry = jest.spyOn(mockBoard, 'tryMove').mockReturnValue(undefined);
        const boardIsOncheck = jest.spyOn(mockBoard, 'isOnCheckMate').mockReturnValue(true);
        const boardIsNotStalemate= jest.spyOn(mockBoard, 'isStalemate').mockReturnValue(false);

        const playResult = game.play('a1', 'a2', PieceColorEnum.White);

        expect(boardCoordinates).toBeCalled();
        expect(boardTry).toHaveBeenLastCalledWith('a1', 'a2', PieceColorEnum.White)
        expect(boardIsOncheck).toHaveBeenCalledWith(PieceColorEnum.Black)
        expect(boardIsNotStalemate).toHaveBeenCalledWith(PieceColorEnum.Black)
        expect(playResult.error).toBeFalsy();
        expect(game.isGameFinished()).toBeTruthy();
    });

    test('End Game in Stalemate test', () => {
        const boardCoordinates = jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue(['a2']);
        const boardTry = jest.spyOn(mockBoard, 'tryMove').mockReturnValue(undefined);
        const boardIsOncheck = jest.spyOn(mockBoard, 'isOnCheckMate').mockReturnValue(false);
        const boardIsNotStalemate= jest.spyOn(mockBoard, 'isStalemate').mockReturnValue(true);

        const playResult = game.play('a1', 'a2', PieceColorEnum.White);

        expect(boardCoordinates).toBeCalled();
        expect(boardTry).toHaveBeenLastCalledWith('a1', 'a2', PieceColorEnum.White)
        expect(boardIsOncheck).toHaveBeenCalledWith(PieceColorEnum.Black)
        expect(boardIsNotStalemate).toHaveBeenCalledWith(PieceColorEnum.Black)
        expect(playResult.error).toBeFalsy();
        expect(game.isGameFinished()).toBeTruthy();
    });

    test('try to play in a finished game test', () => {
        const boardCoordinates = jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue(['a2']);
        const boardTry = jest.spyOn(mockBoard, 'tryMove').mockReturnValue(undefined);
        const boardIsOncheck = jest.spyOn(mockBoard, 'isOnCheckMate').mockReturnValue(false);
        const boardIsNotStalemate= jest.spyOn(mockBoard, 'isStalemate').mockReturnValue(true);

        game.play('a1', 'a2', PieceColorEnum.White)
        const playResult = game.play('a2', 'a3', PieceColorEnum.White);

        expect(boardCoordinates).toBeCalled();
        expect(boardTry).toHaveBeenLastCalledWith('a1', 'a2', PieceColorEnum.White)
        expect(boardIsOncheck).toHaveBeenCalledWith(PieceColorEnum.Black)
        expect(boardIsNotStalemate).toHaveBeenCalledWith(PieceColorEnum.Black)
        expect(playResult.error).toBeFalsy();
        expect(playResult.data).toBe('Game finished.');
    });
});

describe('Game status', () => {
    test('Is game finished test', () => {
        jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue([]);
        game.play('a1', 'a2', PieceColorEnum.White);
        const isGameFinished = game.isGameFinished();
        expect(isGameFinished).toBe(true);
    });

    test('Is not game finished test', () => {
        const isGameFinished = game.isGameFinished();
        expect(isGameFinished).toBe(false);
    });

    test('Game status is finished test', () => {
        jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue([]);
        game.play('a1', 'a2', PieceColorEnum.White);
        const status = game.getStatus();
        expect(status.data.status).toBe("finished");
        expect(status.error).toBe(false);
    });

    test('Game status is ongoing test', () => {
        const status = game.getStatus();
        expect(status.data.status).toBe("ongoing");
        expect(status.error).toBe(false);
    });
});

describe('Board response', () => {
    test('Board response test', () => {
        const boarResponse = jest.spyOn(mockBoard, 'getBoardPieceNames').mockReturnValue('a1');
        const gameBoardResponse = game.getBoardResponse();
        expect(boarResponse).toBeCalled();
        expect(gameBoardResponse.error).toBe(false);
        expect(gameBoardResponse.data).toBe('a1');
    });
});

describe('is redoable / is undoable', () => {
    test('undoable and redoable true test', () => {
        const isUndoable = jest.spyOn(mockRegistry, 'isUndoable').mockReturnValue(true);
        const isRedoable = jest.spyOn(mockRegistry, 'isRedoable').mockReturnValue(true);
        const undoableRedoable = game.undoableRedoable();
        expect(isUndoable).toBeCalled();
        expect(isRedoable).toBeCalled();
        expect(undoableRedoable.data.isUndoable).toBeTruthy();
        expect(undoableRedoable.data.isRedoable).toBeTruthy();
    });

    test('undoable and redoable false test', () => {
        const isUndoable = jest.spyOn(mockRegistry, 'isUndoable').mockReturnValue(false);
        const isRedoable = jest.spyOn(mockRegistry, 'isRedoable').mockReturnValue(false);
        const undoableRedoable = game.undoableRedoable();
        expect(isUndoable).toBeCalled();
        expect(isRedoable).toBeCalled();
        expect(undoableRedoable.data.isUndoable).toBeFalsy();
        expect(undoableRedoable.data.isRedoable).toBeFalsy();
    });

    test('undoable true and redoable false test', () => {
        const isUndoable = jest.spyOn(mockRegistry, 'isUndoable').mockReturnValue(true);
        const isRedoable = jest.spyOn(mockRegistry, 'isRedoable').mockReturnValue(false);
        const undoableRedoable = game.undoableRedoable();
        expect(isUndoable).toBeCalled();
        expect(isRedoable).toBeCalled();
        expect(undoableRedoable.data.isUndoable).toBeTruthy();
        expect(undoableRedoable.data.isRedoable).toBeFalsy();
    });

    test('undoable false and redoable true test', () => {
        const isUndoable = jest.spyOn(mockRegistry, 'isUndoable').mockReturnValue(false);
        const isRedoable = jest.spyOn(mockRegistry, 'isRedoable').mockReturnValue(true);
        const undoableRedoable = game.undoableRedoable();
        expect(isUndoable).toBeCalled();
        expect(isRedoable).toBeCalled();
        expect(undoableRedoable.data.isUndoable).toBeFalsy();
        expect(undoableRedoable.data.isRedoable).toBeTruthy();
    });
});




