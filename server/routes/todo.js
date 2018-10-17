const express = require('express');
const router = express.Router();
const todo = require('../lib/todo');
const util = require('../db/util');
// 新增日程
router.post('/create_todo', function (req, res, next) {
    try {
        todo.createTodo(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 读取日程,支持分页
router.get('/read_todo_list', function (req, res, next) {
    try {
        todo.readTodoList(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 读取日程，根据id
router.get('/read_todo_by_id', function (req, res, next) {
    try {
        todo.readTodoById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 修改日程,根据id
router.post('/update_todo_by_id', function (req, res, next) {
    try {
        todo.updateTodoById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 删除日程，根据id，逻辑删除
router.post('/delete_todo_by_id', function (req, res, next) {
    try {
        todo.deleteTodoById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

module.exports = router;
