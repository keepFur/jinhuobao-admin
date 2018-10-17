const util = require('./util');
module.exports = class Blog {
    constructor(pool) {
        this.pool = pool;
    }
    createBlog(body) {
        let cmdText = `INSERT INTO keepfur_blog_blog (title,group_id,author_id,content,media,created_date) VALUES (?,?,?,?,?,?)`,
            cmdParams = [];
        cmdParams.push(body.title);
        cmdParams.push(body.groupId);
        cmdParams.push(body.authorId);
        cmdParams.push(body.content);
        cmdParams.push(body.media);
        cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'));
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readBlogList(query) {
        let limit = Number(query.limit || 20),
            offset = Number(query.offset - 1) * limit,
            // cmdText = `SELECT id,title,status,group_id AS groupId,content,media,created_date AS createdDate,update_date AS updateDate FROM keepfur_blog_blog WHERE 1=1`,
            cmdText = `SELECT b.id,title,b.status,group_id AS groupId, u.username AS author, g.name AS groupName, content,media,b.created_date AS createdDate,b.update_date AS updateDate 
                       FROM keepfur_blog_blog b 
                       INNER JOIN keepfur_blog_group g ON b.group_id=g.id 
                       INNER JOIN keepfur_blog_user u ON u.id = b.author_id WHERE g.type=1`,
            cmdParams = [];
        if (query.keyword) {
            cmdText += ` AND (b.title LIKE '%${query.keyword}%' OR b.content LIKE '%${query.keyword}%')`;
        }
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND b.author_id = ?`;
            cmdParams.push(query.author_id);
        }
        cmdText += ` ORDER BY b.created_date DESC LIMIT ?,?`;
        cmdParams.push(offset, limit);
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readBlogListTotal(query) {
        let cmdText = `SELECT COUNT(id) as total FROM keepfur_blog_blog WHERE 1=1 `,
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

    readBlogById(query) {
        let cmdText = `SELECT b.id,title,b.status,group_id AS groupId, u.username AS author, g.name AS groupName, content,media,b.created_date AS createdDate,b.update_date AS updateDate 
                        FROM keepfur_blog_blog b 
                        INNER JOIN keepfur_blog_group g ON b.group_id=g.id 
                        INNER JOIN keepfur_blog_user u ON u.id = b.author_id WHERE b.id = ?`,
            cmdParams = [Number(query.id)];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    updateBlogById(body) {
        let cmdText = `UPDATE  keepfur_blog_blog SET `,
            cmdParams = [];
        if (body.title) {
            cmdText += `, title = ?`;
            cmdParams.push(body.title);
        }
        if (body.content) {
            cmdText += `, content = ?`;
            cmdParams.push(body.content);
        }
        if (body.media) {
            cmdText += `, media = ?`;
            cmdParams.push(body.media);
        }
        if (body.groupId) {
            cmdText += `, group_id = ?`;
            cmdParams.push(body.groupId);
        }
        cmdText += `,update_date = ?`;
        cmdParams.push(new Date());
        cmdText += ` WHERE id = ?`;
        cmdParams.push(body.id);
        cmdText = cmdText.replace(/SET ,/ig, 'SET ');
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    deleteBlogById(body) {
        let cmdText = `UPDATE  keepfur_blog_blog SET status = ? WHERE id = ? `,
            cmdParams = [body.status, body.id];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }
};