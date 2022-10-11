import { boardBuilder } from './boardBuilder.js';
import { createRegistry } from './registry.js';
import { messageManager } from './message.js';
import { PieceColorEnum } from '../piece/pieceColorEnum.js';
import { GameStatusEnum } from './gameStatusEnum.js'

function createGame(uuidGame) {
    let uuid = uuidGame;
    let gameStatus = GameStatusEnum.ongoing;
    let turn = PieceColorEnum.White;
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
            return messageManager.createMessage('Game finished.');
        if (playerColor != turn)
            return messageManager.createErrorMessage('Not ' + playerColor.name + "'s turn to play.");
        if (board.getAllCoordinatesByColor(turn).length == 0){
            endGame();
            return messageManager.createMessage(playerColor.name + 's win.');
        }

        return performTurn(movementOrigin, movementDestination);
    }

    function performTurn (movementOrigin, movementDestination) {
        board.tryMove(movementOrigin, movementDestination, turn);
        if(board.hasError())
            return messageManager.createErrorMessage(board.getErrorMessage());

        registry.register();
        advanceTurn();
        if (board.isCheckMate()) endGame();
        return messageManager.createMessage();
    }

    function advanceTurn() {
        turn = turn.getOppositeColor();
    }

    function endGame() {
        status = GameStatusEnum.finished;
    }

    function isGameFinished() {
        return status === GameStatusEnum.finished;
    }

    function getBoardResponse() {
        return messageManager.createMessage(board.getBoardPieceNames());
    }

    function undoableRedoable() {
        return messageManager.createMessage({
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
