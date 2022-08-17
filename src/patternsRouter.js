import express from 'express';
import { __dirname } from './dirname.js';

const router = express.Router();

router.post('/game', (req, res) => {
    console.log('Creating game with UUID ' + req.body.gameUUID);
    res.status(200).send();
});

router.post('/move', (req, res) => {
    console.log(req.body);
    let boardResponse = {};
    for (let i = 1; i <= 8; i++)
        for (let letter = 0; letter < "abcdefgh".length; letter++) {
            let currentID = "abcdefgh"[letter] + i.toString();
            boardResponse[currentID] = "WR";
         }
    res.send(boardResponse);
});

export {
    router
}


