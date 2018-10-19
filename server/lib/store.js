const DB = require('../db/index')
class Store {
  createStore (req, res) {
    DB.store.createStore(req.body).then(() => {
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

  readStoreList (req, res) {
    DB.store.readStoreList(req.query).then(resData => {
      DB.store.readStoreListTotal(req.query).then(total => {
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

  readStoreById (req, res) {
    DB.store.readStoreById(req.query).then(resData => {
      res.send({
        ret: 0,
        msg: '',
        store: resData
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  updateStoreById (req, res) {
    DB.store.updateStoreById(req.body).then(() => {
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

  deleteStoreById (req, res) {
    DB.store.deleteStoreById(req.body).then(() => {
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

module.exports = new Store()
