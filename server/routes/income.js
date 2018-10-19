const express = require('express')
const router = express.Router()
const income = require('../lib/income')
const util = require('../db/util')
// 新增收支记录
router.post('/create_income', function (req, res, next) {
  try {
    income.createIncome(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取收支记录,支持分页
router.get('/read_income_list', function (req, res, next) {
  try {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    income.readIncomeList(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取收支记录，根据id
router.get('/read_income_by_id', function (req, res, next) {
  try {
    income.readIncomeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 修改收支记录,根据id
router.post('/update_income_by_id', function (req, res, next) {
  try {
    income.updateIncomeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 删除收支记录，根据id，逻辑删除
router.post('/delete_income_by_id', function (req, res, next) {
  try {
    income.deleteIncomeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

module.exports = router
