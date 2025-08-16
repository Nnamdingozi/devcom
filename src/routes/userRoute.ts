// import express, { Router,  RequestHandler } from 'express';
// import * as userController from '../controller/userController';
// import passport from '../config/passport';
// import { validateLogin, validateRegistration } from '../middleware/validationMiddleware';


// const userRoute: Router = express.Router();


// userRoute.post('/register', validateRegistration, userController.registerUser);
// userRoute.post('/login', validateLogin, userController.userLogin as RequestHandler);
// userRoute.get('/profile/:email', passport.authenticate('jwt', { session: false }), userController.getUser as RequestHandler);

// export default userRoute;

import express, { Router, RequestHandler } from 'express';
import * as userController from '../controller/userController';
import passport from '../config/passport';
import { validateLogin, validateRegistration } from '../middleware/validationMiddleware';

const userRoute: Router = express.Router();

// ===== Register Users =====
userRoute.post('/register', validateRegistration, userController.registerUser);

// ===== Email verification route =====
userRoute.post('/verify', userController.verifyEmail);


// ===== Resend Email verification route =====
userRoute.post('/resend-email', userController.resendVerificationEmail);

userRoute.post('/login', validateLogin, userController.userLogin as RequestHandler);

// ===== Protected Routes =====
userRoute.get(
  '/profile/:email',
  passport.authenticate('jwt', { session: false }),
  userController.getUser as RequestHandler
);

// ===== Update User =====
userRoute.put(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  userController.updateUserController as RequestHandler
);

// ===== Delete User =====
userRoute.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUserController as RequestHandler
);

export default userRoute;
