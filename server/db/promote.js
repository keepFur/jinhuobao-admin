const util = require('./util')
module.exports = class Promote {
  constructor (pool) {
    this.pool = pool
  }
  createPromote (body) {
    let cmdText = `INSERT INTO jinhuobao_admin_promote (name,content,budget,range,remark,create_date) VALUES (?,?,?,?,?,?)`
    let cmdParams = []
    cmdParams.push(body.name)
    cmdParams.push(body.content)
    cmdParams.push(body.budget)
    cmdParams.push(body.range)
    cmdParams.push(body.remark)
    cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'))
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readPromoteList (query) {
    let limit = Number(query.limit || 20)
    let offset = Number(query.offset - 1) * limit
    let cmdText = `SELECT id,name,content,budget,range, remark, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_promote  WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR content LIKE '%${query.keyword}%')`
    }
    if (query.dataStatus) {
      cmdText += ` AND data_status = ?`
      cmdParams.push(query.dataStatus)
    }
    cmdText += ` ORDER BY create_date DESC LIMIT ?,?`
    cmdParams.push(offset, limit)
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readPromoteListTotal (query) {
    let cmdText = `SELECT COUNT(id) as total FROM jinhuobao_admin_promote WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR content LIKE '%${query.keyword}%')`
    }
    if (query.dataStatus) {
      cmdText += ` AND data_status = ?`
      cmdParams.push(query.dataStatus)
    }
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readPromoteById (query) {
    let cmdText = `SELECT id,name,content,budget, range, remark, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_promote  WHERE id = ?`
    let cmdParams = [Number(query.id)]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  updatePromoteById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_promote SET `
    let cmdParams = []
    if (body.name) {
      cmdText += `, name = ?`
      cmdParams.push(body.name)
    }
    if (body.content) {
      cmdText += `, content = ?`
      cmdParams.push(body.content)
    }
    if (body.budget) {
      cmdText += `, budget = ?`
      cmdParams.push(body.budget)
    }
    if (body.remark) {
      cmdText += `, remark = ?`
      cmdParams.push(body.remark)
    }
    cmdText += `,update_date = ?`
    cmdParams.push(new Date())
    cmdText += ` WHERE id = ?`
    cmdParams.push(body.id)
    cmdText = cmdText.replace(/SET ,/ig, 'SET ')
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  deletePromoteById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_promote SET data_status = ? WHERE id = ? `
    let cmdParams = [body.dataStatus, body.id]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }
}
