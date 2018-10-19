const util = require('./util')
module.exports = class Todo {
  constructor (pool) {
    this.pool = pool
  }
  createTodo (body) {
    let cmdText = `INSERT INTO jinhuobao_admin_todo (name,content,type,create_date) VALUES (?,?,?,?)`
    let cmdParams = []
    cmdParams.push(body.name)
    cmdParams.push(body.content)
    cmdParams.push(body.type)
    cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'))
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readTodoList (query) {
    let limit = Number(query.limit || 20)
    let offset = Number(query.offset - 1) * limit
    let cmdText = `SELECT id,name,type,data_status AS dataStatus, content,create_date AS createDate FROM jinhuobao_admin_todo WHERE 1=1`
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR content LIKE '%${query.keyword}%')`
    }
    if (query.type) {
      cmdText += ` AND type = ?`
      cmdParams.push(query.type)
    }
    cmdText += ` ORDER BY create_date DESC LIMIT ?,?`
    cmdParams.push(offset, limit)
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readTodoListTotal (query) {
    let cmdText = `SELECT COUNT(id) as total FROM jinhuobao_admin_todo WHERE 1=1 `
    let cmdParams = []
    if (query.keyword) {
      cmdText += ` AND (name LIKE '%${query.keyword}%' OR content LIKE '%${query.keyword}%')`
    }
    if (query.type) {
      cmdText += ` AND type = ?`
      cmdParams.push(query.type)
    }
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  readTodoById (query) {
    let cmdText = `SELECT id,name,type,data_status AS dataStatus, content,create_date AS createDate FROM jinhuobao_admin_todo WHERE id = ?`
    let cmdParams = [Number(query.id)]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  updateTodoById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_todo SET `
    let cmdParams = []
    if (body.name) {
      cmdText += `, name = ?`
      cmdParams.push(body.name)
    }
    if (body.type) {
      cmdText += `, type = ?`
      cmdParams.push(body.type)
    }
    if (body.content) {
      cmdText += `, content = ?`
      cmdParams.push(body.content)
    }
    cmdText += ` WHERE id = ?`
    cmdParams.push(body.id)
    cmdText = cmdText.replace(/SET ,/ig, 'SET ')
    return util.return_promise(this.pool, cmdText, cmdParams)
  }

  deleteTodoById (body) {
    let cmdText = `UPDATE  jinhuobao_admin_todo SET data_status = ? WHERE id = ? `
    let cmdParams = [body.dataStatus, body.id]
    return util.return_promise(this.pool, cmdText, cmdParams)
  }
}
