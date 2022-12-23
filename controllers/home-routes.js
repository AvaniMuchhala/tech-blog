const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('test');
});

// Login route
router.get('/login', (req, res) => {
    // If already logged in, redirect user to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
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

module.exports = router;