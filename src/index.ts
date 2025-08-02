import express, { Application } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import userRoute from '../src/routes/userRoute'
import './config/passport'; // Ensure passport strategies are initialized
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { setupSwaggerDocs } from './config/swagger';

dotenv.config();

const app: Application = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS if frontend is on different domain
app.use(express.json());  // Parse JSON requests
app.use(express.urlencoded({ extended: true }));


// Initialize Passport
app.use(passport.initialize());

// Routes
app.use('/api/users', userRoute);  // Prefix user routes


if (process.env.ENABLE_SWAGGER === 'true') {
  setupSwaggerDocs(app);
}

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Optional: Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Prisma disconnected and app terminated');
  process.exit(0);
});
