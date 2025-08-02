export const userDocs = {
    '/api/users/register': {
      post: {
        tags: ['Users'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'username'],
                properties: {
                  email: { type: 'string', example: 'user@example.com' },
                  password: { type: 'string', example: 'MyPass123' },
                  username: { type: 'string', example: 'john_doe' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Signup successful. Email verification sent.',
          },
          400: {
            description: 'User already exists',
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
  
    '/api/users/login': {
      post: {
        tags: ['Users'],
        summary: 'User login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'user@example.com' },
                  password: { type: 'string', example: 'MyPass@123' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', example: 1 },
                        email: { type: 'string', example: 'user@example.com' },
                        username: { type: 'string', example: 'john_doe' },
                        verified: { type: 'boolean', example: true },
                        createdAt: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-08-01T10:00:00Z',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Invalid credentials or email not verified',
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
  
    '/api/users/profile/{email}': {
      get: {
        tags: ['Users'],
        summary: 'Retrieve user profile by email',
        description: 'Fetch a user profile using email. Requires JWT authentication.',
        parameters: [
          {
            name: 'email',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            description: 'Email address of the user',
          },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'User profile retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 1 },
                    email: { type: 'string', example: 'user@example.com' },
                    username: { type: 'string', example: 'john_doe' },
                    verified: { type: 'boolean', example: true },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2025-08-01T10:00:00Z',
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'User not found',
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Internal server error',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  