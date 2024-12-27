require("dotenv").config();
const express = require("express")
const path = require('path');
const app = express();
const cors = require('cors');
const db = require("./config/mongo.connect")
const AuthRoutes = require("./routes/Auth.routes")
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const setCookie = require('./utils/cookie.token.setter');
// routes
const indexRouter = require('./routes/view.routes');
const adminRoutes = require('./routes/user.auth.routes.js');
const UploadRoutes = require('./routes/upload.routes.js');
const certificate = require('./routes/Certificate.routes.js');
const session = require('express-session');


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session handle


app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use true if using HTTPS
  })
);
// -----------------session ended


app.use(morgan('dev'));
app.use(express.json());
// process routes

app.use("/api/v1/auth/",AuthRoutes)
app.use("/api/v1/auth/admin/",adminRoutes)
app.use("/api/v1/upload/", UploadRoutes)
app.use("/api/v1/update/", certificate)

// renderRoutes(app);

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// app.get('/',(req,res)=>{
//     res.send("Hello World")
// })

app.listen(3001, console.log("Auth Service running in #3001 Port"))