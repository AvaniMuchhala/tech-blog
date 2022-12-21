// Import packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Import modules
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Create the Handlebars.js engine object with custom helper functions
const hbs = exphbs.create({ helpers });

// Inform Express.js which template engine we're using
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Sync to database, then start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`\nServer running on port ${PORT}. Visit http://localhost:${PORT}`));
});