var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', { title: '进货宝' })
})

module.exports = router
