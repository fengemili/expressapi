const fs = require("fs")
const {Article, User, Comments} = require('../model')
const path = require("path")
const PORT = process.env.PORT || 80

//文章

//获取文章列表
exports.getArticleList = async (req, res, next) => {
    try {
        const { limit,
                offset, 
                tag,
                author
            } = req.query

        const filter = {}

        if(tag){
            // tag = req.tag
            console.log(tag,555);
            filter.tag = tag
        }

        if(author) {
            const user = await User.findOne({username:author})
            filter.author = user ? user._id : null
        }

        const articles = await Article.find(filter).populate('author').populate('rooter')
        .skip(Number.parseInt(offset))  //跳过多少条
        .limit(Number.parseInt(limit))  //取多少条
        .sort({
            //-1 倒叙  1升序
            createdAt:-1
        })
        // console.log(articles);
        // const articleCount = await Article.countDocuments()
        res.status(200).json({
            articles,
            articleCount:articles.length,
        })
    } catch (error) {
        next(error);
    }
}


//获取喜欢作者的文章列表
exports.getFeedArticle = async (req, res, next) => {
    try {
        //处理请求
        res.send('get /articles/feed')
    } catch (error) {
        next(error);
    }
}

//查询某一篇文章
exports.getTheArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId).populate('author').populate('rooter')
        if(!article) {
            return res.status(404).end()
        }
        res.status(200).json({article})
    } catch (error) {
        next(error);
    }
}

//创建一篇文章
exports.createArticle = async (req, res, next) => {
    try {
        console.log(req.body.article);
        const article = await new Article(req.body.article)
        article.author = req.user._id
        //设置外键
        article.populate('author').execPopulate((err,docs)=>{
            console.log(docs,555);
        })
        
        await article.save()
        res.status(201).json({article})
    } catch (error) {
        next(error);
    }
}

//管理员发布帖子
exports.rooterSendArticles = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.files);
        const article = await new Article(req.body)
        req.files.forEach(item => {
            let oldname = item.path
            let newname = item.path + path.parse(item.originalname).ext
            fs.renameSync(oldname, newname)
            article.imageList.push(`http://192.168.31.18:${PORT}/uploads/`+ item.filename + path.parse(item.originalname).ext)
            // article.update({$push:{imageList:`http://192.168.31.18:${PORT}/uploads/`+ item.filename + path.parse(item.originalname).ext}})
        });
        article.save()
        res.send('成功')
        
    } catch (error) {
        
    }
}

//更新文章
exports.updateArticle = async (req, res, next) => {
    try {
        const article = req.article
        const bodyArticle = req.body.article
        article.title = bodyArticle.title || article.title
        article.description = bodyArticle.description || article.description
        article.body = bodyArticle.body || article.body 
        await article.save()
        res.status(200).json({article})
    } catch (error) {
        next(error);
    }
}

//删除文章
exports.deleteArticle = async (req, res, next) => {
    try {
        console.log(req.params);
        await Article.findOneAndDelete({_id: req.params.articleId})
        await Comments.remove({postId: req.params.articleId})
        res.status(204).end('帖子删除成功')
    } catch (error) {
        next(error);
    }
}

//向文章添加评论
exports.addCommentforArticle = async (req, res, next) => {
    try {
        //处理请求
        res.send('post /articles/:slug/comments')
    } catch (error) {
        next(error);
    }
}

//获取自己的文章列表
exports.getMypostList = async (req, res, next) => {
    try {
        console.log(req.params);
        const article = await Article.find({author:req.params.authorId}).populate('author')
        res.status(200).json({article})
    } catch (error) {
        next(error);
    }
}



//分页明天待改。
//获取文章列表
exports.testArticleList = async (req, res, next) => {
    try {
        
        const { limit,
                offset, 
                tag,
                author
            } = req.query
            console.log(limit,offset,7777777);
        const filter = {}
        

        if(tag){
            // tag = req.tag
            filter.tag = tag
        }

        if(author) {
            const user = await User.findOne({username:author})
            filter.author = user ? user._id : null
        }
        
        // const articles = await Article.find(filter, async (err,ress)=>{
        //     if(err) return res.json({status:1,message:'请求失败'})
        //     let length = ress.length
        //     await Article.find(filter).populate('author').populate('rooter')
        //     .skip(Number.parseInt(offset))  //跳过多少条
        //     .limit(Number.parseInt(limit))  //取多少条
        //     .sort({
        //         //-1 倒叙  1升序
        //         createdAt:-1
        //     }).exec(function(err,docs){
        //         if(err) {
        //             return res.json({status:1,message:'请求失败'})
        //         }
        //         return res.json({
        //             status:200,
        //             message:'请求成功', 
        //             totle:length,
        //             articles:docs
        //         })
        //     })
        // })
        const allarticle = await Article.find(filter)
        const articles = await Article.find(filter).populate('author').populate('rooter')
        .skip((Number.parseInt(offset)-1) * Number.parseInt(limit))  //跳过多少条
        .limit(Number.parseInt(limit))  //取多少条
        .sort({
            //-1 倒叙  1升序
            createdAt:-1
        })
        res.status(200).json({
            articles,
            articleCount:allarticle.length,
        })
    } catch (error) {
        next(error);
    }
}