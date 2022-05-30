const express = require("express");
const router = express.Router()
const auth = require("../middleware/auth")
const commentCtrl = require("../controller/comments")

//发布帖子评论
router.post('/post/send', auth, commentCtrl.sendReply)

//获取某个帖子的评论
router.get('/post/:id', commentCtrl.getReplyList)

//删除某个评论
router.delete('/deletecomment/:replyId',commentCtrl.deleteComment)

module.exports = router;