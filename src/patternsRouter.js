import express from 'express';
import { initializeGame } from './chess/game.js';

const router = express.Router();
let games = [];

router.post('/game', (req, res) => {
    console.log('Creating game with UUID ' + req.body.gameUUID);
    let game = initializeGame().createGame(req.body.gameUUID);
    games.push(game);
    res.status(200).send(game.board.getBoardPieceNames());
});

router.post('/move', (req, res) => {
    console.log(req.body);
    let game = games.find(g => g.uuid == req.body.gameUUID);
    let movementSuccess = game.play(req.body.movementOrigin, req.body.movementDestination);
    if (movementSuccess == true)
        res.status(200).send(game.getBoardResponse());
    else
        res.status(400).send(movementSuccess);
});

export {
    router
}


