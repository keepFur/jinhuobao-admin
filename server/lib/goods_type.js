const DB = require('../db/index')
class GoodsType {
  createGoodsType (req, res) {
    DB.goodsType.createGoodsType(req.body).then(() => {
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

  readGoodsTypeList (req, res) {
    DB.goodsType.readGoodsTypeList(req.query).then(resData => {
      DB.goodsType.readGoodsTypeListTotal(req.query).then(total => {
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

  readGoodsTypeById (req, res) {
    DB.goodsType.readGoodsTypeById(req.query).then(resData => {
      res.send({
        ret: 0,
        msg: '',
        goodsType: resData
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  updateGoodsTypeById (req, res) {
    DB.goodsType.updateGoodsTypeById(req.body).then(() => {
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

  deleteGoodsTypeById (req, res) {
    DB.goodsType.deleteGoodsTypeById(req.body).then(() => {
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

module.exports = new GoodsType()
