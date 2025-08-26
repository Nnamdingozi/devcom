import { Request, Response } from "express";
import { blogService } from "../services/blogService";

export const blogController = {
  // Create Blog
  async createBlog(req: Request, res: Response) {
    try {
      const { userId, title, content } = req.body;
      const blog = await blogService.createBlog(userId, title, content);
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: "Failed to create blog" });
    }
  },

  // Get All Blogs
  async getAllBlogs(req: Request, res: Response) {
    try {
      const blogs = await blogService.getAllBlogs();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  },

  // Get Blogs by UserId
  async getBlogsByUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const blogs = await blogService.getBlogsByUser(userId);
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user's blogs" });
    }
  },

  // Update Blog
  async updateBlog(req: Request, res: Response) {
    try {
      const blogId = parseInt(req.params.blogId);
      const { title, content } = req.body;
      const blog = await blogService.updateBlog(blogId, title, content);
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: "Failed to update blog" });
    }
  },

  // Delete Blog
  async deleteBlog(req: Request, res: Response) {
    try {
      const blogId = parseInt(req.params.blogId);
      await blogService.deleteBlog(blogId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog" });
    }
  },
};
