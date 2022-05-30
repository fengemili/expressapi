const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const {Rooter} = require('../model')

module.exports = async (req, res, next) => {
    //从请求头获取 token数据
    let token = req.headers['authentization']
    token = token?token.split('Bearer ')[1]:null
    if(!token){
        return res.status(401).end()
    }
    try {
        const decodedToken = await verify(token, jwtSecret);
        req.rooter = await Rooter.findById(decodedToken.rooterId);
        next()
    } catch (err) {
        return res.status(401).end()
    }
    //验证token是否有效
    //无效-> 响应401 状体码
    //有效-> 吧用户信息读取出来挂载到req请求对象上
            // 继续往后执行
}