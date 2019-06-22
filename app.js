var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//including routes
var indexRouter = require('./routes/index');
var greenRouter = require('./routes/green');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Use routes
app.use('/', indexRouter);
app.use('/green', greenRouter);


//creando base de datos
mongoose.connect("mongodb+srv://user:holadb@cluster0-e7aiv.mongodb.net/coins?retryWrites=true", {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Connection to database succesful!");
    })
    .catch(err => {
        console.log("Error connecting to database. Shutting down...", err);
    })



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

module.exports = app