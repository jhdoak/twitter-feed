var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

// This route configuraton uses the REST API to get the last 20 tweets
// from a specified account
router.get('/', function(req, res, next) {
  var search_screen_name = req.query.username ? req.query.username : "cnnpolitics";
  var twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  twitter.get('statuses/user_timeline', { screen_name: search_screen_name, count: 20 }, function(error, tweets, response) {
    if (!error) {
      if (tweets.length == 0) {
        res.render('index', { tweets: tweets, user: search_screen_name });
      }
      res.render('index', { tweets: tweets });
    }
    else {
      res.render('index', { error: error, tweets: null, user: search_screen_name });
    }
  });
});

// Redirect all urls that other than '/' back to the root route.
router.get('/*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
