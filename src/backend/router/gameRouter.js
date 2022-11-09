import express from 'express';
import { createGame } from '../main/game.js';
import { gameHistory } from '../main/gameHistory.js';
import { PieceColorEnum } from '../piece/pieceColorEnum.js';

const gameRouter = express.Router();

gameRouter.post('/game', (req, res) => {
    console.log('Creating game with UUID ' + req.body.gameUUID);
    let game = createGame(req.body.gameUUID);
    gameHistory.save(game);
    res.status(200).send(game.getBoardResponse());
});

gameRouter.post('/game/:id/move', (req, res) => {
    console.log(req.body);
    let game = gameHistory.findById(req.params.id);
    let movementMsg = game.play(req.body.movementOrigin, req.body.movementDestination, PieceColorEnum[req.body.color]);
    if (movementMsg.error)
        return res.status(400).send(movementMsg);
    if (game.isGameFinished())
        return res.status(200).send(game.getBoardResponse());
    res.status(200).send(game.getBoardResponse());
});

gameRouter.get('/game/:id/random/movement', (req, res) => {
    let game = gameHistory.findById(req.params.id);
    let randomMovement = game.getRandomMovement();
    res.status(200).send(randomMovement);
});

gameRouter.get('/game/:id/status', (req, res) => {
    let game = gameHistory.findById(req.params.id);
    res.status(200).send(game.getStatus());
})

export {
    gameRouter
}
