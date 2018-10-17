const DB = require('../db/index');
class Blog {
    createBlog(req, res) {
        DB.blog.createBlog(req.body).then(() => {
            res.send({
                ret: 0,
                msg: ''
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }

    readBlogList(req, res) {
        DB.blog.readBlogList(req.query).then(resData => {
            DB.blog.readBlogListTotal(req.query).then(total => {
                res.send({
                    ret: 0,
                    msg: '',
                    total: total.total,
                    rows: resData
                });
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }

    readBlogById(req, res) {
        DB.blog.readBlogById(req.query).then(resData => {
            res.send({
                ret: 0,
                msg: '',
                blog: resData
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }

    updateBlogById(req, res) {
        DB.blog.updateBlogById(req.body).then(() => {
            res.send({
                ret: 0,
                msg: '',
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }

    deleteBlogById(req, res) {
        DB.blog.deleteBlogById(req.body).then(() => {
            res.send({
                ret: 0,
                msg: '',
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }
}

module.exports = new Blog();

