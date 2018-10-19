const express = require('express')
const router = express.Router()
const discount = require('../lib/discount')
const util = require('../db/util')
// 新增优惠券
router.post('/create_discount', function (req, res, next) {
  try {
    discount.createDiscount(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取优惠券,支持分页
router.get('/read_discount_list', function (req, res, next) {
  try {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    discount.readDiscountList(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取优惠券，根据id
router.get('/read_discount_by_id', function (req, res, next) {
  try {
    discount.readDiscountById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 修改优惠券,根据id
router.post('/update_discount_by_id', function (req, res, next) {
  try {
    discount.updateDiscountById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 删除优惠券，根据id，逻辑删除
router.post('/delete_discount_by_id', function (req, res, next) {
  try {
    discount.deleteDiscountById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

module.exports = router
