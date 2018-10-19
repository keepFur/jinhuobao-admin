const util = require('./util')
module.exports = class Order {
  constructor (pool) {
    this.pool = pool
  }
  createOrder (body) {
    let cmdText = `INSERT INTO jinhuobao_admin_order (num,store,arrived_date,goods,count,status,paymethod,pay_serial_num,total_price,discount_price,actual_price,run_price,remark,create_date) 
                      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    let cmdParams = []
    cmdParams.push(body.num)
    cmdParams.push(body.store)
    cmdParams.push(body.arrivedDate)
    cmdParams.push(body.goods)
    cmdParams.push(body.count)
    cmdParams.push(body.status)
    cmdParams.push(body.paymethod)
    cmdParams.push(body.paySerialNum)
    cmdParams.push(body.totalPrice)
    cmdParams.push(body.discountPrice)
    cmdParams.push(body.actualPrice)
    cmdParams.push(body.runPrice)
    cmdParams.push(body.remark)
    cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'))
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readOrderList (query) {
    let limit = Number(query.limit || 20)
    let offset = Number(query.offset - 1) * limit
    let cmdText = `SELECT id,num,store,arrived_date,goods,count,status,paymethod,pay_serial_num,total_price,discount_price,actual_price,run_price,remark,star, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_order  WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (num LIKE '%${query.keyword}%' OR remark LIKE '%${query.keyword}%')`
    }
    if (query.paymethod) {
      cmdText += ` AND paymethod = ?`
      cmdParams.push(query.paymethod)
    }
    if (query.star) {
      cmdText += ` AND star = ?`
      cmdParams.push(query.star)
    }
    if (query.status) {
      cmdText += ` AND status = ?`
      cmdParams.push(query.status)
    }
    if (query.dataStatus) {
      cmdText += ` AND data_status = ?`
      cmdParams.push(query.dataStatus)
    }
    cmdText += ` ORDER BY create_date DESC LIMIT ?,?`
    cmdParams.push(offset, limit)
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readOrderListTotal (query) {
    let cmdText = `SELECT COUNT(id) as total FROM jinhuobao_admin_order WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (num LIKE '%${query.keyword}%' OR remark LIKE '%${query.keyword}%')`
    }
    if (query.paymethod) {
      cmdText += ` AND paymethod = ?`
      cmdParams.push(query.paymethod)
    }
    if (query.star) {
      cmdText += ` AND star = ?`
      cmdParams.push(query.star)
    }
    if (query.status) {
      cmdText += ` AND status = ?`
      cmdParams.push(query.status)
    }
    if (query.dataStatus) {
      cmdText += ` AND data_status = ?`
      cmdParams.push(query.dataStatus)
    }
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readOrderById (query) {
    let cmdText = `SELECT id,num,store,arrived_date,goods,count,status,paymethod,pay_serial_num,total_price,discount_price,actual_price,run_price,remark,star, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_order  WHERE  id = ?`
    let cmdParams = [Number(query.id)]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  updateOrderById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_order SET `
    let cmdParams = []
    if (body.count) {
      cmdText += `, count = ?`
      cmdParams.push(body.count)
    }
    if (body.star) {
      cmdText += `, star = ?`
      cmdParams.push(body.star)
    }
    cmdText += `,update_date = ?`
    cmdParams.push(new Date())
    cmdText += ` WHERE id = ?`
    cmdParams.push(body.id)
    cmdText = cmdText.replace(/SET ,/ig, 'SET ')
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  deleteOrderById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_order SET data_status = ? WHERE id = ? `
    let cmdParams = [body.dataStatus, body.id]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }
}
