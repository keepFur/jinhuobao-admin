const DB = require('../db/index')
class Promote {
  createPromote (req, res) {
    DB.promote.createPromote(req.body).then(() => {
      res.send({
        ret: 0,
        msg: ''
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  readPromoteList (req, res) {
    DB.promote.readPromoteList(req.query).then(resData => {
      DB.promote.readPromoteListTotal(req.query).then(total => {
        res.send({
          ret: 0,
          msg: '',
          total: total.total,
          rows: resData
        })
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  readPromoteById (req, res) {
    DB.promote.readPromoteById(req.query).then(resData => {
      res.send({
        ret: 0,
        msg: '',
        promote: resData
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  updatePromoteById (req, res) {
    DB.promote.updatePromoteById(req.body).then(() => {
      res.send({
        ret: 0,
        msg: ''
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  deletePromoteById (req, res) {
    DB.promote.deletePromoteById(req.body).then(() => {
      res.send({
        ret: 0,
        msg: ''
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }
}

module.exports = new Promote()
