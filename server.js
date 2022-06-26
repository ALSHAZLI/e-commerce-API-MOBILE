const express = require('express');
const routes = require('./routes');
//var session = require('express-session')
const morgan = require("morgan");
const cors = require("cors")
//const passport = require("passport");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
var db = require('./config/connection'); 

    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

const app = express();
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // For legacy browser support
 }

app.use(cors(corsOptions));
// app.use(session({
//    secret: 'keyboard cat',
//    resave: false,
//  saveUninitialized: true
// }))
app.use(morgan('tiny'))

app.use('/Images', express.static('./Images'))

const PORT = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//Config passport middleware
// app.use(passport.initialize()); 
// app.use(passport.session()); 
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening On Port ${PORT}`));
});
