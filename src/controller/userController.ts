

// import { Request, Response } from 'express';
// import { createUser, findUserByEmail } from '../services/userService';
// import generateToken from '../config/generatejwtToken';
// import bcrypt from 'bcryptjs';  // Needed for password comparison in login

// export const registerUser = async (req: Request, res: Response) => {

//   try {
//     const { email, password, username } = req.body;

//     // Optional: Check if user already exists
//     const existingUser = await findUserByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

   
    
//     // create a new user with hashed password
//     const user = await createUser(email, hashedPassword, username,  );

    
//     //generate token
//     const token = generateToken(user);

//     res.status(201).json({ token, user });


//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const getUser = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.params;
//     const user = await findUserByEmail(email);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

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

//     const token = generateToken(user);

//     res.json({ token, user });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };




import { Request, Response } from 'express';
import { createUser, findUserByEmail, updateUserVerificationToken, verifyUserByToken } from '../services/userService';
import { sendEmail } from '../config/sendEmail';
import bcrypt from 'bcryptjs';
import generateToken from '../config/generatejwtToken';

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

// Email verification handler
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

//  block unverified users
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
//remove sensitive data before returning user
    
const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified,
      createdAt: user.createdAt,
    };

    res.status(200).json({ token, user: safeUser });;
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



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