const express = require('express');
const router = express.Router();
const home = require('../lib/home');
const util = require('../db/util');

// 读取新闻,支持分页
router.get('/read_news_list', function (req, res, next) {
    try {
        home.readNewsList(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

module.exports = router;
