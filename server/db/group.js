const util = require('./util');
module.exports = class Group {
    constructor(pool) {
        this.pool = pool;
    }
    createGroup(body) {
        let cmdText = `INSERT INTO keepfur_blog_group (name,type,created_date) VALUES (?,?,?)`,
            cmdParams = [];
        cmdParams.push(body.name);
        cmdParams.push(body.type);
        cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'));
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readGroupList(query) {
        let limit = Number(query.limit || 20),
            offset = Number(query.offset - 1) * limit,
            cmdText = `SELECT g.id,g.name,g.status,g.type,g.created_date AS createdDate,g.update_date AS updateDate FROM keepfur_blog_group g INNER JOIN keepfur_blog_user u ON g.user_id=u.id WHERE 1=1`,
            cmdParams = [];
        if (query.keyword) {
            cmdText += ` AND g.name LIKE '%${query.keyword}%'`;
        }
        if (query.type) {
            cmdText += ` AND type = ?`;
            cmdParams.push(query.type);
        }
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND g.user_id = ?`;
            cmdParams.push(query.user_id);
        }
        cmdText += ` ORDER BY g.created_date DESC`;
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readGroupListTotal(query) {
        let cmdText = `SELECT COUNT(id) as total FROM keepfur_blog_group WHERE 1=1`,
            cmdParams = [];
        if (query.keyword) {
            cmdText += ` AND name LIKE '%${query.keyword}%'`;
        }
        if (query.type) {
            cmdText += ` AND type = ?`;
            cmdParams.push(query.type);
        }
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND user_id = ?`;
            cmdParams.push(query.user_id);
        }
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readGroupById(query) {
        let cmdText = `SELECT g.id,g.name,g.status,g.type,g.created_date AS createdDate,g.update_date AS updateDate FROM keepfur_blog_group g INNER JOIN keepfur_blog_user u ON g.user_id=u.id WHERE 1=1`,
            cmdParams = [Number(query.id)];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    updateGroupById(body) {
        let cmdText = `UPDATE  keepfur_blog_group SET `,
            cmdParams = [];
        if (body.name) {
            cmdText += `, name = ?`;
            cmdParams.push(body.name);
        }
        if (body.type) {
            cmdText += `, type = ?`;
            cmdParams.push(body.type);
        }
        cmdText += `,update_date = ?`;
        cmdParams.push(new Date());
        cmdText += ` WHERE id = ?`;
        cmdParams.push(body.id);
        cmdText = cmdText.replace(/SET ,/ig, 'SET ');
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    deleteGroupById(body) {
        let cmdText = `UPDATE  keepfur_blog_group SET status = ? WHERE id = ? `,
            cmdParams = [body.status, body.id];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }
};