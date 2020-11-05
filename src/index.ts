import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import bodyParser from 'body-parser';
import './controllers/LoginController';
import './controllers/RootController';

import User from './models/user';
import AppRouter from './AppRouter';

const LocalStrategy = passportLocal.Strategy;

mongoose.connect('mongodb://localhost/users-ts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;
db.on('connected', () => console.log('[mongoosel]  Connected to DB.'));
db.on('error', err =>
    console.log(
        '[mongoose] There was an error connecting to the database: ' + err
    )
);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    require('express-session')({
        secret: 'test test test the app',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.locals.currentUser = req.user;
    next();
});
app.use(AppRouter.getInstance());

app.listen(port, () => {
    console.log(`[Server] Listening on Port ${port}`);
});
