const express = require('express')
const router = express.Router()
const storeType = require('../lib/store_type')
const util = require('../db/util')
// 新增商家类型
router.post('/create_store_type', function (req, res, next) {
  try {
    storeType.createStoreType(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取商家类型,支持分页
router.get('/read_store_type_list', function (req, res, next) {
  try {
    storeType.readStoreTypeList(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取商家类型，根据id
router.get('/read_store_type_by_id', function (req, res, next) {
  try {
    storeType.readStoreTypeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 修改商家类型,根据id
router.post('/update_store_type_by_id', function (req, res, next) {
  try {
    storeType.updateStoreTypeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 删除商家类型，根据id，逻辑删除
router.post('/delete_store_type_by_id', function (req, res, next) {
  try {
    storeType.deleteStoreTypeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

module.exports = router
