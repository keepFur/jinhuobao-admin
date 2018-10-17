const DB = require('../db/index');
class Todo {
    createTodo(req, res) {
        DB.todo.createTodo(req.body).then(() => {
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

    readTodoList(req, res) {
        DB.todo.readTodoList(req.query).then(resData => {
            DB.todo.readTodoListTotal(req.query).then(total => {
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

    readTodoById(req, res) {
        DB.todo.readTodoById(req.query).then(resData => {
            res.send({
                ret: 0,
                msg: '',
                todo: resData
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }

    updateTodoById(req, res) {
        DB.todo.updateTodoById(req.body).then(() => {
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

    deleteTodoById(req, res) {
        DB.todo.deleteTodoById(req.body).then(() => {
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

module.exports = new Todo();

