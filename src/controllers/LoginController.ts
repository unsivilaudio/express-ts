import { Request, Response } from 'express';
import passport from 'passport';
import User from '../models/user';
import { get, controller, bodyValidator, post, use } from './decorators';
import { passportAuth } from './decorators/auth';

@controller('/auth')
export default class LoginController {
    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.render('login', { title: 'Log In To Users.Ts' });
    }

    @post('/login')
    @bodyValidator('username', 'password')
    @use(passportAuth)
    postLogin(req: Request, res: Response) {
        const { username } = req.body;

        console.log('new user');
        res.render('index', {
            title: 'A Simple Ts Controller Demo',
            success: {
                message: `Welcome back to Users.Ts ${username}!`,
            },
        });
    }

    @get('/signup')
    getSignup(req: Request, res: Response): void {
        res.render('signup', { title: 'Sign Up' });
    }

    @post('/signup')
    @bodyValidator('username', 'password', 'passwordConfirm')
    postSignup(req: Request, res: Response) {
        const { username, password, passwordConfirm } = req.body;

        if (password !== passwordConfirm) {
            return res.render('signup', {
                title: 'Sign Up To Users.Ts',
                error: { message: 'Passwords do not match.' },
            });
        }
        const user = new User({ username });
        User.register(user, password, (err, user) => {
            if (err) {
                console.log(err.message);
                let message =
                    'Oops! Something went wrong. Please try again later.';
                if (err.code === 11000) {
                    console.log(err.message);
                    message = 'Email is already registered.';
                }
                return res.render('signup', {
                    title: 'Sign Up To Users.Ts',
                    error: { message },
                });
            }
            passport.authenticate('local')(req, res, () => {
                console.log(user);
                if (err) {
                    return res.render('signup', {
                        title: 'Sign Up To Users.Ts',
                        error: {
                            message:
                                'Oops! Something went wrong. Please try again later.',
                        },
                    });
                }
                res.render('index', {
                    title: 'A Simple Ts Controller Demo',
                    success: { message: `Welcome to Users.Ts ${username}` },
                });
            });
        });
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = { loggedIn: false };
        res.redirect('/');
    }
}
