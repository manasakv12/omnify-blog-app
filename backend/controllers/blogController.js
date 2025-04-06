const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;

    const blog = await Blog.create({ title, content, author });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);

    const blogs = await Blog.find()
      .populate("author", "email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ blogs, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author", "email");
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
};

const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  if (blog.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  blog.title = req.body.title || blog.title;
  blog.content = req.body.content || blog.content;
  await blog.save();

  res.json(blog);
};

const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  if (blog.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await blog.deleteOne();
  res.json({ message: "Blog deleted" });
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
