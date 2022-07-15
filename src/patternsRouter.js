import express from 'express';

const router = express.Router();

const items = {
    strategy : "Strategy pattern",
    command: "Command pattern"
}

router.get('/', (req, res) => {
    res.json("Hello world!");
})

router.get('/strategy', (req, res) => {
    res.json(items["strategy"]);
});

router.get('/command', (req, res) => {
    res.json(items["command"]);
});

export default router;


