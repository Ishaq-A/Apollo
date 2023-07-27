const User = require('../models/user');

module.exports.showUsers = async (req, res) => {
    const users = await User.find({});
    res.render('user/show', { users });
};

module.exports.renderNewForm = (req, res) => {
    res.render('user/register');
};

module.exports.createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;
        const user = new User({ firstname, lastname, email, username });

        if (req.file) {
            const { path, filename } = req.file;
            user.profileImage = { url: path, filename };
        } else {
            const filename = "";
            const path = "";
            user.profileImage = { url: path, filename };
        }
        
        await User.register(user, password);
        req.flash('success', 'User registered with Apollo');
        res.redirect('/users');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/users');
    }
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
        req.flash('error', 'Cannot find user');
        return res.redirect('/users');
    }

    res.render('user/edit', { user });
};

module.exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, {
            $set: req.body
        });

        if (req.file) {
            const { path, filename } = req.file;
            user.profileImage = { url: path, filename };
        } else {
            const filename = "";
            const path = "";
            user.profileImage = { url: path, filename };
        }

        await user.save();
        
        req.flash('success', 'User successfully updated');
        res.redirect('/users');
    } catch (err) {
        req.flash('error', err.message);
    }
};

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    req.flash('success', 'User successfully deleted');
    res.redirect('/users');
};

