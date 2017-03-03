var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator =require('express-validator');
var mongoose = require('mongoose');
var router = express.Router();
var localstrategy = require('passport-local').Strategy;
var index = require('../views/index.js');
var student = require('../models/studentmodel.js');

var myDB ='mongodb://localhost/portfolio';
mongoose.connect(myDB);

router.get("/login", function(req, res){
  res.render('login.ejs');
});

var app = express();
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.errors= null;
  next();
});

// express-validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.get('/', function(req, res)
{
  res.render('login')
});


app.post('/login', function(req, res){
  req.checkBody('username', 'Username is required!').notEmpty();
  req.checkBody('password', 'Password is required!').notEmpty();

  var errors =req.validationErrors();

  if(errors){
    res.render('index',{
    errors: errors
   });
  }  else {
    var newUser = {
      username: req.body.username,
      password: req.body.password
    }
    res.redirect('/login');
  console.log('SUCCESS');
  }

});

module.exports= router;

app.listen(8080, function(){
  console.log('Magic happens on port 8080...');
})
