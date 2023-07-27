// If NOT In Production Mode Then Take
// Variables Defined in The .env File And
// Add Them To process.env In The Node App
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoDBStore = require('connect-mongo');
const User = require('./models/user');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const mongoSanitize = require('express-mongo-sanitize');

// Config Constants For Database & Session/Session Store
const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/apollo';
const secret = process.env.secret || 'thisshouldbeasecret';

// Creating A Session Store
const store = MongoDBStore.create({
    mongoUrl: dbURL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secret
    }
});

// Session Store Error Handler
store.on('error', function(e) {
    console.log('SESSION STORE ERROR: ', e);
});

// Configuring Session Options
const sessionConfig = {
    store: store,
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, // Only sends requests over HTTP NOT JavaScript
        // secure: true, // Only sends cookies over secure request (HTTPS)
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

// Initialise Server & Connect To Database
const app = express();
mongoose.connect(dbURL);

// Test Database Connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB CONNECTION ERROR'));
db.once('open', () => {
    console.log('DB SUCCESSFUL CONNECTION');
});

// Setting View Engine & Path For Views
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(mongoSanitize());

// Middleware To Use Session
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Middleware To Use Flash (MUST BE AFTER SESSION CONFIG)
app.use(flash());

// Middleware To Serve Data To ALL Templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Use Local Strategy: Adds authenticate() Method On User Model
passport.use(new LocalStrategy(User.authenticate()));

// Methods To Add/Remove User From Session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware To Use Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/posts/:id/comments', commentRoutes);

app.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    } else {
        res.render('home');
    }
});

app.get('/calendar', (req, res) => {
    res.render('pages/calendar');
});

app.get('/schedule', (req, res) => {
    res.render('pages/schedule');
});

/**************************************/

// 404 Error Handler For All (*) Routes
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

// Error Handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Something Went Wrong!';
    res.status(statusCode).render('error', { err });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('LISTENING ON PORT:', port);
});

