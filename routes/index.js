'use strict';
var express = require('express');
var router = express.Router();
var swig = require('swig');
var path = require('path'); 
var Model = require('../models/index');
var sequelize = require('sequelize');

module.exports = router; 
var Tweet = Model.Tweet;
var User = Model.User;

router.get('/', function(req, res, next) {
	Tweet.findAll({
		include: [User]
	}) 
	.then(function(results) {
		res.render('index', {tweets:results, mode: 'home'});
		//console.log(user)
	});
});

router.get('/summary', function(req, res, next) {
	var tweetObj = [];
	User.findAll({
		include: [Tweet]
	})
	.then(function(users){
		console.log('users >>>>', users);
		res.render('summary', {users: users, mode: 'summary'});
	});
})


router.get('/users/:id', function(req, res, next) {
	User.find({
		where: {id: req.params.id}, 
		include: [Tweet]
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

	User.findOrCreate({
		where: {name: userName}
	}).then (function(user) {
		console.log("userid: ", user[0].id);
		 return Tweet.create({
		 	tweet: tweet,
		 	UserId: user[0].id
		 })
	}).then(function() {
		res.redirect('/');
	})
});

router.get('/delete/:tweetid', function(req, res, next) {
	Tweet.find({
		where: {id: req.params.tweetid}
	}).then(function(results) {
		return results.destroy();
	}).then(function() {
		res.redirect('/');
	})
	
})


/*
User.findAll({
  include: [ Model.Tweet ]
}).then(function(users) {
  console.log(users);
  // console.log(user.get({plain: true}));    
});
*/