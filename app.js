var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { 
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorsHandlers');

// ROUTES
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var personsRouter = require('./routes/persons');
var contractsRouter = require('./routes/contracts');
var statesRouter = require('./routes/states');
var sexesRouter = require('./routes/sexes');
var applicantsRouter = require('./routes/applicants');
var objetsRouter = require('./routes/objets');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/personas', personsRouter);
app.use('/contratos', contractsRouter);
app.use('/estados', statesRouter);
app.use('/sexos', sexesRouter);
app.use('/solicitantes', applicantsRouter);
app.use('/objetos', objetsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// error handler
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;