const {Article, User, Comments} = require('../model')

exports.sendReply = async (req,res,next)=>{
    try {
        const comments = await new Comments()
        console.log(req.body);
        comments.author = req.body.userId;
        comments.rooter = req.body.rooterId;
        comments.postId = req.body.post_id;
        comments.reply = req.body.reply;
        comments.save();
        res.status(200).json({comments})
    } catch (error) {
        res.end(error.message)
    }
}

exports.getReplyList = async (req, res, next)=>{
    try {
        // console.log(req.params,);
        const comments = await Comments.find({postId:req.params.id}).populate('author').populate('rooter').sort({_id:-1})
        .sort({
            //-1 倒叙  1升序
            createdAt:-1
        })
        // console.log(comments);
        res.status(200).json({
            comments,
            commentsCount:comments.length,
        })
    } catch (error) {
        res.end(error.message)
    }
}

//用户删除评论
exports.deleteComment = async (req, res, next)=>{
    try {
        console.log(req.params);
        await Comments.remove({_id: req.params.replyId})
        res.send('评论删除成功')
    } catch (error) {
        next(error);
    }
}
