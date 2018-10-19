const util = require('./util')
module.exports = class Goods {
  constructor (pool) {
    this.pool = pool
  }
  createGoods (body) {
    let cmdText = `INSERT INTO jinhuobao_admin_goods (name,type,out_price,in_price,count,picture,desc,remark,create_date) VALUES (?,?,?,?,?,?,?,?,?)`
    let cmdParams = []
    cmdParams.push(body.name)
    cmdParams.push(body.type)
    cmdParams.push(body.outPrice)
    cmdParams.push(body.inPrice)
    cmdParams.push(body.count)
    cmdParams.push(body.picture)
    cmdParams.push(body.desc)
    cmdParams.push(body.remark)
    cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'))
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readGoodsList (query) {
    let limit = Number(query.limit || 20)
    let offset = Number(query.offset - 1) * limit
    let cmdText = `SELECT id,name,type,in_price,out_price,count,picture,desc, remark, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_goods  WHERE 1=1`
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

  readGoodsListTotal (query) {
    let cmdText = `SELECT COUNT(id) as total FROM jinhuobao_admin_goods WHERE 1=1`
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

  readGoodsById (query) {
    let cmdText = `SELECT id,name,type,in_price,out_price,count,picture,desc, remark, data_status AS dataStatus, create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_goods  WHERE  id = ?`
    let cmdParams = [Number(query.id)]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  updateGoodsById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_goods SET `
    let cmdParams = []
    if (body.name) {
      cmdText += `, name = ?`
      cmdParams.push(body.name)
    }
    if (body.type) {
      cmdText += `, type = ?`
      cmdParams.push(body.type)
    }
    if (body.inPrice) {
      cmdText += `, in_price = ?`
      cmdParams.push(body.inPrice)
    }
    if (body.outPrice) {
      cmdText += `, out_price = ?`
      cmdParams.push(body.outPrice)
    }
    if (body.count) {
      cmdText += `, count = ?`
      cmdParams.push(body.count)
    }
    if (body.desc) {
      cmdText += `, desc = ?`
      cmdParams.push(body.desc)
    }
    if (body.picture) {
      cmdText += `, picture = ?`
      cmdParams.push(body.picture)
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

  deleteGoodsById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_goods SET data_status = ? WHERE id = ? `
    let cmdParams = [body.dataStatus, body.id]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }
}
