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

router.get('/summary', function(req, res, next) {
	var numTweets = {};
	Model.User.findAll({
		where: {name: "ontima"}
	})
	.then(function(users){
		users.forEach(function(user) {
			user.getTweets().then(function(tweet){
				numTweets[user] = tweet;
			});
		});
		console.log("numTweets ", numTweets);
		// users.map(function(user) {
		// 	user.getTweets().then(function(tweet) {
		// 		numTweets[user] = tweet;
		// 	})
		// })
	});
})


router.get('/users/:id', function(req, res, next) {

	Model.User.find({
		where: {id: req.params.id}, 
		include: [Model.Tweet]
	}).then(function (results) {
		console.log("results to user page: ", results.get({plain: true}));
		res.render('user', {user:results});
	})
});

router.get('/create', function(req, res, next) {
	res.render('form');
})

router.post('/create', function(req, res, next) {
	console.log(req.body);
	var userName = req.body.name;
	var tweet = req.body.text;

	Model.User.findOrCreate({
		where: {name: userName}
	}).then (function(user) {
		console.log("userid: ", user[0].id);
		 return Model.Tweet.create({
		 	tweet: tweet,
		 	UserId: user[0].id
		 })
	}).then(function() {
		res.redirect('/');
	})
});

router.get('/delete/:tweetid', function(req, res, next) {
	Model.Tweet.find({
		where: {id: req.params.tweetid}
	}).then(function(results) {
		return results.destroy();
	}).then(function() {
		res.redirect('/');
	})
	
})


/*
Model.User.findAll({
  include: [ Model.Tweet ]
}).then(function(users) {
  console.log(users);
  // console.log(user.get({plain: true}));    
});
*/