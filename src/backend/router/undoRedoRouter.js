import express from 'express';
import { findById } from '../main/gameHistory.js'

const undoRedoRouter = express.Router();

undoRedoRouter.post('/undo', (req, res) => {
    let game = findById(req.body.gameUUID);
    game.undo();
    res.status(200).send(game.getBoardResponse());
});

undoRedoRouter.post('/redo', (req, res) => {
    let game = findById(req.body.gameUUID);
    game.redo();
    res.status(200).send(game.getBoardResponse());
});

undoRedoRouter.post('/undoableRedoable', (req, res) => {
    let game = findById(req.body.gameUUID);
    res.status(200).send(game.undoableRedoable());
});

export {
    undoRedoRouter
}


