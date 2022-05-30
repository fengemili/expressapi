const express = require("express");
const router = express.Router()
const uploadFile = require("../controller/upload")
const path = require("path")
const multer = require("multer")
const fs = require("fs")
const {Article, User} = require('../model')
const PORT = process.env.PORT || 80

// const formidable = require('express-formidable') // 引入

// router.use(formidable());  // 中间件



router.post('/uploads', multer({ dest: './public/uploads' }).single('file'),
    async (req, res) => {
        console.log(req.body._id);
        // console.log(req.fields)//参数对象
        console.log(req.file)//文件对象
        let oldname = req.file.path //获取path: 'public\\upload\\0f625978d5d1a783b12e149718f8b634',
        let newname = req.file.path + path.parse(req.file.originalname).ext //.jpg
        fs.renameSync(oldname, newname)//将老的文件名改成新的有后缀的文件 #同步写法
        const article = await Article.findById(req.body._id)
        console.log(article);
        console.log(`http://localhost:${PORT}/uploads/` + req.file.filename + path.parse(req.file.originalname).ext);
        // article.imageList.$push(`http://192.168.31.17:${PORT}/uploads/` + req.file.filename + path.parse(req.file.originalname).ext)
        await article.update({$push:{imageList:`http://192.168.31.18:${PORT}/uploads/` + req.file.filename + path.parse(req.file.originalname).ext}}) 
        await article.save()
        


        res.send({ err: 0, url: `http://192.168.31.18:${PORT}/uploads/` + req.file.filename + path.parse(req.file.originalname).ext })
    })


module.exports = router;