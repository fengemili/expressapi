const validate = require('../middleware/validate')
const { body, param,validationResult } = require('express-validator');
const { Article } = require('../model')

exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('文章标题不能为空'),
    body('article.body').notEmpty().withMessage('文章内容不能为空'),
    body('article.tag').notEmpty().withMessage('标签不能为空')
])

exports.getTheArticle = validate([

    validate.isValidObjectId(['params'],'articleId'),

    // param('articleId').custom(async value =>{
    //     if(!mongoose.isValidObjectId(value)){
    //         return Promise.reject('文章ID类型错误')

    //         //同步
    //         // throw new Error('文章ID类型错误')
    //     }
    //     // return true
    // })
])


//更新文章
exports.updateArticle = [
    //校验是否一个有效的id
    validate([
    validate.isValidObjectId(['params'],'articleId'),
    ]),

    //校验文章是否存在
    async (req,res,next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        console.log(article);
        req.article = article
        if(!article) {
            return res.status(404).end('文章不存在')
        }
        next()
    },

    //校验文章是否是该作者
    async (req, res, next) => {
        if(req.user._id.toString() !== req.article.author.toString()){
            return res.status(403).end()
        }
        next()
    }
]

//校验文章是否存在
// 修改的文章是否是当前登陆用户

exports.deleteArticle = exports.updateArticle