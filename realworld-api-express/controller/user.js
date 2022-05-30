const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const PORT = process.env.PORT || 80

//用户登陆
exports.login = async (req, res, next) => {
    try {
        //1.数据验证
        //2.生成token
        const user = req.user.toJSON();
        const token = await jwt.sign({
            userId: user._id
        },
        //token时间限制
        jwtSecret, {
            // expiresIn: 60 * 60 * 24
        });
        //3.发送成功响应
        delete user.password
        res.status(200).json({
            ...user,
            token
        })
    } catch (error) {
        next(error);
    }
}

//用户注册
exports.register = async (req, res, next) => {
    try {
        let user = new User(req.body.user)
        user.bio = 1
        user.image = `http://192.168.31.18:${PORT}/avart/bajie.png`
        //保存到数据库
        await user.save()
        console.log(user);
        user = user.toJSON()

        delete user.password
        //4.发送成功响应
        res.status(201).json({
            user
        })
    } catch (error) {
        next(error);
    }
}

//获取当前登陆用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        console.log(req.params.userId);
        const user = await User.findById(req.params.userId)
        res.status(200).json({
            user
        })

    } catch (error) {
        next(error);
    }
}

//更新用户信息
exports.updateCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findOne({_id:req.user._id})
        console.log(user,55555);
        user.username = req.body.newName
        await user.save()
        res.status(201).json({
            user: req.user
        })
    } catch (error) {
        next(error);
    }
}