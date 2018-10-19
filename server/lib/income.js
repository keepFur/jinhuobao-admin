const DB = require('../db/index')
class Income {
  createIncome (req, res) {
    DB.income.createIncome(req.body).then(() => {
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

  readIncomeList (req, res) {
    DB.income.readIncomeList(req.query).then(resData => {
      DB.income.readIncomeListTotal(req.query).then(total => {
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

  readIncomeById (req, res) {
    DB.income.readIncomeById(req.query).then(resData => {
      res.send({
        ret: 0,
        msg: '',
        income: resData
      })
    }).catch(err => {
      res.send({
        ret: 1,
        msg: err.message
      })
    })
  }

  updateIncomeById (req, res) {
    DB.income.updateIncomeById(req.body).then(() => {
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

  deleteIncomeById (req, res) {
    DB.income.deleteIncomeById(req.body).then(() => {
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

module.exports = new Income()
