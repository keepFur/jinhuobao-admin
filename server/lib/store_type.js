const DB = require('../db/index')
class StoreType {
  createStoreType (req, res) {
    DB.storeType.createStoreType(req.body).then(() => {
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

  readStoreTypeList (req, res) {
    DB.storeType.readStoreTypeList(req.query).then(resData => {
      DB.storeType.readStoreTypeListTotal(req.query).then(total => {
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

  readStoreTypeById (req, res) {
    DB.storeType.readStoreTypeById(req.query).then(resData => {
      res.send({
        ret: 0,
        msg: '',
        storeType: resData
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  updateStoreTypeById (req, res) {
    DB.storeType.updateStoreTypeById(req.body).then(() => {
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

  deleteStoreTypeById (req, res) {
    DB.storeType.deleteStoreTypeById(req.body).then(() => {
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

module.exports = new StoreType()
