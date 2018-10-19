const DB = require('../db/index')
class Order {
  createOrder (req, res) {
    DB.order.createOrder(req.body).then(() => {
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

  readOrderList (req, res) {
    DB.order.readOrderList(req.query).then(resData => {
      DB.order.readOrderListTotal(req.query).then(total => {
        res.send({
          ret: 0,
          msg: '',
          total: total.total,
          rows: [{
            num: '123123123',
            star: 0,
            store: '之间',
            remark: '没事',
            arrivedDate: '2019-29-20',
            goods: [12, 12, 12],
            count: 10,
            status: 1,
            paymethod: 1,
            paySerialNum: '123123123123',
            totalPrice: 1000,
            discountPrice: 100,
            actualPrice: 900,
            runPrice: 0
          }] || resData
        })
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  readOrderById (req, res) {
    DB.order.readOrderById(req.query).then(resData => {
      res.send({
        ret: 0,
        msg: '',
        order: resData
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  updateOrderById (req, res) {
    DB.order.updateOrderById(req.body).then(() => {
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

  deleteOrderById (req, res) {
    DB.order.deleteOrderById(req.body).then(() => {
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

module.exports = new Order()
