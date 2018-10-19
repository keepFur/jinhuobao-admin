const express = require('express')
const router = express.Router()
const goods = require('../lib/goods')
const util = require('../db/util')
// 新增商品
router.post('/create_goods', function (req, res, next) {
  try {
    goods.createGoods(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取商品,支持分页
router.get('/read_goods_list', function (req, res, next) {
  try {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    goods.readGoodsList(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取商品，根据id
router.get('/read_goods_by_id', function (req, res, next) {
  try {
    goods.readGoodsById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 修改商品,根据id
router.post('/update_goods_by_id', function (req, res, next) {
  try {
    goods.updateGoodsById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 删除商品，根据id，逻辑删除
router.post('/delete_goods_by_id', function (req, res, next) {
  try {
    goods.deleteGoodsById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

module.exports = router
