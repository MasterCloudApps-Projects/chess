import express from 'express';
import cors from 'cors';
import { gameRouter } from './backend/router/gameRouter.js';
import { undoRedoRouter } from './backend/router/undoRedoRouter.js';
import { __dirname } from './dirname.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(gameRouter);
app.use(undoRedoRouter);
app.use('/', express.static(__dirname + '/frontend'));

app.listen(3000, () => {
    console.log('Chess front end running on port 3000!');
});
