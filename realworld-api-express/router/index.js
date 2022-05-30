const express = require("express");
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())


//用户相关路由
router.use(require("./user"))

//文章相关路由
router.use('/profile',require("./profile"))

//tag相关
router.use(require("./tag"))

//article相关
router.use('/articles',require("./article"))

//comment相关
router.use('/comments',require("./comments"))

//router相关
router.use('/rooter',require("./rooter"))

//video相关
router.use('/video',require("./video"))

//message(视频留言相关)
router.use('/message',require("./message"))

//上传图片文件
router.use(require("./upload"))

//上传头像
router.use(require("./uploadAvart"))

module.exports = router;