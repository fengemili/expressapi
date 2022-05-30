const express = require("express");
const router = express.Router()
const authrooter = require("../middleware/auth-rooter");
const videoCtrl = require('../controller/video')
const { Rooter } = require("../model");
const multer = require("multer")

//管理员上传视频
router.post('/uploadVideo', authrooter, multer({ dest: './public/video' }).single('video'), videoCtrl.uploadVideo)

//管理员获取视频列表
router.get('/rootergetVideoList', authrooter, videoCtrl.getVideoList)

//用户获取视频列表
router.get('/getVideoList', videoCtrl.getVideoList)

//用户模糊搜索视频列表
router.get('/searchvideo', videoCtrl.searchvideos)

module.exports = router;