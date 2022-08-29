import { boardBuilder } from './boardBuilder.js';
import { cpuPlayer } from './players/cpuPlayer.js';
import { createRegistry } from './registry.js';
import { createMessage, createErrorMessage } from './io/message.js';
import { pieceTypes } from './pieces/pieceType.js';


const gameStatus = {
    pending: 'pending',
    finished: 'finished'
}

function createGame(uuid) {
    let game = initializeGame();
    game.uuid = uuid;
    game.gameStatus = gameStatus.pending;
    game.turn = pieceTypes.white;

    game.board = boardBuilder().usingInitialPieceDisposition().build();
    game.cpuPlayer = cpuPlayer();
    game.registry = createRegistry(game.board);
    return game;
}

function initializeGame() {
    let game = {};

    game.play = function(movementOrigin, movementDestination) {
        if(this.board.getAllCoordinatesByColor(pieceTypes.white).length == 0){
            endGame(this);
            return createMessage('Black player wins');        }

        this.board.move(movementOrigin, movementDestination, pieceTypes.white);

        if(this.board.hasError())
            return createErrorMessage(this.board.getErrorMessage());

        if(this.board.getAllCoordinatesByColor(pieceTypes.black).length == 0){
            endGame(this);
            return createMessage('White player wins');
        }

        this.cpuPlayer.performRandomMovement(this.board);
        this.registry.register();
        return createMessage();
    }

    game.getBoardResponse = function () {
        return createMessage(this.board.getBoardPieceNames());
    }

    return game;
}

function endGame(game){
    game.status = gameStatus.finished;
}

export {
    createGame
}
