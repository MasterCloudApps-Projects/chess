import { boardBuilder } from './boardBuilder.js';
// import cpu player from ./

function initializeGame() {

    let game = {};
    game.play = play;

    function createGame(uuid) {
        game.uuid = uuid;
        game.board = boardBuilder().usingInitialPieceDisposition().build();
        return game;
    }

    function play(movementOrigin, movementDestination){
        if(this.board.isWhitePiece(movementOrigin)){
            return this.board.performMovement(movementOrigin, movementDestination);
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
