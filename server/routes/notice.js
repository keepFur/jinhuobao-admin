const express = require('express')
const router = express.Router()
const notice = require('../lib/notice')
const util = require('../db/util')
// 新增通知
router.post('/create_notice', function (req, res, next) {
  try {
    notice.createNotice(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取通知,支持分页
router.get('/read_notice_list', function (req, res, next) {
  try {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    notice.readNoticeList(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 读取通知，根据id
router.get('/read_notice_by_id', function (req, res, next) {
  try {
    notice.readNoticeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 修改通知,根据id
router.post('/update_notice_by_id', function (req, res, next) {
  try {
    notice.updateNoticeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

// 删除通知，根据id，逻辑删除
router.post('/delete_notice_by_id', function (req, res, next) {
  try {
    notice.deleteNoticeById(req, res)
  } catch (error) {
    util.log(error.message)
  }
})

module.exports = router
