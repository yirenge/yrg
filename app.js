let createError = require('http-errors');
let express = require('express');
let path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession=require('cookie-session');
const logger = require('morgan');
const consolidate=require('consolidate');


let myconfig=require("./src/myconfig");
let app = express();
let multer=require('multer');
let multerObj=multer({dest: myconfig.uploadDir});

//1.middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(multerObj.any());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
(function (){
  var keys=[];
  for(var i=0;i<myconfig.session.count;i++){
    keys[i]='a_'+Math.random();
  }
  app.use(cookieSession({
    name: 'sess_id',
    keys: keys,
    maxAge: 20*60*1000  //20min
  }));
})();
app.use(myconfig.baseUrl,express.static(path.join(__dirname, 'public/yrg')));
app.use("/files",express.static(path.join(__dirname, 'public/res')));

//2.routes
// app.use('/', indexRouter);
app.use(myconfig.baseUrl+"/",require('./src/route/index')());


//3.模板
app.set('views', 'src/template');
app.engine('html', consolidate.ejs);
app.set('view engine', 'html');

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
  res.render('error.ejs');
});

let server=app.listen(myconfig.port, function () {
  console.log('Listening on '+server.address().port);
});

module.exports = app;
