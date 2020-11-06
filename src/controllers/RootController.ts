import { NextFunction, Request, Response } from 'express';
import { get, controller, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.isAuthenticated()) {
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
        res.render('index', { title: 'A Simple Ts Controller Demo' });
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.render('secret', {
            title: 'The Secret Page',
        });
    }
}
