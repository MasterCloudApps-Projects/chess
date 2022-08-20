import { boardBuilder } from './boardBuilder.js';
import { cpuPlayer } from './players/cpuPlayer.js';

function initializeGame() {

    let game = {};
    game.play = play;

    function createGame(uuid) {
        game.uuid = uuid;
        game.board = boardBuilder().usingInitialPieceDisposition().build();
        game.cpuPlayer = cpuPlayer();
        return game;
    }

    function play(movementOrigin, movementDestination){
        if(this.board.isWhitePiece(movementOrigin)){
            this.board.performMovement(movementOrigin, movementDestination);
            this.cpuPlayer.performRandomMovement(this.board);
        } else{
            //TODO: add excepction
            console.log('Invalid movement for player');
        }
        return this.board.getBoard();
    }

    return {
        createGame
    }
}

export {
    initializeGame
}
