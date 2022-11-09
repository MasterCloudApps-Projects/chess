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

test('testGetBoard', () => {
    expect(game.getBoard()).toStrictEqual(mockBoard);
});

test('testGetGameUuid', () => {
    expect(game.getUuid()).toBe('1');
});

test('testUndo', () => {
    const undo = jest.spyOn(mockRegistry, 'undo').mockReturnValue(undefined);
    game.undo();
    expect(undo).toBeCalled();
});

test('testRedo', () => {
    const redo = jest.spyOn(mockRegistry, 'redo').mockReturnValue(undefined);
    game.redo();
    expect(redo).toBeCalled();
});

test('testGetRandomMovement', () => {
    const getMovement = jest.spyOn(randomPlayer, 'getMovement').mockReturnValue("Test Get Movement CPU");
    const gameResponse = game.getRandomMovement();
    expect(getMovement).toBeCalled();
    expect(gameResponse.data).toBe("Test Get Movement CPU");
    expect(gameResponse.error).toBe(false);
});

test('testPlayWhiteTurn', () => {
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

test('testPlayNotPlayer', () => {
    const errorTurn = game.play('a1', 'a2', PieceColorEnum.Black);
    expect(errorTurn.error).toBe(true);
    expect(errorTurn.errorMessage).toBe("Not black's turn to play.");
});

test('testEndGameByBoardEmty', () => {
    const coloredSquares = [];
    const boardEmpty = jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue(coloredSquares);
    const endResult = game.play('a1', 'a2', PieceColorEnum.White);
    expect(boardEmpty).toBeCalled();
    expect(endResult.error).toBe(false);
});

test('testEndGame', () => {
    const boardEmpty = jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue([]);
    game.play('a1', 'a2', PieceColorEnum.White);
    const tryGameInFinished = game.play('a1', 'a2', PieceColorEnum.Black);
    expect(boardEmpty).toBeCalled();
    expect(tryGameInFinished.error).toBe(false);
});

test('testErrorNotBlackPlayerTurn', () => {
    const endResult = game.play('a1', 'a2', PieceColorEnum.Black);
    expect(endResult.errorMessage).toBe("Not black's turn to play.");
    expect(endResult.error).toBe(true);
});

test('testIsGameFinished', () => {
    jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue([]);
    game.play('a1', 'a2', PieceColorEnum.White);
    const isGameFinished = game.isGameFinished();
    expect(isGameFinished).toBe(true);
});

test('testIsNotGameFinished', () => {
    const isGameFinished = game.isGameFinished();
    expect(isGameFinished).toBe(false);
});

test('testGameStatusIsFinished', () => {
    jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue([]);
    game.play('a1', 'a2', PieceColorEnum.White);
    const status = game.getStatus();
    expect(status.data.status).toBe("finished");
    expect(status.error).toBe(false);
});

test('testGameStatusIsOngoing', () => {
    const status = game.getStatus();
    expect(status.data.status).toBe("ongoing");
    expect(status.error).toBe(false);
});

test('testGetBoardResponse', () => {
    const boarResponse = jest.spyOn(mockBoard, 'getBoardPieceNames').mockReturnValue('a1');
    const gameBoardResponse = game.getBoardResponse();
    expect(boarResponse).toBeCalled();
    expect(gameBoardResponse.error).toBe(false);
    expect(gameBoardResponse.data).toBe('a1');
});

test('testUndoableRedoableBothTrue', () => {
    const isUndoable = jest.spyOn(mockRegistry, 'isUndoable').mockReturnValue(true);
    const isRedoable = jest.spyOn(mockRegistry, 'isRedoable').mockReturnValue(true);
    const undoableRedoable = game.undoableRedoable();
    expect(isUndoable).toBeCalled();
    expect(isRedoable).toBeCalled();
    expect(undoableRedoable.data.isUndoable).toBe(true);
    expect(undoableRedoable.data.isRedoable).toBe(true);
});

test('testUndoableRedoableBothFalse', () => {
    const isUndoable = jest.spyOn(mockRegistry, 'isUndoable').mockReturnValue(false);
    const isRedoable = jest.spyOn(mockRegistry, 'isRedoable').mockReturnValue(false);
    const undoableRedoable = game.undoableRedoable();
    expect(isUndoable).toBeCalled();
    expect(isRedoable).toBeCalled();
    expect(undoableRedoable.data.isUndoable).toBe(false);
    expect(undoableRedoable.data.isRedoable).toBe(false);
});

test('testGetRandomMovement', () => {
    const randomMove = jest.spyOn(randomPlayer, 'getMovement').mockReturnValue('Test random move');
    const gameRandomMovement = game.getRandomMovement();
    expect(randomMove).toHaveBeenCalledWith(game.getBoard());
    expect(gameRandomMovement.data).toBe("Test random move");
});

