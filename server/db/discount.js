const util = require('./util')
module.exports = class Discount {
  constructor (pool) {
    this.pool = pool
  }
  createDiscount (body) {
    let cmdText = `INSERT INTO jinhuobao_admin_discount (name,content,total_price,discount_price,range,total_count,remark,create_date) VALUES (?,?,?,?,?,?,?,?)`
    let cmdParams = []
    cmdParams.push(body.name)
    cmdParams.push(body.content)
    cmdParams.push(body.totalPrice)
    cmdParams.push(body.discountPrice)
    cmdParams.push(body.range)
    cmdParams.push(body.totalCount)
    cmdParams.push(body.remark)
    cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'))
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readDiscountList (query) {
    let limit = Number(query.limit || 20)
    let offset = Number(query.offset - 1) * limit
    let cmdText = `SELECT id,name,content,total_price AS totalPrice,discount_price AS discount_price,range, total_count AS totalCount, remark, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_discount  WHERE 1=1`
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

  readDiscountListTotal (query) {
    let cmdText = `SELECT COUNT(id) as total FROM jinhuobao_admin_discount WHERE 1=1`
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

  readDiscountById (query) {
    let cmdText = `SELECT id,name,content,total_price AS totalPrice,discount_price AS discount_price,range, total_count AS totalCount, remark, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_discount  WHERE id = ?`
    let cmdParams = [Number(query.id)]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  updateDiscountById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_discount SET `
    let cmdParams = []
    if (body.name) {
      cmdText += `, name = ?`
      cmdParams.push(body.name)
    }
    if (body.content) {
      cmdText += `, content = ?`
      cmdParams.push(body.content)
    }
    if (body.totalPrice) {
      cmdText += `, total_price = ?`
      cmdParams.push(body.totalPrice)
    }
    if (body.discountPrice) {
      cmdText += `, discount_price = ?`
      cmdParams.push(body.discountPrice)
    }
    if (body.totalCount) {
      cmdText += `, total_count = ?`
      cmdParams.push(body.totalCount)
    }
    if (body.useCount) {
      cmdText += `, use_count = ?`
      cmdParams.push(body.useCount)
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

  deleteDiscountById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_discount SET data_status = ? WHERE id = ? `
    let cmdParams = [body.dataStatus, body.id]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }
}
