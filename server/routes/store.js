const express = require('express')
const router = express.Router()
const store = require('../lib/store')
const util = require('../db/util')
// 新增商家
router.post('/create_store', function (req, res, next) {
  try {
    store.createStore(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取商家,支持分页
router.get('/read_store_list', function (req, res, next) {
  try {
    store.readStoreList(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取商家，根据id
router.get('/read_store_by_id', function (req, res, next) {
  try {
    store.readStoreById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 修改商家,根据id
router.post('/update_store_by_id', function (req, res, next) {
  try {
    store.updateStoreById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 删除商家，根据id，逻辑删除
router.post('/delete_store_by_id', function (req, res, next) {
  try {
    store.deleteStoreById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

module.exports = router
