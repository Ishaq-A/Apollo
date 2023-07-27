module.exports.renderLogin = (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('auth/login');
    } else {
        req.flash('error', 'You are already logged in!');
        res.redirect('/');
    }
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/');
};

module.exports.logout = (req, res) => {
    req.logout(err => {
        if (err) return next(err);
    });

    req.flash('success', 'Goodbye!');
    res.redirect('/');
};

