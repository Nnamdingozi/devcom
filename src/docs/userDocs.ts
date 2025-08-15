// export const userDocs = {
//     '/api/users/register': {
//       post: {
//         tags: ['Users'],
//         summary: 'Register a new user',
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'object',
//                 required: ['email', 'password', 'username'],
//                 properties: {
//                   email: { type: 'string', example: 'user@example.com' },
//                   password: { type: 'string', example: 'MyPass123' },
//                   username: { type: 'string', example: 'john_doe' },
//                 },
//               },
//             },
//           },
//         },
//         responses: {
//           201: {
//             description: 'Signup successful. Email verification sent.',
//           },
//           400: {
//             description: 'User already exists',
//           },
//           500: {
//             description: 'Internal server error',
//           },
//         },
//       },
//     },
  
//     '/api/users/login': {
//       post: {
//         tags: ['Users'],
//         summary: 'User login',
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'object',
//                 required: ['email', 'password'],
//                 properties: {
//                   email: { type: 'string', example: 'user@example.com' },
//                   password: { type: 'string', example: 'MyPass@123' },
//                 },
//               },
//             },
//           },
//         },
//         responses: {
//           200: {
//             description: 'Login successful',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'object',
//                   properties: {
//                     token: {
//                       type: 'string',
//                       example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//                     },
//                     user: {
//                       type: 'object',
//                       properties: {
//                         id: { type: 'integer', example: 1 },
//                         email: { type: 'string', example: 'user@example.com' },
//                         username: { type: 'string', example: 'john_doe' },
//                         verified: { type: 'boolean', example: true },
//                         createdAt: {
//                           type: 'string',
//                           format: 'date-time',
//                           example: '2025-08-01T10:00:00Z',
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           401: {
//             description: 'Invalid credentials or email not verified',
//           },
//           500: {
//             description: 'Internal server error',
//           },
//         },
//       },
//     },
  
//     '/api/users/profile/{email}': {
//       get: {
//         tags: ['Users'],
//         summary: 'Retrieve user profile by email',
//         description: 'Fetch a user profile using email. Requires JWT authentication.',
//         parameters: [
//           {
//             name: 'email',
//             in: 'path',
//             required: true,
//             schema: {
//               type: 'string',
//               format: 'email',
//               example: 'user@example.com',
//             },
//             description: 'Email address of the user',
//           },
//         ],
//         security: [
//           {
//             bearerAuth: [],
//           },
//         ],
//         responses: {
//           200: {
//             description: 'User profile retrieved successfully',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'object',
//                   properties: {
//                     id: { type: 'integer', example: 1 },
//                     email: { type: 'string', example: 'user@example.com' },
//                     username: { type: 'string', example: 'john_doe' },
//                     verified: { type: 'boolean', example: true },
//                     createdAt: {
//                       type: 'string',
//                       format: 'date-time',
//                       example: '2025-08-01T10:00:00Z',
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           404: {
//             description: 'User not found',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'object',
//                   properties: {
//                     message: {
//                       type: 'string',
//                       example: 'User not found',
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           500: {
//             description: 'Internal server error',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'object',
//                   properties: {
//                     message: {
//                       type: 'string',
//                       example: 'Internal server error',
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   };
  



   // ===== Register User =====
  //  '/api/users/register': {
  //   post: {
  //     tags: ['Users'],
  //     summary: 'Register a new user',
  //     requestBody: {
  //       required: true,
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             required: ['email', 'password', 'username'],
  //             properties: {
  //               email: { type: 'string', example: 'user@example.com' },
  //               password: { type: 'string', example: 'MyPass123' },
  //               username: { type: 'string', example: 'john_doe' },
  //             },
  //           },
  //         },
  //       },
  //     },
  //     responses: {
  //       201: { description: 'Signup successful. Email verification sent.' },
  //       400: { description: 'User already exists' },
  //       500: { description: 'Internal server error' },
  //     },
  //   },
  // },





  export const userDocs = {
  // ===== Register User =====
  '/api/users/register': {
    post: {
      tags: ['Users'],
      summary: 'Register a new user (email verification required)',
      description: `Registers a new user with email, password, and username.
After registration, a 4-digit verification code is sent to the provided email.
The user must verify the code using /verify endpoint to complete registration.`,
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
          description: 'Signup successful. Verification code sent to email.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Signup successful. Please verify your email.' },
                  userId: { type: 'integer', example: 1 },
                },
              },
            },
          },
        },
        400: { description: 'User already exists' },
        500: { description: 'Internal server error' },
      },
    },
  },

  // ===== Verify Email =====
  '/api/users/verify': {
    post: {
      tags: ['Users'],
      summary: 'Verify user email with 4-digit code',
      description: `Verifies the email of a newly registered user using the 4-digit code sent via email.
Upon successful verification, the user is fully registered and receives a JWT token.`,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['userId', 'token'],
              properties: {
                userId: { type: 'integer', example: 1 },
                token: { type: 'string', example: '1234' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Email verified successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Email verified successfully' },
                  token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      email: { type: 'string', example: 'user@example.com' },
                      username: { type: 'string', example: 'john_doe' },
                      verified: { type: 'boolean', example: true },
                      createdAt: { type: 'string', format: 'date-time', example: '2025-08-01T10:00:00Z' },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: 'Invalid or expired verification token' },
        500: { description: 'Internal server error' },
      },
    },
  },

  // ===== User Login =====
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
                  token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      email: { type: 'string', example: 'user@example.com' },
                      username: { type: 'string', example: 'john_doe' },
                      verified: { type: 'boolean', example: true },
                      createdAt: { type: 'string', format: 'date-time', example: '2025-08-01T10:00:00Z' },
                    },
                  },
                },
              },
            },
          },
        },
        401: { description: 'Invalid credentials or email not verified' },
        500: { description: 'Internal server error' },
      },
    },
  },

  // ===== Get User Profile =====
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
          schema: { type: 'string', format: 'email', example: 'user@example.com' },
          description: 'Email address of the user',
        },
      ],
      security: [{ bearerAuth: [] }],
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
                  createdAt: { type: 'string', format: 'date-time', example: '2025-08-01T10:00:00Z' },
                },
              },
            },
          },
        },
        404: { description: 'User not found' },
        500: { description: 'Internal server error' },
      },
    },
  },

  // ===== Update User =====
  '/api/users/update/{id}': {
    put: {
      tags: ['Users'],
      summary: 'Update username of a user',
      description: 'Updates the username of a user. Requires JWT authentication.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer', example: 1 },
          description: 'ID of the user to update',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['username'],
              properties: {
                username: { type: 'string', example: 'new_username' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'User updated successfully' },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      email: { type: 'string', example: 'user@example.com' },
                      username: { type: 'string', example: 'new_username' },
                      verified: { type: 'boolean', example: true },
                      createdAt: { type: 'string', format: 'date-time', example: '2025-08-01T10:00:00Z' },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: 'Username is required' },
        401: { description: 'Unauthorized to update this user' },
        500: { description: 'Internal server error' },
      },
    },
  },

  // ===== Delete User =====
  '/api/users/delete/{id}': {
    delete: {
      tags: ['Users'],
      summary: 'Delete a user by ID',
      description: 'Deletes a user account. Requires JWT authentication.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer', example: 1 },
          description: 'ID of the user to delete',
        },
      ],
      responses: {
        200: {
          description: 'User deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'User deleted successfully' },
                },
              },
            },
          },
        },
        401: { description: 'Unauthorized to delete this user' },
        500: { description: 'Internal server error' },
      },
    },
  },
};
