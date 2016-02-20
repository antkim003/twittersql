//var Model = require('./models/index');
var express = require('express');
var app = express();
var swig = require('swig');
var routes = require('./routes');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var bodyParser = require('body-parser');

// templating boilerplate setup
app.set('views', path.join(__dirname, '/views')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// start the server
var server = app.listen(1337, function(){
  console.log('listening on port 1337');
});

// modular routing that uses io inside it
app.use('/', routes);

// the typical way to use express static middleware.
app.use(express.static(path.join(__dirname, '/public')));



/*
Model.User.findOne()
  .then(function(user) {
    // console.log(user.dataValues);
    // console.log(user.get({plain: true}));    
    return user.getTweets();
  })
  .then(function(tweets) {
    console.log(tweets);
    JSON.stringify(tweets);
  });


// joining
Model.User.findAll({
  include: [ Model.Tweet ]
}).then(function(users) {
  console.log(users);
  // console.log(user.get({plain: true}));    
});
*/