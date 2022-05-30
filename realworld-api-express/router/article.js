const express = require("express");
const router = express.Router()
const articlesCtrl = require("../controller/article")
const auth = require("../middleware/auth")
const authrooter = require("../middleware/auth-rooter")
const articleValidator = require("../validator/article")
const multer = require("multer")





//获取文章列表
router.get('/', articlesCtrl.testArticleList)

//获取用户自己的文章列表
router.get('/mypostList/:authorId', auth, articlesCtrl.getMypostList)

//获取文章
router.get('/:articleId', articleValidator.getTheArticle, articlesCtrl.getTheArticle)

//创建文章
router.post('/', auth, articleValidator.createArticle, articlesCtrl.createArticle)

//管理员创建文章
router.post('/rootArticle', authrooter, multer({ dest: './public/uploads' }).array('imageList',9), articlesCtrl.rooterSendArticles)

//更新文章
router.put('/:articleId', auth, articleValidator.updateArticle, articlesCtrl.updateArticle)

//删除文章
router.delete('/deletearticle/:articleId', auth, articlesCtrl.deleteArticle)


//添加文章评论
router.post('/:articleId/comments', articlesCtrl.addCommentforArticle)





module.exports = router;