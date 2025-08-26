
// src/swagger.ts
import swaggerUi from 'swagger-ui-express';
import { Express, Application } from 'express';
import { userDocs } from '../docs/userDocs'; 
import { blogDocs } from '../docs/blogDocs';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'DevCom API',
    version: '1.0.0',
    description: 'API documentation for DevCom backend application.',
  },
  servers: [
    {
      url: process.env.BASE_URL || 'http://localhost:5000',
      description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Local development server',
    },
  ],
  paths: {
    ...userDocs,
    ...blogDocs  // ✅ All route docs go here
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

export const setupSwaggerDocs = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
