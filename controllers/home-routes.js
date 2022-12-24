const router = require('express').Router();
const { User, Blogpost, Comment } = require('../models');
// Custom middleware to check whether user is logged in or not
const withAuth = require('../utils/withAuth');

// At /, redirect user to /home
router.get('/', async (req, res) => {
    res.redirect('/home');
});

// At /home, show all existing blog posts
router.get('/home', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findAll({
            // Include associated Users' usernames
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogposts = blogpostData.map((blogpost => blogpost.get({ plain: true })));

        res.render('home', {
            blogposts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// At /dashboard, show all of user's blogposts, button for new post
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const blogpostData = await Blogpost.findAll({
            where: {
                user_id: req.session.userId
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogposts = blogpostData.map((blogpost => blogpost.get({ plain: true })));

        // Check if user has clicked on new post button
        let creatingPost = false;
        // If /dashboard?creatingPost=true
        if (req.query.creatingPost) {
            creatingPost = true;
        }

        res.render('dashboard', {
            blogposts,
            loggedIn: req.session.loggedIn,
            creatingPost
        });
    } catch (err) {
        res.status(500).json(err);
    };
})

// At /posts/:id, show all comments on blogpost and new comment form
router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        console.log('\nReached /posts/:id \n');

        const blogpostData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                // Include associated comments on blogpost, and users' usernames who left comments 
                {
                    model: Comment,
                    include: [
                        {
                            model: User,

                        }
                    ]
                }
        ]});
    
        console.log(blogpostData);

        const blogpost = blogpostData.get({ plain: true });
    
        res.render('blogpost', {
            blogpost,
            comments: blogpost.comments,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// At /dashboard/posts/:id, show form to edit blogpost
router.get('/dashboard/posts/:id', withAuth, async (req, res) => {
    try {
        console.log('\nReached /dashboard/posts/:id \n');

        const blogpostData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
        ]});
    
        console.log(blogpostData);

        const blogpost = blogpostData.get({ plain: true });
    
        res.render('edit-blogpost', {
            blogpost,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
    // If already logged in, redirect user to dashboard
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } 
    // If not logged in, render login page
    res.render('login');
});

// Sign up route
router.get('/signup', (req, res) => {
    // If already logged in, redirect user to dashboard
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