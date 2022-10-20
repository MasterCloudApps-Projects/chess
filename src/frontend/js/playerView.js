import { turn } from './turn.js';
import { http } from './restClient.js';

function createPlayerView(gameViewParam) {
    let gameView = gameViewParam;

    async function move(id) {
        console.log({turn: turn.get()});
        if(turn.get() === "White") {
            await gameView.selectPositionForMovement(id);
        }
        console.log({turn: turn.get()});
        if(turn.get() === "Black") {
            performRandomMovement();
        }
    }

    //TODO: Study if this responsability is ok
    async function performRandomMovement() {
        console.log("CPU performing movement...");
        let resRandomMovement, error;
        do {
            resRandomMovement = await http('/random/movement', 'POST', { gameUUID : gameView.getGameUUID() });
            if(!resRandomMovement.error) {
                let coordinates = resRandomMovement.data;
                await gameView.selectPositionForMovement(coordinates.origin);
                error = await gameView.selectPositionForMovement(coordinates.destination);
            }
        } while (error !== undefined);
    }

    return {
        move
    }
}

export {
    createPlayerView
}