import { NextFunction, Request, Response } from 'express';
import { get, controller, bodyValidator, post, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }

    res.status(403);
    res.send('Not Permitted!');
}

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response) {
        let user;
        if (req.user) user = req.user;
        res.render('index', { title: 'A Simple Ts Controller Demo', user });
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to Protected Route, logged in user!');
    }
}
