import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import './controllers/RootController';

import AppRouter from './AppRouter';

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['fdafwfdf'] }));

app.use(AppRouter.getInstance());

app.listen(port, () => {
    console.log(`[Server] Listening on Port ${port}`);
});
