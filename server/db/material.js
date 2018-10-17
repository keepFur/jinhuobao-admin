const util = require('./util');
module.exports = class Material {
    constructor(pool) {
        this.pool = pool;
    }
    createMaterial(body, files) {
        let cmdText = `INSERT INTO keepfur_blog_material (name,group_id,author_id,type,path,created_date) VALUES `,
            cmdParams = [];
        files.forEach((file, index) => {
            if (index !== files.length - 1) {
                cmdText += '(?,?,?,?,?,?),';
            } else {
                cmdText += '(?,?,?,?,?,?)';
            }
            cmdParams.push(file.name);
            cmdParams.push(body.groupId);
            cmdParams.push(body.authorId);
            cmdParams.push(body.type);
            cmdParams.push(file.name);
            cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'));
        });
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readMaterialList(query) {
        let limit = Number(query.limit || 20),
            offset = Number(query.offset - 1) * limit,
            cmdText = `SELECT m.id,m.status,m.name,m.path,m.type, group_id AS groupId, u.username AS author, g.name AS groupName,m.created_date AS createdDate,m.update_date AS updateDate 
                       FROM keepfur_blog_material m
                       INNER JOIN keepfur_blog_group g ON m.group_id=g.id 
                       INNER JOIN keepfur_blog_user u ON u.id = m.author_id WHERE 1=1`,
            cmdParams = [];
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND m.author_id = ?`;
            cmdParams.push(query.authorId);
        }
        if (query.type) {
            cmdText += ` AND m.type = ?`;
            cmdParams.push(query.type);
        }
        cmdText += ` ORDER BY m.created_date DESC`;
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readMaterialListTotal(query) {
        let cmdText = `SELECT COUNT(id) as total FROM keepfur_blog_material WHERE 1=1 `,
            cmdParams = [];
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND author_id = ?`;
            cmdParams.push(query.authorId);
        }
        if (query.type) {
            cmdText += ` AND type = ?`;
            cmdParams.push(query.type);
        }
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readMaterialById(query) {
        let cmdText = `SELECT m.id,m.status,m.name,m.path,m.type, group_id AS groupId, u.username AS author, g.name AS groupName,m.created_date AS createdDate,m.update_date AS updateDate 
                        FROM keepfur_blog_material m
                        INNER JOIN keepfur_blog_group g ON m.group_id=g.id 
                        INNER JOIN keepfur_blog_user u ON u.id = m.author_id WHERE m.id=?`,
            cmdParams = [Number(query.id)];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    updateMaterialById(body) {
        let cmdText = `UPDATE  keepfur_blog_material SET `,
            cmdParams = [];
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

    deleteMaterialById(body) {
        let cmdText = `DELETE FROM keepfur_blog_material WHERE id = ? `,
            cmdParams = [body.id];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }
};