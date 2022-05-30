const fs = require("fs")
const {Video, Rooter} = require('../model')
const path = require("path")
const PORT = process.env.PORT || 80

//用户上传视频
exports.uploadVideo = async (req,res,next) => {
    try {
        console.log(req.body);
        const video = await new Video(req.body)
        let oldname = req.file.path
        let newname = req.file.path + path.parse(req.file.originalname).ext
        fs.renameSync(oldname, newname)
        video.videoUrl = `http://192.168.31.18:${PORT}/video/` + req.file.filename + path.parse(req.file.originalname).ext
        video.save()
        res.status(201).json({video})
    } catch (error) {
        res.end(error)
    }
}

//获取视频列表
exports.getVideoList = async (req, res, next) => {
    try {
        console.log(req.query,9999999);
        const { tag, limit, offset } = req.query
        const video = await Video.find({tag})
        const videos = await Video.find({tag})
        .populate('author')
        .populate('rooter')
        .skip((Number.parseInt(offset)-1) * Number.parseInt(limit))  //跳过多少条
        .limit(Number.parseInt(limit))  //取多少条
        .sort({
            //-1 倒叙  1升序
            createdAt:-1
        })
        res.status(200).json({
            videos,
            videoCount: video.length
        })
    } catch (error) {
        res.end(error)
    }
}

//用户模糊搜索视频
exports.searchvideos = async (req, res, next) => {
    try {
        //正则表达式
        let regexp = new RegExp(req.query.keyword,'i')
        console.log(req.query);
        console.log(regexp);
        //$or:[] 实现的多重搜索
        const videos = await Video.find({$or:[
            {title:{$regex: regexp}},
            {body:{$regex: regexp}},
            {tag:{$regex: regexp}}
        ]}).populate('author').populate('rooter').sort({
            //-1 倒叙  1升序
            createdAt:-1
        })
        res.status(200).json({videos})

    } catch (error) {
        next(error);
    }
}
