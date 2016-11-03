var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Hit the Twitter API and get tweets, storing them in an array
  // and sending them to /index upon render
  res.render('index', { title: 'Express' });
});

module.exports = router;
