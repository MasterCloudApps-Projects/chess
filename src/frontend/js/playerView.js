import { turn } from './turn.js';
import { restClient } from './restClient.js';

function createPlayerView(gameViewParam) {
    let gameView = gameViewParam;

    async function whitePlay(id) {
        if(gameView.getCurrentStatus() === "finished") {
            return;
        }
        if(turn.get() === "White") {
            await gameView.selectPositionForMovement(id);
        }
        blackPlay();
    }

    async function blackPlay() {
        if(gameView.getCurrentStatus() === "finished" || turn.get() === "White") {
            return;
        }
        performRandomMovement();
    }

    async function performRandomMovement() {
        console.log("CPU performing movement...");
        let resRandomMovement;
        do {
            resRandomMovement = await restClient.http('/random/movement', 'POST', { gameUUID : gameView.getGameUUID() });
            if(!resRandomMovement.error) {
                let coordinates = resRandomMovement.data;
                await gameView.selectPositionForMovement(coordinates.origin);
                await gameView.selectPositionForMovement(coordinates.destination);
            }
        } while (turn.get() === "Black");
    }

    return {
        whitePlay
    }
}

export {
    createPlayerView
}
