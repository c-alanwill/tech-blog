const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const helpers = require('./utils/helpers');
const routes = require('./controllers');
const sequelize = require('./config/connection');


// Initialize app and create port
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

//  Set up Session
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore ({
    db: sequelize,
  }),
};
app.use(session(sess));

// Route middleware 
// app.use(routes);

// Set handlebars as template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Body and URL parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static middleware 
app.use(express.static(path.join(__dirname, 'public')));

// Sync with db then start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
});