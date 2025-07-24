
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';


// dotenv.config();

//  interface IUserPayload {
//     id: number;
//     email: string;
//   }
  



// const generateToken = (user: IUserPayload): string => {
//   if (!process.env.JWT_SECRET) {
//     throw new Error('JWT_SECRET is not defined in environment variables.');
//   }

//   return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });
// };


// export default generateToken;



import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '@prisma/client';  // Use Prisma's generated User type

dotenv.config();

export const generateToken = (user: User): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

  // You can choose what to include in the token payload
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,  // optional
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export default generateToken;
