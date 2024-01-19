import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.send('HELLO');
});


router.get("/signup", (req, res) => {
    res.send('Signed up successfully!');
});

export default router;
