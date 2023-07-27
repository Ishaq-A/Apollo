const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const posts = require('../controllers/posts');

// Show All Posts
router.get('/', isLoggedIn, catchAsync(posts.index));

// Create Post
router.get('/new', isLoggedIn, posts.renderNewForm);

router.post('/', isLoggedIn, upload.array('image'), catchAsync(posts.createPost));

// Show Specific Post
router.get('/:id', catchAsync(posts.showPost));

// Edit Post
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(posts.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), catchAsync(posts.updatePost));

// Delete Post
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(posts.deletePost));

module.exports = router;

