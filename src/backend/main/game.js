import { boardBuilder } from './boardBuilder.js';
import { createRegistry } from './registry.js';
import { createMessage, createErrorMessage } from './message.js';
import { pieceTypes, getOppositeColor } from '../piece/pieceType.js';

const gameStatus = {
    ongoing: 'ongoing',
    finished: 'finished'
}

function createGame(uuid) {
    let game = {};
    game.uuid = uuid;
    game.gameStatus = gameStatus.ongoing;
    game.turn = pieceTypes.white;
    game.board = boardBuilder().usingInitialPieceDisposition().build();
    game.registry = createRegistry(game.board);

    game.play = function(movementOrigin, movementDestination, playerColor) {
        if (this.gameStatus === gameStatus.finished)
            return createMessage('Game finished.');
        if (playerColor != this.turn)
            return createErrorMessage('Not ' + playerColor + "'s turn to play.");
        if (this.board.getAllCoordinatesByColor(playerColor).length == 0){
            endGame(this);
            return createMessage(playerColor + 's win.');
        }

        return performTurn(movementOrigin, movementDestination, playerColor);
    }

    function performTurn (movementOrigin, movementDestination, playerColor) {
        game.board.tryMove(movementOrigin, movementDestination, playerColor);
        if(game.board.hasError())
            return createErrorMessage(game.board.getErrorMessage());

        game.registry.register();
        advanceTurn();
        if (game.board.checkmate) endGame();
        return createMessage();
    }

    function advanceTurn() {
        game.turn = getOppositeColor(game.turn);
    }

    function endGame() {
        game.status = gameStatus.finished;
    }

    game.isGameFinished = function () {
        return game.status === gameStatus.finished;
    }

    game.getBoardResponse = function () {
        return createMessage(this.board.getBoardPieceNames());
    }

    return game;
}

export {
    createGame
}
