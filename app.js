var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inscriptionRouter = require('./routes/inscription');
var registerRouter = require('./routes/register');
var connexionRouter = require('./routes/connexion');
var connectRouter = require('./routes/connect');
var logoutRouter = require('./routes/logout');
var emargementRouter = require('./routes/emargement');
var templateRouter = require('./routes/template')
var cFeuilleRouter = require('./routes/creationFeuille');
var cTemplateRouter = require('./routes/creationTemplate');
var suppressionTemplateRouter = require('./routes/suppressionTemplate');
var infoTemplate = require('./routes/infoTemplate');
var infoFeuille = require('./routes/infoFeuille');
var infoSignature = require('./routes/infoSignature');
var updateTemplate = require('./routes/updateTemplate');
var actionSurFeuille = require('./routes/actionSurFeuille');
var testPDF = require('./routes/testPDF');
var signature = require('./routes/signature');
var generationLien = require('./routes/generationLien');
var lienSignature = require('./routes/lienSignature');


/* API */
var users = require('./api/routes/users');
/* API */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600*1000*3
  }
}));

var requiresLogin = function(req, res, next) {

  if (req.session.isLogged) {
    return next();
  } else {
    /*var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);*/
    res.send('You must be logged in to view this page.')
  }
}

/**
 * @MidleWare
 * Flash Messages
 */
app.use('/*', function (req, res, next) {
  res.locals.msgFlash = {}
  if (req.session.msgFlash) {
    res.locals.msgFlash = req.session.msgFlash
    req.session.msgFlash = null
  }
  next()
})

app.use('/', indexRouter);
app.use('/inscription', inscriptionRouter);
app.use('/register', registerRouter);
app.use('/connexion', connexionRouter);
app.use('/connect', connectRouter);
app.use('/logout', logoutRouter);
app.use('/emargement', requiresLogin, emargementRouter);
app.use('/creation-feuille', requiresLogin, cFeuilleRouter);
app.use('/creation-template', requiresLogin, cTemplateRouter);
app.use('/template', requiresLogin, templateRouter);
app.use('/suppressionTemplate', requiresLogin, suppressionTemplateRouter);
app.use('/infoTemplate', requiresLogin, infoTemplate);
app.use('/infoFeuille', requiresLogin, infoFeuille);
app.use('/infoSignature', requiresLogin, infoSignature);
app.use('/updateTemplate', requiresLogin, updateTemplate);
app.use('/actionSurFeuille', requiresLogin, actionSurFeuille);
app.use('/testPDF', requiresLogin, testPDF);
app.use('/signature', requiresLogin, signature);
app.use('/generation-lien', requiresLogin, generationLien);
app.use('/lien-signature', lienSignature);

/* API */

app.use('/api/users', users);


/* API */





app.use('/users', usersRouter);

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
