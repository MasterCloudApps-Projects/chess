import express from 'express';
import { findById } from '../main/gamehistory.js'

const undoRedoRouter = express.Router();

undoRedoRouter.post('/undo', (req, res) => {
    let game = findById(req.body.gameUUID);
    game.registry.undo();
    res.status(200).send(game.getBoardResponse());
});

undoRedoRouter.post('/redo', (req, res) => {
    let game = findById(req.body.gameUUID);
    game.registry.redo();
    res.status(200).send(game.getBoardResponse());
});

export {
    undoRedoRouter
}


