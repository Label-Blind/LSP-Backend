const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs')
const path = require('path');
const DIR = './public/images/';

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage})

// Backend
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const settingRouter = require('./routes/setting')
const usersRouter = require('./routes/users');
const categotyRouter = require('./routes/category')
const cmsRouter = require('./routes/cms')
const queryRouter = require('./routes/enquiry')
const faqsRouter = require('./routes/faqs')

// APIS
const apiRouter = require('./routes/API/users')

const app = express();

mongoose.connect('mongodb://localhost:27017/lb_new', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => handleError(error));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// ejs,jade,pug
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const dir = path.join(__dirname, '/public');
app.use('/public', express.static(dir));

app.use(session({secret : 'suraj',cookie:{maxAge:6000}})); // session middleware
app.use(flash());

// Backend Routes
app.use('/', indexRouter);
app.use('/login', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/profile', profileRouter);
app.use('/settings', settingRouter);
app.use('/users', usersRouter);
app.use('/categories', categotyRouter);
app.use('/cms', cmsRouter);
app.use('/enquiries', queryRouter);
app.use('/faqs', faqsRouter);

// API ROUTES
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(5000);


module.exports = app;
