var express = require('express');
var router = express.Router();
var Twitter = require('twitter');


// Revisit this route if using the Streaming API
/* GET home page. */
// router.get('/', function(req, res, next) {

//   var twitter = new Twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
//   });

//   console.log('process:', process.env.TWITTER_CONSUMER_KEY);

//   var stream = twitter.stream('statuses/filter', { track: 'javascript' });
//   stream.on('data', function(event) {
//     console.log('event:', event);
//     console.log('event.text:', event.text);
//   });

//   stream.on('error', function(error) {
//     throw error;
//   });
//   // Hit the Twitter API and get tweets, storing them in an array
//   // and sending them to /index upon render
//   res.render('index', { title: 'Express', stream: stream });
// });


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

  console.log('process:', process.env.TWITTER_CONSUMER_KEY);
  // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
  twitter.get('statuses/user_timeline', { screen_name: search_screen_name, count: 20 }, function(error, tweets, response) {
    if (!error) {
      console.log('tweets length:', tweets.length);
      res.render('index', { tweets: tweets });
    }
    else {
      console.log(error);
      res.render('index', { error: error, tweets: null });
    }
  });
  // res.render('index');
});

module.exports = router;
