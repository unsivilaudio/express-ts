import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export function passportAuth(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    return passport.authenticate('local', function (err, user, info) {
        if (!user) {
            return res.render('login', {
                title: 'Log In To Users.Ts',
                error: { message: 'Invalid Username or Password.' },
            });
        }
        req.logIn(user, function (err) {
            if (err) return next(err);
            console.log('made it to last next fn');
            return next();
        });
    })(req, res, next);
}
