import { boardBuilder } from './boardBuilder.js';
import { createRegistry } from './registry.js';
import { messageManager } from './message.js';
import { PieceColorEnum } from '../piece/pieceColorEnum.js';
import { GameStatusEnum } from './gameStatusEnum.js';
import { randomPlayer } from './randomPlayer.js';

function createGame(uuidGame) {
    let uuid = uuidGame;
    let turn = PieceColorEnum.White;
    let board = boardBuilder().usingInitialPieceDisposition().build();
    let registry = createRegistry(board);
    let status = GameStatusEnum.ongoing;

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

    function getRandomMovement() {
        return messageManager.createMessage(randomPlayer.getMovement(board));
    }

    function play(movementOrigin, movementDestination, playerColor) {
        if (status === GameStatusEnum.finished)
            return messageManager.createMessage('Game finished.');
        if (playerColor != turn)
            return messageManager.createErrorMessage('Not ' + playerColor.getLiteral() + "'s turn to play.");
        if (board.getAllCoordinatesByColor(turn).length == 0){
            endGame();
            return messageManager.createMessage(playerColor.name + 's win.');
        }

        return performTurn(movementOrigin, movementDestination);
    }

    function performTurn (movementOrigin, movementDestination) {
        let error = board.tryMove(movementOrigin, movementDestination, turn);
        if(error != undefined)
            return messageManager.createErrorMessage(error);
        if(!turn.isWhite()) {
            registry.register();
        }
        advanceTurn();
        updateStatus();
        return messageManager.createMessage();
    }

    function advanceTurn() {
        turn = turn.getOppositeColor();
    }

    function updateStatus() {
        if(board.isOnCheckMate(turn) || board.isStalemate(turn)) {
            endGame();
        }
    }

    function endGame() {
        status = GameStatusEnum.finished;
    }

    function isGameFinished() {
        return status === GameStatusEnum.finished;
    }

    function getStatus() {
        return messageManager.createMessage({status: status});
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
        getStatus,
        getBoardResponse,
        undoableRedoable,
        getBoard,
        getUuid,
        getRandomMovement,
        undo,
        redo
    }
}

export {
    createGame
}
