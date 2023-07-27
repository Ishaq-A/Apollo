const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../controllers/auth');

/*
    UNCOMMENT ALL THE CODE BELOW TO ENABLE USER REGISTRATION 
    (TESTING AND DEVELOPMENT PURPOSES ONLY)
*/

// const User = require('../models/user');
// const catchAsync = require('../utils/catchAsync');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/'});

/* Register Routes (TEMPORARY) */

// router.get('/register', (req, res) => {
//     if (!req.isAuthenticated()) {
//         res.render('auth/register');
//     } else {
//         req.flash('error', 'You are already logged in!');
//         res.redirect('/');
//     }
// });

// router.post('/register', upload.single('image'), catchAsync(async (req, res) => {
//     try {
//         const { firstname, lastname, email, username, password } = req.body;
//         const user = new User({ firstname, lastname, email, username });

//         if (req.file) {
//             const { path, filename } = req.file;
//             user.profileImage = { url: path, filename };
//         } else {
//             const filename = "";
//             const path = "";
//             user.profileImage = { url: path, filename };
//         }

//         const registeredUser = await User.register(user, password);

//         req.login(registeredUser, (err) => {
//             if (err) return next(err);

//             req.flash('success', 'You successfully registered with Apollo');
//             res.redirect('/');
//         });

//     } catch (err) {
//         req.flash('error', err.message);
//         res.redirect('register');
//     }
// }));

// Login Routes
const authenticateUser = passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/auth/login'
});

router.route('/login')
.get(auth.renderLogin)
.post(authenticateUser, auth.login)


// Logout Route
router.get('/logout', auth.logout);

module.exports = router;

