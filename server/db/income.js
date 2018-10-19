const util = require('./util')
module.exports = class Income {
  constructor (pool) {
    this.pool = pool
  }
  createIncome (body) {
    let cmdText = `INSERT INTO jinhuobao_admin_income (name,type,amount,remark,create_date) VALUES (?,?,?,?,?)`
    let cmdParams = []
    cmdParams.push(body.name)
    cmdParams.push(body.type)
    cmdParams.push(body.amount)
    cmdParams.push(body.remark)
    cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'))
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readIncomeList (query) {
    let limit = Number(query.limit || 20)
    let offset = Number(query.offset - 1) * limit
    let cmdText = `SELECT id,name,type,amount, remark, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_income  WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR remark LIKE '%${query.keyword}%')`
    }
    if (query.type) {
      cmdText += ` AND type = ?`
      cmdParams.push(query.type)
    }
    if (query.dataStatus) {
      cmdText += ` AND data_status = ?`
      cmdParams.push(query.dataStatus)
    }
    cmdText += ` ORDER BY create_date DESC LIMIT ?,?`
    cmdParams.push(offset, limit)
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readIncomeListTotal (query) {
    let cmdText = `SELECT COUNT(id) as total FROM jinhuobao_admin_income WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR remark LIKE '%${query.keyword}%')`
    }
    if (query.type) {
      cmdText += ` AND type = ?`
      cmdParams.push(query.type)
    }
    if (query.dataStatus) {
      cmdText += ` AND data_status = ?`
      cmdParams.push(query.dataStatus)
    }
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readIncomeById (query) {
    let cmdText = `SELECT id,name,type,amount, remark, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_income  WHERE id = ?`
    let cmdParams = [Number(query.id)]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  updateIncomeById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_income SET `
    let cmdParams = []
    if (body.name) {
      cmdText += `, name = ?`
      cmdParams.push(body.name)
    }
    if (body.type) {
      cmdText += `, type = ?`
      cmdParams.push(body.type)
    }
    if (body.amount) {
      cmdText += `, amount = ?`
      cmdParams.push(body.amount)
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

  deleteIncomeById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_income SET data_status = ? WHERE id = ? `
    let cmdParams = [body.dataStatus, body.id]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }
}
