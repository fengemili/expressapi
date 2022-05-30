const express = require("express");
const router = express.Router()
const auth = require("../middleware/auth")
const commentCtrl = require("../controller/message")

//发布视频留言
router.post('/sendmessage', auth, commentCtrl.sendMessage)

//获取某个视频的留言
router.get('/getMessageList/:id', commentCtrl.getMessageList)

//用户删除某个视频的留言
router.delete('/deleteMessage/:id', auth, commentCtrl.deleteMessage)

module.exports = router;