import { Router } from "express";
import { blogController } from "../controller/blogController";

const blogRoute = Router();

// Create blog
blogRoute.post("/", blogController.createBlog);

// Get all blogs
 blogRoute.get("/", blogController.getAllBlogs);

// Get blogs by user
blogRoute.get("/user/:userId", blogController.getBlogsByUser);

// Update blog
blogRoute.put("/:blogId", blogController.updateBlog);

// Delete blog
blogRoute.delete("/:blogId", blogController.deleteBlog);

export default blogRoute;