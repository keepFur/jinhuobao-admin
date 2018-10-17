var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: '时间的朋友' });
});

module.exports = router;
