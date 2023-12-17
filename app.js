var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var XacThucRouter = require('./routes/XacThuc');
var NhaHangRouter = require('./routes/NhaHang');
var CartRouter = require('./routes/Cart');
var FoodRouter = require('./routes/Food');
var LoveRouter = require('./routes/Love');
var OrderRouter = require('./routes/Order');
// them
const MongoDB = require('./services/mongodb');

MongoDB.connecToMongoDB();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('static'));

app.use('/', indexRouter);
app.use('/api', XacThucRouter);
app.use('*', require("./services/XacThucServices").XacMinhToken);//t

app.use('/api/user', XacThucRouter);
app.use('/api/nhahang', NhaHangRouter);
app.use('/api/cart', CartRouter);
app.use('/api/food', FoodRouter);
app.use('/api/favorite', LoveRouter);
app.use('/api/order', OrderRouter);

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

module.exports = app;
