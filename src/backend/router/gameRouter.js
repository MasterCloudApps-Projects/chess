import express from 'express';
import { createGame } from '../main/game.js';
import { randomPlayer } from '../main/randomPlayer.js';
import { gameHistory } from '../main/gameHistory.js';
import { PieceTypeEnum } from '../piece/pieceTypeEnum.js';

const gameRouter = express.Router();

gameRouter.post('/game', (req, res) => {
    console.log('Creating game with UUID ' + req.body.gameUUID);
    let game = createGame(req.body.gameUUID);
    gameHistory.save(game);
    res.status(200).send(game.getBoardResponse());
});

gameRouter.post('/move', (req, res) => {
    console.log(req.body);
    let game = gameHistory.findById(req.body.gameUUID);
    let movementMsg = game.play(req.body.movementOrigin, req.body.movementDestination, PieceTypeEnum.White);
    if (movementMsg.error)
        return res.status(400).send(movementMsg);
    if (game.isGameFinished())
        return res.status(200).send(game.getBoardResponse());
    randomPlayer().performRandomMovement(game);
    res.status(200).send(game.getBoardResponse());
});

export {
    gameRouter
}