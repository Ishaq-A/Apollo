const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdministrator } = require('../middleware');
const users = require('../controllers/users');

// Users Page
router.get('/', isLoggedIn, isAdministrator, catchAsync(users.showUsers));

// Create User
router.route('/register')
.get(isLoggedIn, isAdministrator, users.renderNewForm)
.post(isLoggedIn, isAdministrator, upload.single('image'), catchAsync(users.createUser));

// Update User
router.get('/:id/edit', isLoggedIn, isAdministrator, catchAsync(users.renderEditForm));

router.put('/:id', isLoggedIn, isAdministrator, upload.single('image'), catchAsync(users.updateUser));

// Delete User
router.delete('/:id', isLoggedIn, isAdministrator, catchAsync(users.deleteUser));

module.exports = router;

