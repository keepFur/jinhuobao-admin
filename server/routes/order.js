const express = require('express')
const router = express.Router()
const order = require('../lib/order')
const util = require('../db/util')
// 新增订单
router.post('/create_order', function (req, res, next) {
  try {
    order.createOrder(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取订单,支持分页
router.get('/read_order_list', function (req, res, next) {
  try {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    order.readOrderList(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取订单，根据id
router.get('/read_order_by_id', function (req, res, next) {
  try {
    order.readOrderById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 修改订单,根据id
router.post('/update_order_by_id', function (req, res, next) {
  try {
    order.updateOrderById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 删除订单，根据id，逻辑删除
router.post('/delete_order_by_id', function (req, res, next) {
  try {
    order.deleteOrderById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

module.exports = router
