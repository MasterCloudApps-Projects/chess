import express from 'express';
import cors from 'cors';
import { router as patternsRouter } from './patternsRouter.js';
import { __dirname } from './dirname.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(patternsRouter);
app.use('/', express.static(__dirname + '/frontend'));

app.listen(3000, () => {
    console.log('Chess front end running on port 3000!');
});
