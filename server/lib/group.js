const DB = require('../db/index');
class Group {
    createGroup(req, res) {
        DB.group.createGroup(req.body).then(() => {
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

    readGroupList(req, res) {
        DB.group.readGroupList(req.query).then(resData => {
            DB.group.readGroupListTotal(req.query).then(total => {
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

    readGroupById(req, res) {
        DB.group.readGroupById(req.query).then(resData => {
            res.send({
                ret: 0,
                msg: '',
                group: resData
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }

    updateGroupById(req, res) {
        DB.group.updateGroupById(req.body).then(() => {
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

    deleteGroupById(req, res) {
        DB.group.deleteGroupById(req.body).then(() => {
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

module.exports = new Group();

