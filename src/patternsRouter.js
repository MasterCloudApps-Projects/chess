import express from 'express';
import { initializeGame } from './chess/game.js';

const router = express.Router();
let games = [];

router.post('/game', (req, res) => {
    console.log('Creating game with UUID ' + req.body.gameUUID);
    let game = initializeGame().createGame(req.body.gameUUID);
    games.push(game);
    res.status(200).send(game.board.pieces);
});

router.post('/move', (req, res) => {
    console.log(req.body);
    let game = games.find(g => g.uuid == req.body.gameUUID);
    let boardResponse = game.play(req.body.movementOrigin, req.body.movementDestination);
    res.send(boardResponse);
});

export {
    router
}


