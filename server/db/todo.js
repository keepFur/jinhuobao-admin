const util = require('./util');
module.exports = class Todo {
    constructor(pool) {
        this.pool = pool;
    }
    createTodo(body) {
        let cmdText = `INSERT INTO keepfur_blog_todo (title,group_id,author_id,content,created_date) VALUES (?,?,?,?,?)`,
            cmdParams = [];
        cmdParams.push(body.title);
        cmdParams.push(body.groupId);
        cmdParams.push(body.authorId);
        cmdParams.push(body.content);
        cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'));
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readTodoList(query) {
        let limit = Number(query.limit || 20),
            offset = Number(query.offset - 1) * limit,
            cmdText = `SELECT t.id,title,t.status,group_id AS groupId, u.username AS author, g.name AS groupName, content,t.created_date AS createdDate
                       FROM keepfur_blog_todo t
                       INNER JOIN keepfur_blog_group g ON t.group_id=g.id 
                       INNER JOIN keepfur_blog_user u ON u.id = t.author_id WHERE g.type=2`,
            cmdParams = [];
        if (query.keyword) {
            cmdText += ` AND (t.title LIKE '%${query.keyword}%' OR t.content LIKE '%${query.keyword}%')`;
        }
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND t.author_id = ?`;
            cmdParams.push(query.author_id);
        }
        cmdText += ` ORDER BY t.created_date DESC LIMIT ?,?`;
        cmdParams.push(offset, limit);
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readTodoListTotal(query) {
        let cmdText = `SELECT COUNT(id) as total FROM keepfur_blog_todo WHERE 1=1 `,
            cmdParams = [];
        if (query.keyword) {
            cmdText += ` AND (title LIKE '%${query.keyword}%' OR content LIKE '%${query.keyword}%')`;
        }
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND author_id = ?`;
            cmdParams.push(query.author_id);
        }
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readTodoById(query) {
        let cmdText = `SELECT t.id,title,t.status,group_id AS groupId, u.username AS author, g.name AS groupName, content,t.created_date AS createdDate
                        FROM keepfur_blog_todo t
                        INNER JOIN keepfur_blog_group g ON t.group_id=g.id 
                        INNER JOIN keepfur_blog_user u ON u.id = t.author_id WHERE t.id = ?`,
            cmdParams = [Number(query.id)];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    updateTodoById(body) {
        let cmdText = `UPDATE  keepfur_blog_todo SET `,
            cmdParams = [];
        if (body.title) {
            cmdText += `, title = ?`;
            cmdParams.push(body.title);
        }
        if (body.content) {
            cmdText += `, content = ?`;
            cmdParams.push(body.content);
        }
        if (body.groupId) {
            cmdText += `, group_id = ?`;
            cmdParams.push(body.groupId);
        }
        cmdText += ` WHERE id = ?`;
        cmdParams.push(body.id);
        cmdText = cmdText.replace(/SET ,/ig, 'SET ');
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    deleteTodoById(body) {
        let cmdText = `UPDATE  keepfur_blog_todo SET status = ? WHERE id = ? `,
            cmdParams = [body.status, body.id];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }
};