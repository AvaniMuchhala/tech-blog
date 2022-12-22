const router = require('express').Router();

// CREATE, UPDATE, DELETE routes
const apiRoutes = require('./api');
// GET routes (render view)
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

module.exports = router;