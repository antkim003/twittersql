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

router.get('/users/:username', function(req, res, next) {

	Model.User.find({
		where: {name: req.params.username}, 
		include: [Model.Tweet]
	}).then(function (results) {
		console.log(results.get({plain: true}));
	})
});

router.get('/create', function(req, res, next) {
	res.render('form');
})

router.post('/create', function(req, res, next) {
	var name = req.params.username;
	var tweet = req.params.tweet;

	//Model.User.findOrCreate
})

/*
Model.User.findAll({
  include: [ Model.Tweet ]
}).then(function(users) {
  console.log(users);
  // console.log(user.get({plain: true}));    
});
*/