import { createGame }  from '../../main/game.js';
import { randomPlayer }  from '../../main/randomPlayer.js';
import { PieceColorEnum } from '../../piece/pieceColorEnum.js';
import { createBoard as mockCreateBoard } from '../mock/board.js';


//TODO: pending to refactor
////////////////////////
let undo = jest.fn();
let redo = jest.fn();

function mockCreateRegistry () {
    return {
        undo,
        redo
    }
}

function mockCreateBoardBuilder() {

    function usingInitialPieceDisposition(){
        return this;
    }

    function build(){
        return mockBoard;
    }

    return {
        usingInitialPieceDisposition,
        build
    }
}

//////////////////////////
let game;
let mockBoard = mockCreateBoard ();

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
    game.undo();
    expect(mockCreateRegistry().undo).toBeCalled();
});

test('testRedo', () => {
    game.redo();
    expect(mockCreateRegistry().redo).toBeCalled();
});

test('testGetRandomMovement', () => {
    const getMovement = jest.spyOn(randomPlayer, 'getMovement').mockReturnValue("Test Get Movement CPU");
    const gameResponse = game.getRandomMovement();
    expect(getMovement).toBeCalled();
    expect(gameResponse.data).toBe("Test Get Movement CPU");
    expect(gameResponse.error).toBe(false);
});

test('testEndGame', () => {
    const coloredSquares = [];
    const boardEmpty = jest.spyOn(mockBoard, 'getAllCoordinatesByColor').mockReturnValue(coloredSquares);
    const endResult = game.play('a1', 'a2', PieceColorEnum.White);
    expect(boardEmpty).toBeCalled();
    expect(endResult.error).toBe(false);
});

test('testErrorNotBlackPlayerTurn', () => {
    const endResult = game.play('a1', 'a2', PieceColorEnum.Black);
    expect(endResult.errorMessage).toBe("Not black's turn to play.");
    expect(endResult.error).toBe(true);
});


/**test('testPlay', () => {
    jest.spyOn(game.status).andReturn(GameStatusEnum.finished);
    const endResult = game.play('a1', 'a2', PieceColorEnum.Black);
    expect(endResult.data).toBe("Game finished.");
    expect(endResult.error).toBe(false);
});**/





