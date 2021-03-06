const util = require('./util')
module.exports = class StoreType {
  constructor (pool) {
    this.pool = pool
  }
  createStoreType (body) {
    let cmdText = `INSERT INTO jinhuobao_admin_store_type (name,remark,create_date) VALUES (?,?,?)`
    let cmdParams = []
    cmdParams.push(body.name)
    cmdParams.push(body.remark)
    cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'))
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readStoreTypeList (query) {
    let limit = Number(query.limit || 20)
    let offset = Number(query.offset - 1) * limit
    let cmdText = `SELECT id,name,remark,create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_store_type  WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR remark LIKE '%${query.keyword}%')`
    }
    if (query.dataStatus) {
      cmdText += ` AND data_status = ?`
      cmdParams.push(query.dataStatus)
    }
    cmdText += ` ORDER BY create_date DESC LIMIT ?,?`
    cmdParams.push(offset, limit)
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readStoreTypeListTotal (query) {
    let cmdText = `SELECT COUNT(id) as total FROM jinhuobao_admin_store_type WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR remark LIKE '%${query.keyword}%')`
    }
    if (query.dataStatus) {
      cmdText += ` AND data_status = ?`
      cmdParams.push(query.dataStatus)
    }
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readStoreTypeById (query) {
    let cmdText = `SELECT id,name,remark,create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_store_type WHERE id = ?`
    let cmdParams = [Number(query.id)]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  updateStoreTypeById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_store_type SET `
    let cmdParams = []
    if (body.name) {
      cmdText += `, name = ?`
      cmdParams.push(body.name)
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

  deleteStoreTypeById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_store_type SET data_status = ? WHERE id = ? `
    let cmdParams = [body.dataStatus, body.id]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }
}
