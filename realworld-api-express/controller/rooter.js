const { Rooter, User, Article, Video, Comments, Message } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')


//管理员登陆
exports.login = async (req, res, next) => {
    try {
        //1.数据验证
        //2.生成token
        const rooter = req.rooter.toJSON();
        const token = await jwt.sign({
            rooterId: rooter._id
        },
         jwtSecret, {
            // expiresIn: 60 * 60 * 24
        });
        //3.发送成功响应
        delete rooter.password
        res.status(200).json({
            ...rooter,
            token
        })
    } catch (error) {
        next(error);
    }
}

//用户注册
exports.register = async (req, res, next) => {
    try {
        //1.获取请求体数据
        //2.数据验证
        //2.1基本数据验证
        //2.2业务数据验证

        //3.验证通过，将数据保存到数据库
        console.log(req.body);
        let rooter = new Rooter(req.body.rooter)

        //保存到数据库
        await rooter.save()
        console.log(rooter);
        rooter = rooter.toJSON()
        delete rooter.password

        //4.发送成功响应
        res.status(201).json({
            rooter
        })
    } catch (error) {
        next(error);
    }
}

//获取当前登陆用户
exports.getCurrentRoot = async (req, res, next) => {
    try {
        res.status(200).json({
            rooter: req.rooter
        })

    } catch (error) {
        next(error);
    }
}

//获取用户列表
exports.getUserList = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json({users})
    } catch (error) {
        next(error);
    }
}

//改变用户发言状态
exports.changeState = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await User.findById(req.body._id)
        user.bio = req.body.bio
        user.save()
        res.status(200).send('状态修改成功')
    } catch (error) {
        next(error);
    }
}

//管理员搜索用户  模糊搜索
exports.searchUserList = async (req, res, next)=>{
    try {
        console.log(req.query,2);
        //正则表达
    let regexp = new RegExp(req.query.keyword,'i')
    console.log(req.query.keyword);
    console.log(regexp);
    //$or:[] 实现的多重搜索
    const users = await User.find({$or:[
        {username:{$regex: regexp}},
        {email:{$regex: regexp}}


    ]},(err,users)=>{
        if(err){
            res.send({
                msg:'查询失败'
            })
        }
        if(users){
            console.log(users);
            res.status(200).json({users})
        }
    })

    } catch (error) {
        next(error);
    }
}

//管理员模糊搜索文章
exports.searchArticles = async (req, res, next) => {
    try {
        let regexp = new RegExp(req.query.keyword,'i')
        const {limit, offset} = req.query
        console.log(limit,offset);
        console.log(req.query.keyword);
        console.log(regexp);
        //$or:[] 实现的多重搜索
        const articles = await Article.find({$or:[
            {title:{$regex: regexp}},
            {body:{$regex: regexp}},
            {tag:{$regex: regexp}}
        ]}).populate('author').populate('rooter')
        .skip((Number.parseInt(offset)-1) * Number.parseInt(limit))  //跳过多少条
        .limit(Number.parseInt(limit))  //取多少条
        .sort({
            //-1 倒叙  1升序
            createdAt:-1
        })

        //符合条件的总数量
        const count = await Article.find({$or:[
            {title:{$regex: regexp}},
            {body:{$regex: regexp}},
            {tag:{$regex: regexp}}
        ]})

        res.status(200).json({
            articles,
            articlesCount: count.length
        })

    } catch (error) {
        next(error);
    }
}


//管理员模糊搜索视频
exports.searchVideos = async (req, res, next) => {
    try {
        //正则表达式
        let regexp = new RegExp(req.query.keyword,'i')
        const {limit, offset} = req.query
        console.log(req.query.keyword);
        console.log(regexp);
        //$or:[] 实现的多重搜索
        const videos = await Video.find({$or:[
            {title:{$regex: regexp}},
            {body:{$regex: regexp}},
            {tag:{$regex: regexp}}
        ]}).populate('author').populate('rooter')
        .skip((Number.parseInt(offset)-1) * Number.parseInt(limit))  //跳过多少条
        .limit(Number.parseInt(limit))  //取多少条
        .sort({
            //-1 倒叙  1升序
            createdAt:-1
        })

        const count = await Article.find({$or:[
            {title:{$regex: regexp}},
            {body:{$regex: regexp}},
            {tag:{$regex: regexp}}
        ]})

        res.status(200)
        .json({
            videos,
            videosCount: count.length
        })

    } catch (error) {
        next(error);
    }
}

//管理员删除帖子
exports.deletePost = async (req, res, next)=>{
    try {
        console.log(req.params);
        await Article.findOneAndDelete({_id: req.params.postId})
        await Comments.remove({postId: req.params.postId})
        res.send('帖子删除成功')
    } catch (error) {
        next(error);
    }
}

//管理员删除视频
exports.deleteVideo = async (req, res, next)=>{
    try {
        console.log(req.params);
        await Video.findOneAndDelete({_id: req.params.videoId})
        await Message.remove({videoId: req.params.videoId})
        res.send('视频删除成功')
    } catch (error) {
        next(error);
    }
}

//管理员删除评论
exports.deleteComment = async (req, res, next)=>{
    try {
        console.log(req.params);
        await Comments.remove({_id: req.params.replyId})
        res.send('评论删除成功')
    } catch (error) {
        next(error);
    }
}

//管理员删除留言
exports.deleteMessage = async (req, res, next)=>{
    try {
        console.log(req.params,15878);
        await Message.remove({_id: req.params.messageId})
        res.send('留言删除成功')
    } catch (error) {
        next(error);
    }
}