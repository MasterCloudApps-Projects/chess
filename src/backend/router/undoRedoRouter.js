import express from 'express';
import { gameHistory } from '../main/gameHistory.js'

const undoRedoRouter = express.Router();

undoRedoRouter.post('/game/:id/undo', (req, res) => {
    let game = gameHistory.findById(req.params.id);
    game.undo();
    res.status(200).send(game.getBoardResponse());
});

undoRedoRouter.post('/game/:id/redo', (req, res) => {
    let game = gameHistory.findById(req.params.id);
    game.redo();
    res.status(200).send(game.getBoardResponse());
});

undoRedoRouter.get('/game/:id/undoableRedoable', (req, res) => {
    let game = gameHistory.findById(req.params.id);
    res.status(200).send(game.undoableRedoable());
});

export {
    undoRedoRouter
}


