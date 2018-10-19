const DB = require('../db/index')
class Group {
  createGroup (req, res) {
    DB.discount.createGroup(req.body).then(() => {
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

  readGroupList (req, res) {
    DB.discount.readGroupList(req.query).then(resData => {
      DB.discount.readGroupListTotal(req.query).then(total => {
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

  readGroupById (req, res) {
    DB.discount.readGroupById(req.query).then(resData => {
      res.send({
        ret: 0,
        msg: '',
        discount: resData
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  updateGroupById (req, res) {
    DB.discount.updateGroupById(req.body).then(() => {
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

  deleteGroupById (req, res) {
    DB.discount.deleteGroupById(req.body).then(() => {
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

module.exports = new Group()
