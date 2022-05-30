const express = require("express");
const router = express.Router()
const userCtrl = require("../controller/rooter")
const userValidator = require("../validator/rooter")
const auth = require("../middleware/auth")
const authrooter = require("../middleware/auth-rooter")



//管理员登陆
router.post('/login', userValidator.login, userCtrl.login)

//管理员注册
router.post('/register',  userCtrl.register)//3. 通过验证，执行具体的控制器处理 
// router.get('/root', auth, userCtrl.getCurrentUser)

//更新用户
// router.put('/root/rootInfo', auth, userValidator.updataUser, userCtrl.updateCurrentUser)

//获取当前登陆管理員
router.get('/rootuserinfo', authrooter, userCtrl.getCurrentRoot)

//获取用户列表
router.get('/getUserList', authrooter, userCtrl.getUserList)

//改变用户发言状态
router.post('/changState', authrooter, userCtrl.changeState)

//管理员模糊搜索用户
router.get('/searchUserList', authrooter, userCtrl.searchUserList)

//管理员模糊搜索文章
router.get('/searchArticles', authrooter, userCtrl.searchArticles)

//管理员模糊搜索视频
router.get('/searchVideo', authrooter, userCtrl.searchVideos)

//管理员删除帖子
router.delete('/deletepost/:postId', authrooter, userCtrl.deletePost)

//管理员删除视频
router.delete('/deletevideo/:videoId', authrooter, userCtrl.deleteVideo)

//管理员删除回复
router.delete('/deletereply/:replyId', authrooter, userCtrl.deleteComment)

//管理员删除视频留言
router.delete('/deletemessage/:messageId', authrooter, userCtrl.deleteMessage)

//模糊搜索文章
router.get('/user/searchArticles',  userCtrl.searchArticles)

//模糊搜索视频
router.get('/user/searchVideo',  userCtrl.searchVideos)



module.exports = router;