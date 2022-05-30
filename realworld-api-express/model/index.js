const mongoose = require('mongoose');
const {dbUrl} = require('../config/config.default')
const {clouldDbUrl} = require('../config/config.default')
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
//当连接失败的时候
db.on('error', (err)=>{ 
    console.log('数据库连接失败',err);
});
//当连接成功的时候
db.once('open', function() {
  // we're connected!
    console.log('MongoDB 数据连接成功!!!');
});

//组织导出模型类
module.exports = {
    User:mongoose.model('User',require('./user')),
    Article:mongoose.model('Article',require('./article')),
    Comments:mongoose.model('Comments',require('./comments')),
    Rooter:mongoose.model('Rooter',require('./rooter')),
    Video:mongoose.model('Video',require('./video')),
    Message:mongoose.model('Message',require('./message'))
}