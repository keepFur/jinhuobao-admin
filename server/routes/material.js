const express = require('express');
var multer = require('multer');
var upload = multer().single('material');
const router = express.Router();
const material = require('../lib/material');
const util = require('../db/util');
// 创建素材
router.post('/create_material', multer().single('material'), function (req, res, next) {
    try {
        material.createMaterial(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 读取素材,支持分页
router.get('/read_material_list', function (req, res, next) {
    try {
        material.readMaterialList(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 读取素材，根据id
router.get('/read_material_by_id', function (req, res, next) {
    try {
        material.readMaterialById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 修改素材,根据id
router.post('/update_material_by_id', function (req, res, next) {
    try {
        material.updateMaterialById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

// 删除素材，根据id，逻辑删除
router.post('/delete_material_by_id', function (req, res, next) {
    try {
        material.deleteMaterialById(req, res);
    } catch (error) {
        util.log(error.message);
    }
});

module.exports = router;
