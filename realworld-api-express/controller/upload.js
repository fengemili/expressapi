const {Article, User} = require('../model')
const multer = require('multer')
const fs = require('fs')
const upload = multer({ dest: 'uploadFile' }) 

exports.uploadFile = upload.array('file', 12),
    (req,res) => {
        console.log(req.file)
        res.send(req.file)
}