'use strict';
var express = require('express');
var router = express.Router();
var swig = require('swig');
var path = require('path'); 
var Model = require('../models/index');

module.exports = router; 

router.get('/', function(req, res, next) {
	Model.Tweet.findAll({
		include: [Model.User]
	}) 
	.then(function(results) {
		res.render('index', {tweets:results});
		//console.log(results)
	});
});
//router.get('/username', showUser);


/*
Model.User.findAll({
  include: [ Model.Tweet ]
}).then(function(users) {
  console.log(users);
  // console.log(user.get({plain: true}));    
});
*/