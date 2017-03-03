'use strict';
var mongoose = require('mongoose'),
bcrypt = require('bcrypt.js');

var db= mongoose.connection;

var mongoose = require('mongoose');
var schema =mongoose.Schema;

var studentschema = new schema({
  username:{
    type: String,
    unique: true
  },
  password: String

});

var student = mongoose.model('student', studentschema);
module.exports = student;

module.exports.createStudent = function(newStudent, callback){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newStudent.password, salt, function(err, hash){
      newStudent.password=hash;
      newStudent.save(callback);
    });
  });
};
