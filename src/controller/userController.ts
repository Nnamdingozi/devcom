
// import { Request, Response } from 'express';
// import { createUser, findUserByEmail, updateUserVerificationToken, verifyUserByToken, updateUser, deleteUser } from '../services/userService';
// import { sendEmail } from '../config/sendEmail';
// import bcrypt from 'bcryptjs';
// import generateToken from '../config/generatejwtToken';

// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password, username } = req.body;

//     const existingUser = await findUserByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await createUser(email, hashedPassword, username);

//     // Generate 4-digit token
//     const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();
//     const tokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

//     await updateUserVerificationToken(user.id, verificationToken, tokenExpiresAt);

//     console.log(`Verification token for ${email}: ${verificationToken}`);

//     // Send email
//     await sendEmail({
//       to: email,
//       text: `Your verification code is ${verificationToken}`,
//     });

//     res.status(201).json({ message: 'Signup successful. Please verify your email.', userId: user.id });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Email verification handler
// export const verifyEmail = async (req: Request, res: Response) => {
//   try {
//     const { userId, token } = req.body;

//     const user = await verifyUserByToken(Number(userId), token);
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     const jwtToken = generateToken(user);
//     res.json({ message: 'Email verified successfully', token: jwtToken, user });
//   } catch (error) {
//     console.error('Verify error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// //  block unverified users
// export const userLogin = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await findUserByEmail(email);

//     if (!user || !user.password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     if (!user.verified) {
//       return res.status(401).json({ message: 'Please verify your email before logging in.' });
//     }

//     const token = generateToken(user);
// //remove sensitive data before returning user
    
// const safeUser = {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       verified: user.verified,
//       createdAt: user.createdAt,
//     };

//     res.status(200).json({ token, user: safeUser });;
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



//      export const getUser = async (req: Request, res: Response) => {
//       try {
//         const { email } = req.params;
//         const user = await findUserByEmail(email);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         const safeUser = {
//           id: user.id,
//           email: user.email,
//           username: user.username,
//           verified: user.verified,
//           createdAt: user.createdAt,
//         };
    

//         res.status(200).json(safeUser);
//       } catch (error) {
//         console.error('Get user error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//       }


//       // ===== Update User Controller =====
// export const updateUserController = async (req: Request, res: Response) => {
//   const { id } = req.params; // assuming user ID comes from URL params
//   const { username } = req.body; // data to update

//   if (!username) {
//     return res.status(400).json({ message: 'Username is required' });
//   }

//   try {
//     const updatedUser = await updateUser(Number(id), username);
//     return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//   } catch (error) {
//     console.error('Error in updateUserController:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // ===== Delete User Controller =====

// export const deleteUserController = async (req: Request, res: Response) => {
//   const { id } = req.params; // assuming user ID comes from URL params

//   try {
//     await deleteUser(Number(id));
//     return res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error in deleteUserController:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
//     };\


import { Request, Response } from 'express';
import { 
  createUser, 
  findUserByEmail, 
  updateUserVerificationToken, 
  verifyUserByToken, 
  updateUser, 
  deleteUser 
} from '../services/userService';
import { sendEmail } from '../config/sendEmail';
import bcrypt from 'bcryptjs';
import generateToken from '../config/generatejwtToken';

// ===== Register User =====
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(email, hashedPassword, username);

    // Generate 4-digit token
    const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();
    const tokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

    await updateUserVerificationToken(user.id, verificationToken, tokenExpiresAt);

    console.log(`Verification token for ${email}: ${verificationToken}`);

    // Send email
    await sendEmail({
      to: email,
      text: `Your verification code is ${verificationToken}`,
    });

    res.status(201).json({ message: 'Signup successful. Please verify your email.', userId: user.id });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ===== Verify Email =====
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { userId, token } = req.body;

    const user = await verifyUserByToken(Number(userId), token);
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const jwtToken = generateToken(user);
    res.json({ message: 'Email verified successfully', token: jwtToken, user });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ===== User Login =====
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.verified) {
      return res.status(401).json({ message: 'Please verify your email before logging in.' });
    }

    const token = generateToken(user);

    // Remove sensitive data before returning user
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified,
      createdAt: user.createdAt,
    };

    res.status(200).json({ token, user: safeUser });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ===== Get User =====
export const getUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified,
      createdAt: user.createdAt,
    };

    res.status(200).json(safeUser);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// // ===== Update User Controller =====
export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params; // user ID from URL params
  const { username } = req.body; // data to update

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    // Optional: check if user is allowed to update this account
    // For example, req.user.id is set by passport JWT
    if (!req.user ) {
      return res.status(401).json({ message: 'Unauthorized to update this user' });
    }

    const updatedUser = await updateUser(Number(id), username);
    return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error in updateUserController:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// ===== Delete User Controller =====
export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params; // user ID from URL params

  try {
    // Optional: check if user is allowed to delete this account
    if (!req.user ) {
      return res.status(401).json({ message: 'Unauthorized to delete this user' });
    }

    await deleteUser(Number(id));
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUserController:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
