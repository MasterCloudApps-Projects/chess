import { boardBuilder } from './boardBuilder.js';
import { cpuPlayer } from './players/cpuPlayer.js';

function initializeGame() {

    let game = {};
    game.play = play;
    game.getBoardResponse = getBoardResponse;

    function createGame(uuid) {
        game.uuid = uuid;
        game.board = boardBuilder().usingInitialPieceDisposition().build();
        game.cpuPlayer = cpuPlayer();
        return game;
    }

    function play(movementOrigin, movementDestination){
        if(!this.board.isWhitePiece(movementOrigin))
            return ['Invalid move: Attempting to move a wrong color piece.'];

        if(this.board.performMovement(movementOrigin, movementDestination)) {
            this.cpuPlayer.performRandomMovement(this.board);
            return true;
        }

        return this.board.getErrorMessages();
    }

    function getBoardResponse() {
        return this.board.getBoardPieceNames();
    }

    return {
        createGame
    }
}

export {
    initializeGame
}
