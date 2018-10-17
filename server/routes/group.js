const express = require('express');
const router = express.Router();
const group = require('../lib/group');
const util = require('../db/util');
// 新增分组
router.post('/create_group', function (req, res, next) {
    try {
        group.createGroup(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 读取分组,支持分页
router.get('/read_group_list', function (req, res, next) {
    try {
        res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Methods', '*');
        // res.header('Content-Type', 'application/json;charset=utf-8');
        group.readGroupList(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 读取分组，根据id
router.get('/read_group_by_id', function (req, res, next) {
    try {
        group.readGroupById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 修改分组,根据id
router.post('/update_group_by_id', function (req, res, next) {
    try {
        group.updateGroupById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 删除分组，根据id，逻辑删除
router.post('/delete_group_by_id', function (req, res, next) {
    try {
        group.deleteGroupById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

module.exports = router;
