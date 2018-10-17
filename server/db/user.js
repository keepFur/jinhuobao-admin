/*
 * 用于 用户 模块功能的数据实现
 */
let util = require("./util");
class User {
    // 创建用户
    createUser(data) {
        let cmdText = `INSERT INTO yidian_user
            (username,password,salt,email,created_date)
            VALUES (?,?,?,?,?)`,
            cmdParams = [];
        cmdParams.push(data.userName);
        cmdParams.push(data.password);
        cmdParams.push(data.salt);
        cmdParams.push(data.email);
        cmdParams.push(new Date());
        return util.flyer.return_promise(this.pool, cmdText, cmdParams);
    }

    // 读取记录(需要分页,查询条件：id，username level等)
    readUserPage(data) {
        let limit = Number(data.limit || 20),
            offset = Number(data.offset - 1) * limit,
            cmdText = `SELECT id, username AS userName,created_date AS createdDate,update_date AS updateDate 
            ,email,status,is_super AS isSuper FROM yidian_user WHERE 1 = 1 `,
            cmdParams = [];
        if (data.id) {
            cmdText += ` AND id = ?`;
            cmdParams.push(data.id);
        }
        if (data.userName) {
            cmdText += ` AND username LIKE '%${data.userName}%' `;
        }
        if (data.status) {
            cmdText += ` AND status = ? `;
            cmdParams.push(data.status);
        }
        if (data.isSuper) {
            cmdText += ` AND is_super = ? `;
            cmdParams.push(data.isSuper);
        }
        if (data.createdDateStart) {
            cmdText += ` AND created_date >= ? `;
            cmdParams.push(data.createdDateStart);
        }
        if (data.createdDateEnd) {
            cmdText += ` AND created_date < ? `;
            cmdParams.push(data.createdDateEnd);
        }
        cmdText += ` ORDER BY CONVERT(username USING gb2312) ASC LIMIT ?,?`;
        cmdParams.push(offset, limit);
        return util.flyer.return_promise(this.pool, cmdText, cmdParams);
    }

    // 读取总数根据条件
    readUserPageTotal(data) {
        let cmdText = `SELECT COUNT(id) as total FROM yidian_user WHERE 1 = 1 `,
            cmdParams = [];
        if (data.id) {
            cmdText += ` AND id = ?`;
            cmdParams.push(data.id);
        }
        if (data.userName) {
            cmdText += ` AND username LIKE '%${data.userName}%' `;
        }
        if (data.level) {
            cmdText += ` AND ASIN level = ? `;
            cmdParams.push(data.level);
        }
        if (data.status) {
            cmdText += ` AND status = ? `;
            cmdParams.push(data.status);
        }
        if (data.isSuper) {
            cmdText += ` AND is_super = ? `;
            cmdParams.push(data.isSuper);
        }
        if (data.moneyMin) {
            cmdText += ` AND money >= ?`;
            cmdParams.push(data.moneyMin);
        }
        if (data.moneyMax) {
            cmdText += ` AND money <= ?`;
            cmdParams.push(data.moneyMax);
        }
        if (data.createdDateStart) {
            cmdText += ` AND created_date >= ? `;
            cmdParams.push(data.createdDateStart);
        }
        if (data.createdDateEnd) {
            cmdText += ` AND created_date < ? `;
            cmdParams.push(data.createdDateEnd);
        }
        return util.flyer.return_promise(this.pool, cmdText, cmdParams);
    }

    // 读取一条记录通过ID
    readUserById(data) {
        let cmdText = `SELECT id, username AS userName,level,created_date AS createdDate,update_date AS updateDate 
            ,phone,email,QQ,status,money,is_super AS isSuper FROM yidian_user WHERE id = ?`,
            cmdParams = [Number(data.id)];
        return util.flyer.return_promise(this.pool, cmdText, cmdParams);
    }

    // 更新
    updateUser(data) {
        let cmdText = `UPDATE  yidian_user SET `,
            cmdParams = [];
        if (data.password) {
            cmdText += `, password = ?`;
            cmdParams.push(data.password);
        }
        if (data.status) {
            cmdText += `, status = ?`;
            cmdParams.push(data.status);
        }
        if (data.isSuper) {
            cmdText += `,is_super = ? `;
            cmdParams.push(data.isSuper);
        }
        if (data.email) {
            cmdText += `, email = ? `;
            cmdParams.push(data.email);
        }
        cmdText += `,update_date = ?`;
        cmdParams.push(new Date());
        cmdText += ` WHERE id = ?`;
        cmdParams.push(data.id);
        cmdText = cmdText.replace(/SET ,/ig, 'SET ');
        return util.flyer.return_promise(this.pool, cmdText, cmdParams);
    }

    // 禁用或启用用户
    toggleUser(data) {
        let cmdText = `UPDATE  yidian_user SET status = ? WHERE id = ? `,
            cmdParams = [data.status, data.id];
        return util.flyer.return_promise(this.pool, cmdText, cmdParams);
    }

    // 用户权限修改
    updateIsSuperUser(data) {
        let cmdText = `UPDATE  yidian_user SET is_super = ? WHERE id = ? `,
            cmdParams = [data.isSuper, data.id];
        return util.flyer.return_promise(this.pool, cmdText, cmdParams);
    }

    // 用户登录
    userLogin(data) {
        let cmdText = `SELECT password,salt,id FROM yidian_user  WHERE username = ? `,
            cmdParams = [data.userName];
        return util.flyer.return_promise(this.pool, cmdText, cmdParams);
    }
}


module.exports = User;