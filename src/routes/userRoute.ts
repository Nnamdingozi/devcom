import express, { Router,  RequestHandler } from 'express';
import * as userController from '../controller/userController';
import passport from '../config/passport';
import { validateLogin, validateRegistration } from '../middleware/validationMiddleware';


const userRoute: Router = express.Router();


userRoute.post('/register', validateRegistration, userController.registerUser);
userRoute.post('/login', validateLogin, userController.userLogin as RequestHandler);
userRoute.get('/profile', passport.authenticate('jwt', { session: false }), userController.getUser as RequestHandler);

export default userRoute;