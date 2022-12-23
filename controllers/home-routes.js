const router = require('express').Router();
const { User, Blogpost, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
    res.redirect('/home');
});

// At /home, show all existing blog posts
router.get('/home', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogposts = blogpostData.map((post => post.get({ plain: true })));

        res.render('home', {
            blogposts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    res.render('dashboard', {
        loggedIn: req.session.loggedIn
    });
})

// Login route
router.get('/login', (req, res) => {
    // If already logged in, redirect user to homepage
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } 
    // If not logged in, render login page
    res.render('login');
});

// Sign up route
router.get('/signup', (req, res) => {
    // If already logged in, redirect user to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    } 
    // If not logged in, render signup page
    res.render('signup');
});

// Log out
router.get('/logout', (req, res) => {
    console.log('\nReached logout route\n');
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            console.log('\nLogging out\n');
            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;