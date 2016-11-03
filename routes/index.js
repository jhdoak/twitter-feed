var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

/* GET home page. */
router.get('/', function(req, res, next) {

  var twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  console.log('process:', process.env.TWITTER_CONSUMER_KEY);

  var stream = twitter.stream('statuses/filter', { track: 'CNN' });
  stream.on('data', function(event) {
    console.log(event && event.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
  // Hit the Twitter API and get tweets, storing them in an array
  // and sending them to /index upon render
  res.render('index', { title: 'Express', stream: stream });
});

module.exports = router;
