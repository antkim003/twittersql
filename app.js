var Model = require('./models/index');


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