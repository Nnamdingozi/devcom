
'use strict';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import  * as userService from '../services/userService';
import { findUserById } from '../services/userService';
import { User } from '@prisma/client';  // Prisma-generated User type

dotenv.config();

type VerifyCallback = (error: any, user?: Express.User | false, options?: { message: string }) => void;

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email: string, password: string, done: VerifyCallback) => {
      try {
        const user : User | null = await userService.findUserByEmail(email);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        if (!user.password) {
          return done(null, false, { message: 'User has no password set' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user); 
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || '',
    },
    async (jwtPayload: { id: number }, done: VerifyCallback) => {
      if (!jwtPayload?.id) {
        return done(new Error('Invalid token payload'), false);
      }
      try {
        const user :  User | null  = await findUserById(jwtPayload.id);
        if (user) {
          return done(null, user); 
        }
        return done(null, false);
      } catch (error) {
        return done(error);
      }
    }
  )
);


export default passport
