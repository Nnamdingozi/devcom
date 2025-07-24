import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface User extends User {}  // ✅ Extend Express.User with Prisma User
  }
}