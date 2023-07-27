const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const comments = require('../controllers/comments');

// Create Comment
router.post('/', isLoggedIn, catchAsync(comments.createComment));

// Delete Comment
router.delete('/:commentId', isLoggedIn, catchAsync(comments.deleteComment));

module.exports = router;

