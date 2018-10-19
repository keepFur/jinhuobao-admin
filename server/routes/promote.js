const express = require('express')
const router = express.Router()
const promote = require('../lib/promote')
const util = require('../db/util')
// 新增推广活动
router.post('/create_promote', function (req, res, next) {
  try {
    promote.createPromote(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取推广活动,支持分页
router.get('/read_promote_list', function (req, res, next) {
  try {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    promote.readPromoteList(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取推广活动，根据id
router.get('/read_promote_by_id', function (req, res, next) {
  try {
    promote.readPromoteById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 修改推广活动,根据id
router.post('/update_promote_by_id', function (req, res, next) {
  try {
    promote.updatePromoteById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 删除推广活动，根据id，逻辑删除
router.post('/delete_promote_by_id', function (req, res, next) {
  try {
    promote.deletePromoteById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

module.exports = router
