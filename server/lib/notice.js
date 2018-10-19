const DB = require('../db/index')
class Notice {
  createNotice (req, res) {
    DB.notice.createNotice(req.body).then(() => {
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

  readNoticeList (req, res) {
    DB.notice.readNoticeList(req.query).then(resData => {
      DB.notice.readNoticeListTotal(req.query).then(total => {
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

  readNoticeById (req, res) {
    DB.notice.readNoticeById(req.query).then(resData => {
      res.send({
        ret: 0,
        msg: '',
        notice: resData
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  updateNoticeById (req, res) {
    DB.notice.updateNoticeById(req.body).then(() => {
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

  deleteNoticeById (req, res) {
    DB.notice.deleteNoticeById(req.body).then(() => {
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

module.exports = new Notice()
