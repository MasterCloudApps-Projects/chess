import express from 'express';
import { createGame } from './chess/game.js';

const router = express.Router();
let games = [];

router.post('/game', (req, res) => {
    console.log('Creating game with UUID ' + req.body.gameUUID);
    let game = createGame(req.body.gameUUID);
    games.push(game);
    res.status(200).send(game.getBoardResponse());
});

router.post('/move', (req, res) => {
    console.log(req.body);
    let game = games.find(g => g.uuid === req.body.gameUUID);
    let movementMsg = game.play(req.body.movementOrigin, req.body.movementDestination);
    if (movementMsg.error)
        res.status(400).send(movementMsg);
    else
        res.status(200).send(game.getBoardResponse());
});

router.post('/undo', (req, res) => {
    let game = games.find(g => g.uuid === req.body.gameUUID);
    game.registry.undo();
    res.status(200).send(game.getBoardResponse());
});

router.post('/redo', (req, res) => {
    let game = games.find(g => g.uuid === req.body.gameUUID);
    game.registry.redo();
    res.status(200).send(game.getBoardResponse());
});

export {
    router
}


