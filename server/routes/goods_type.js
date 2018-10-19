const express = require('express')
const router = express.Router()
const goodsType = require('../lib/goods_type')
const util = require('../db/util')
// 新增商品类型
router.post('/create_goods_type', function (req, res, next) {
  try {
    goodsType.createGoodsType(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取商品类型,支持分页
router.get('/read_goods_type_list', function (req, res, next) {
  try {
    goodsType.readGoodsTypeList(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取商品类型，根据id
router.get('/read_goods_type_by_id', function (req, res, next) {
  try {
    goodsType.readGoodsTypeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 修改商品类型,根据id
router.post('/update_goods_type_by_id', function (req, res, next) {
  try {
    goodsType.updateGoodsTypeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 删除商品类型，根据id，逻辑删除
router.post('/delete_goods_type_by_id', function (req, res, next) {
  try {
    goodsType.deleteGoodsTypeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

module.exports = router
