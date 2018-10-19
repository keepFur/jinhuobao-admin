const DB = require('../db/index')
class Goods {
  createGoods (req, res) {
    DB.goods.createGoods(req.body).then(() => {
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

  readGoodsList (req, res) {
    DB.goods.readGoodsList(req.query).then(resData => {
      DB.goods.readGoodsListTotal(req.query).then(total => {
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

  readGoodsById (req, res) {
    DB.goods.readGoodsById(req.query).then(resData => {
      res.send({
        ret: 0,
        msg: '',
        goods: resData
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  updateGoodsById (req, res) {
    DB.goods.updateGoodsById(req.body).then(() => {
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

  deleteGoodsById (req, res) {
    DB.goods.deleteGoodsById(req.body).then(() => {
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

module.exports = new Goods()
