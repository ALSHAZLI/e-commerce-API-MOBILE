const express = require('express');
const routes = require('./routes');
//var session = require('express-session')
const morgan = require("morgan");
//const passport = require("passport");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
var db = require('./config/connection'); 

    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

const app = express();

// app.use(session({
//    secret: 'keyboard cat',
//    resave: false,
//  saveUninitialized: true
// }))
app.use(morgan('tiny'))
const PORT = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//Config passport middleware
// app.use(passport.initialize()); 
// app.use(passport.session()); 

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
