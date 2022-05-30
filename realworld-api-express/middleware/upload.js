const multer = require("multer")

module.exports = (req,res,next)=>{
    console.log('789756');
    multer({ dest: '../public/uploads' }).array('file',9),(req,res)=>{
        res.send(req.files)
    }
    
}

