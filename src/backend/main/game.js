import { boardBuilder } from './boardBuilder.js';
import { createRegistry } from './registry.js';
import { createMessage, createErrorMessage } from './message.js';
import { pieceTypes, getOppositeColor } from '../piece/pieceType.js';

const GameStatusEnum = {
    ongoing: 'ongoing',
    finished: 'finished'
}

function createGame(uuidP) {
    let uuid = uuidP;
    let gameStatus = GameStatusEnum.ongoing;
    let turn = pieceTypes.white.name;
    let board = boardBuilder().usingInitialPieceDisposition().build();
    let registry = createRegistry(board);
    let status;

    function getBoard() {
        return board;
    }

    function getUuid() {
        return uuid;
    }

    function undo() {
        registry.undo();
    }

    function redo() {
        registry.redo();
    }

    function play(movementOrigin, movementDestination, playerColor) {
        if (gameStatus === GameStatusEnum.finished)
            return createMessage('Game finished.');
        if (playerColor != turn)
            return createErrorMessage('Not ' + playerColor + "'s turn to play.");
        if (board.getAllCoordinatesByColor(playerColor).length == 0){
            endGame();
            return createMessage(playerColor + 's win.');
        }

        return performTurn(movementOrigin, movementDestination, playerColor);
    }

    function performTurn (movementOrigin, movementDestination, playerColor) {
        board.tryMove(movementOrigin, movementDestination, playerColor);
        if(board.hasError())
            return createErrorMessage(board.getErrorMessage());

        registry.register();
        advanceTurn();
        if (board.isCheckMate()) endGame();
        return createMessage();
    }

    function advanceTurn() {
        turn = getOppositeColor(turn);
    }

    function endGame() {
        status = GameStatusEnum.finished;
    }

    function isGameFinished() {
        return status === GameStatusEnum.finished;
    }

    function getBoardResponse() {
        return createMessage(board.getBoardPieceNames());
    }

    function undoableRedoable() {
        return createMessage({
            isUndoable: registry.isUndoable(),
            isRedoable: registry.isRedoable()
        });
    }

    return{
        play,
        isGameFinished,
        getBoardResponse,
        undoableRedoable,
        getBoard,
        getUuid,
        undo,
        redo
    }
}

export {
    createGame
}
