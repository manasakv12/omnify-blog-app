const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ Add this line

// GET paginated blogs
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find()
        .populate('author', 'email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);
    res.json({ blogs, totalPages });
  } catch (error) {
    console.error("Failed to fetch blogs:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ GET a single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog by ID:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ POST a new blog (authenticated users only)
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});


// ✅ PUT - Update a blog post
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error('Update blog error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ DELETE - Delete a blog post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
