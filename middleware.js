const Post = require('./models/post');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in!');
        return res.redirect('/auth/login');
    }

    next();
};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    if(!post.author.equals(req.user._id)) {
        req.flash('error', 'Permission denied!');
        return res.redirect(`/posts/${id}`);
    }

    next();
};

module.exports.isAdministrator = (req, res, next) => {
    if (!req.user.isAdmin) {
        req.flash('error', 'Page not found');
        return res.redirect('/');
    }

    next();
};

