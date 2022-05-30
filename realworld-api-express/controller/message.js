const { Article, User, Message} = require('../model')

//发送留言
exports.sendMessage = async (req,res,next) => {
    try {
        console.log(req.body);
        console.log(req.body,4589789456);
        const message = await new Message (req.body)
        message.save()
        res.status(201).json(message)
    } catch (error) {
        console.log(error);
    }

}

//获取一个视频的留言留言
exports.getMessageList = async (req,res,next) => {
    try {
        console.log(req.params,4564897);
        const message = await Message.find({videoId: req.params.id}).populate('rooter').populate('author').sort({_id:-1})
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}

//删除一个视频的留言
exports.deleteMessage = async (req,res,next) => {
    try {
        console.log(req.params,15878);
        await Message.remove({_id: req.params.id})
        res.send('留言删除成功')
    } catch (error) {
        console.log(error);
    }
}
