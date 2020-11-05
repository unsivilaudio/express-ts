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
        if (req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <div>You are logged in</div>
                    <a href="/auth/logout">Logout</a>
                </div>
            `);
        } else {
            res.render('index', { title: 'The Landing Page' });
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to Protected Route, logged in user!');
    }
}
