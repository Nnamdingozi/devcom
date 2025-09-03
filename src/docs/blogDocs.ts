// export const blogDocs = {
//     // ===== Create Blog =====
//     "/api/blogs": {
//       post: {
//         tags: ["Blogs"],
//         summary: "Create a new blog post",
//         description: "Creates a blog post for a given user.",
//         requestBody: {
//           required: true,
//           content: {
//             "application/json": {
//               schema: {
//                 type: "object",
//                 required: ["userId", "title", "content"],
//                 properties: {
//                   userId: { type: "integer", example: 1 },
//                   title: { type: "string", example: "My first blog" },
//                   content: { type: "string", example: "This is the content of my first blog post." },
//                 },
//               },
//             },
//           },
//         },
//         responses: {
//           201: {
//             description: "Blog created successfully",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     id: { type: "integer", example: 1 },
//                     userId: { type: "integer", example: 1 },
//                     title: { type: "string", example: "My first blog" },
//                     content: { type: "string", example: "This is the content of my first blog post." },
//                     createdAt: { type: "string", format: "date-time", example: "2025-08-01T10:00:00Z" },
//                     updatedAt: { type: "string", format: "date-time", example: "2025-08-01T10:00:00Z" },
//                   },
//                 },
//               },
//             },
//           },
//           500: { description: "Failed to create blog" },
//         },
//       },
//     },
  
//     // ===== Get All Blogs =====
//     "/api/blogs": {
//       get: {
//         tags: ["Blogs"],
//         summary: "Retrieve all blogs",
//         description: "Fetches all blog posts from all users.",
//         responses: {
//           200: {
//             description: "List of blogs retrieved successfully",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "array",
//                   items: {
//                     type: "object",
//                     properties: {
//                       id: { type: "integer", example: 1 },
//                       userId: { type: "integer", example: 1 },
//                       title: { type: "string", example: "My first blog" },
//                       content: { type: "string", example: "This is my blog content." },
//                       createdAt: { type: "string", format: "date-time" },
//                       updatedAt: { type: "string", format: "date-time" },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           500: { description: "Failed to fetch blogs" },
//         },
//       },
//     },
  
//     // ===== Get Blogs by User =====
//     "/api/blogs/user/{userId}": {
//       get: {
//         tags: ["Blogs"],
//         summary: "Retrieve all blogs by a specific user",
//         parameters: [
//           {
//             name: "userId",
//             in: "path",
//             required: true,
//             schema: { type: "integer", example: 1 },
//             description: "ID of the user whose blogs to retrieve",
//           },
//         ],
//         responses: {
//           200: {
//             description: "List of user's blogs retrieved successfully",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "array",
//                   items: {
//                     type: "object",
//                     properties: {
//                       id: { type: "integer", example: 1 },
//                       userId: { type: "integer", example: 1 },
//                       title: { type: "string", example: "My blog title" },
//                       content: { type: "string", example: "This is my blog content." },
//                       createdAt: { type: "string", format: "date-time" },
//                       updatedAt: { type: "string", format: "date-time" },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           500: { description: "Failed to fetch user's blogs" },
//         },
//       },
//     },
  
//     // ===== Update Blog =====
//     "/api/blogs/{blogId}": {
//       put: {
//         tags: ["Blogs"],
//         summary: "Update an existing blog post",
//         parameters: [
//           {
//             name: "blogId",
//             in: "path",
//             required: true,
//             schema: { type: "integer", example: 1 },
//             description: "ID of the blog to update",
//           },
//         ],
//         requestBody: {
//           required: true,
//           content: {
//             "application/json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   title: { type: "string", example: "Updated blog title" },
//                   content: { type: "string", example: "Updated blog content" },
//                 },
//               },
//             },
//           },
//         },
//         responses: {
//           200: {
//             description: "Blog updated successfully",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     id: { type: "integer", example: 1 },
//                     userId: { type: "integer", example: 1 },
//                     title: { type: "string", example: "Updated blog title" },
//                     content: { type: "string", example: "Updated blog content" },
//                     createdAt: { type: "string", format: "date-time" },
//                     updatedAt: { type: "string", format: "date-time" },
//                   },
//                 },
//               },
//             },
//           },
//           500: { description: "Failed to update blog" },
//         },
//       },
  
//       // ===== Delete Blog =====
//       delete: {
//         tags: ["Blogs"],
//         summary: "Delete a blog post",
//         parameters: [
//           {
//             name: "blogId",
//             in: "path",
//             required: true,
//             schema: { type: "integer", example: 1 },
//             description: "ID of the blog to delete",
//           },
//         ],
//         responses: {
//           204: { description: "Blog deleted successfully (no content)" },
//           500: { description: "Failed to delete blog" },
//         },
//       },
//     },
//   };
  

export const blogDocs = {
  // ===== Create Blog & Get All Blogs =====
  "/api/blogs": {
    post: {
      tags: ["Blogs"],
      summary: "Create a new blog post",
      description: "Creates a blog post for a given user.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["userId", "title", "content"],
              properties: {
                userId: { type: "integer", example: 1 },
                title: { type: "string", example: "My first blog" },
                content: {
                  type: "string",
                  example: "This is the content of my first blog post.",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Blog created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  userId: { type: "integer", example: 1 },
                  title: { type: "string", example: "My first blog" },
                  content: { type: "string", example: "This is my blog content." },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-08-01T10:00:00Z",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-08-01T10:00:00Z",
                  },
                },
              },
            },
          },
        },
        500: { description: "Failed to create blog" },
      },
    },

    get: {
      tags: ["Blogs"],
      summary: "Retrieve all blogs",
      description: "Fetches all blog posts from all users.",
      responses: {
        200: {
          description: "List of blogs retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    userId: { type: "integer", example: 1 },
                    title: { type: "string", example: "My first blog" },
                    content: { type: "string", example: "This is my blog content." },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
        500: { description: "Failed to fetch blogs" },
      },
    },
  },

  // ===== Get Blogs by User =====
  "/api/blogs/user/{userId}": {
    get: {
      tags: ["Blogs"],
      summary: "Retrieve all blogs by a specific user",
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          schema: { type: "integer", example: 1 },
          description: "ID of the user whose blogs to retrieve",
        },
      ],
      responses: {
        200: {
          description: "List of user's blogs retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    userId: { type: "integer", example: 1 },
                    title: { type: "string", example: "My blog title" },
                    content: { type: "string", example: "This is my blog content." },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
        500: { description: "Failed to fetch user's blogs" },
      },
    },
  },

  // ===== Update Blog & Delete Blog =====
  "/api/blogs/{blogId}": {
    put: {
      tags: ["Blogs"],
      summary: "Update an existing blog post",
      parameters: [
        {
          name: "blogId",
          in: "path",
          required: true,
          schema: { type: "integer", example: 1 },
          description: "ID of the blog to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string", example: "Updated blog title" },
                content: { type: "string", example: "Updated blog content" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Blog updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  userId: { type: "integer", example: 1 },
                  title: { type: "string", example: "Updated blog title" },
                  content: { type: "string", example: "Updated blog content" },
                  createdAt: { type: "string", format: "date-time" },
                  updatedAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        500: { description: "Failed to update blog" },
      },
    },

    delete: {
      tags: ["Blogs"],
      summary: "Delete a blog post",
      parameters: [
        {
          name: "blogId",
          in: "path",
          required: true,
          schema: { type: "integer", example: 1 },
          description: "ID of the blog to delete",
        },
      ],
      responses: {
        204: { description: "Blog deleted successfully (no content)" },
        500: { description: "Failed to delete blog" },
      },
    },
  },
};
