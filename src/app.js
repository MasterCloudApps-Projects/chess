import express from 'express';
import patternsRouter from './patternsRouter.js';
import { __dirname } from './dirname.js';

const app = express();

app.use(patternsRouter);
app.use(express.json());

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
