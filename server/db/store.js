const util = require('./util')
module.exports = class Store {
  constructor (pool) {
    this.pool = pool
  }
  createStore (body) {
    let cmdText = `INSERT INTO jinhuobao_admin_store (name,phone,boss,address,type,remark,create_date) VALUES (?,?,?,?,?,?,?)`
    let cmdParams = []
    cmdParams.push(body.name)
    cmdParams.push(body.phone)
    cmdParams.push(body.boss)
    cmdParams.push(body.address)
    cmdParams.push(body.type)
    cmdParams.push(body.remark)
    cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'))
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readStoreList (query) {
    let limit = Number(query.limit || 20)
    let offset = Number(query.offset - 1) * limit
    let cmdText = `SELECT id,name,phone,boss,address,type,remark, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_store  WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR boss LIKE '%${query.keyword}%' OR phone LIKE '%${query.keyword}%' OR address LIKE '%${query.keyword}%')`
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

  readStoreListTotal (query) {
    let cmdText = `SELECT COUNT(id) as total FROM jinhuobao_admin_store WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR boss LIKE '%${query.keyword}%' OR phone LIKE '%${query.keyword}%' OR address LIKE '%${query.keyword}%')`
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

  readStoreById (query) {
    let cmdText = `SELECT id,name,phone,boss,address,type,remark, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_store  WHERE id = ?`
    let cmdParams = [Number(query.id)]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  updateStoreById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_store SET `
    let cmdParams = []
    if (body.name) {
      cmdText += `, name = ?`
      cmdParams.push(body.name)
    }
    if (body.phone) {
      cmdText += `, phone = ?`
      cmdParams.push(body.phone)
    }
    if (body.boss) {
      cmdText += `, boss = ?`
      cmdParams.push(body.boss)
    }
    if (body.address) {
      cmdText += `, address = ?`
      cmdParams.push(body.address)
    }
    if (body.type) {
      cmdText += `, type = ?`
      cmdParams.push(body.type)
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

  deleteStoreById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_store SET data_status = ? WHERE id = ? `
    let cmdParams = [body.dataStatus, body.id]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }
}
