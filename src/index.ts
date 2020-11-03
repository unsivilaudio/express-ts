import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello there!');
});

app.listen(port, () => {
    console.log(`[Server] Listening on Port ${port}`);
});
