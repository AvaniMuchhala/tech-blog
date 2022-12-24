const withAuth = (req, res, next) => {
    console.log('Inside withAuth function');
    console.log(req.originalUrl);
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.loggedIn) {
        console.log('Redirecting to /login');
        res.redirect('/login');
    // If user logged in, proceed with route logic
    } else {
        console.log('Proceed');
        next();
    }
};

module.exports = withAuth;
