import {blogModel} from '../models/blogmodel'

export const blogService = {
  // Create Blog
  async createBlog(userId: number, title: string, content: string) {
    return blogModel.create({
      data: { userId, title, content },
    });
  },

  // Get All Blogs
  async getAllBlogs() {
    return blogModel.findMany({
      include: { User: true },
      orderBy: { createdAt: "desc" },
    });
  },

  // Get Blogs by UserId
  async getBlogsByUser(userId: number) {
    return blogModel.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  // Get Single Blog
  async getBlogById(blogId: number) {
    return blogModel.findUnique({ where: { id: blogId } });
  },

  // Update Blog
  async updateBlog(blogId: number, title: string, content: string) {
    return blogModel.update({
      where: { id: blogId },
      data: { title, content },
    });
  },

  // Delete Blog
  async deleteBlog(blogId: number) {
    return blogModel.delete({
      where: { id: blogId },
    });
  },
};
