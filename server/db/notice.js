const util = require('./util')
module.exports = class Notice {
  constructor (pool) {
    this.pool = pool
  }
  createNotice (body) {
    let cmdText = `INSERT INTO jinhuobao_admin_notice (name,content,range,remark,create_date) VALUES (?,?,?,?,?)`
    let cmdParams = []
    cmdParams.push(body.name)
    cmdParams.push(body.content)
    cmdParams.push(body.range)
    cmdParams.push(body.remark)
    cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'))
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readNoticeList (query) {
    let limit = Number(query.limit || 20)
    let offset = Number(query.offset - 1) * limit
    let cmdText = `SELECT id,name, content, range, remark,status,data_status AS dataStatus,create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_notice  WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR content LIKE '%${query.keyword}%')`
    }
    cmdText += ` ORDER BY created_date DESC LIMIT ?,?`
    cmdParams.push(offset, limit)
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readNoticeListTotal (query) {
    let cmdText = `SELECT COUNT(id) as total FROM jinhuobao_admin_notice WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR content LIKE '%${query.keyword}%')`
    }
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readNoticeById (query) {
    let cmdText = `SELECT id,name, content, range, remark,status,data_status AS dataStatus,create_date AS createDate,update_date AS updateDate FROM jinhuobao_admin_notice  WHERE id = ?`
    let cmdParams = [Number(query.id)]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  updateNoticeById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_notice SET `
    let cmdParams = []
    if (body.name) {
      cmdText += `, name = ?`
      cmdParams.push(body.name)
    }
    if (body.content) {
      cmdText += `, content = ?`
      cmdParams.push(body.content)
    }
    if (body.range) {
      cmdText += `, range = ?`
      cmdParams.push(body.range)
    }
    cmdText += `,update_date = ?`
    cmdParams.push(new Date())
    cmdText += ` WHERE id = ?`
    cmdParams.push(body.id)
    cmdText = cmdText.replace(/SET ,/ig, 'SET ')
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  deleteNoticeById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_notice SET data_status = ? WHERE id = ? `
    let cmdParams = [body.dataStatus, body.id]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }
}
