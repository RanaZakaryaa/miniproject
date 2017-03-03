var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator =require('express-validator');
var mongoose = require('mongoose');
var router = express.Router();
var localstrategy = require('passport-local').Strategy;

var myDB ='mongodb://localhost/portfolio';
mongoose.connect(myDB);

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

var users = [
  {
    id: 1,
    username: 'rana noureldin',
    password: 234,
  },
  {
    id: 2,
    username: 'Aya saadeldin',
    password: 289,
  },
  {
    id: 3,
    username: 'Lina Salah',
    password: 798,
  }
]

app.get('/', function(req, res){
  res.render('index',{
  title: 'Students',
  users: users
 });
});

app.post('/users/add', function(req, res){
  req.checkBody('username', 'Username is required!').notEmpty();
  req.checkBody('password', 'Password is required!').notEmpty();

  var errors =req.validationErrors();

  if(errors){
    res.render('index',{
    title: 'Students',
    users: users,
    errors: errors
   });
  }  else {
    var newUser = {
      username: req.body.username,
      password: req.body.password
    }

  console.log('SUCCESS');
  }

});


app.listen(8080, function(){
  console.log('Magic happens on port 8080...');
})
