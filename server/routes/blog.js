const express = require('express');
const router = express.Router();
const blog = require('../lib/blog');
const util = require('../db/util');
// 新增博客
router.post('/create_blog', function (req, res, next) {
    try {
        blog.createBlog(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 读取博客,支持分页
router.get('/read_blog_list', function (req, res, next) {
    try {
        blog.readBlogList(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 读取博客，根据id
router.get('/read_blog_by_id', function (req, res, next) {
    try {
        blog.readBlogById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 修改博客,根据id
router.post('/update_blog_by_id', function (req, res, next) {
    try {
        blog.updateBlogById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 删除博客，根据id，逻辑删除
router.post('/delete_blog_by_id', function (req, res, next) {
    try {
        blog.deleteBlogById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

module.exports = router;
