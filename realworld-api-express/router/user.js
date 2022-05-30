const express = require("express");
const router = express.Router()
const userCtrl = require("../controller/user")
const userValidator = require("../validator/user")
const auth = require("../middleware/auth")


//用户登陆
router.post('/users/login',userValidator.login, userCtrl.login)

//用户注册
router.post('/users', userValidator.register, userCtrl.register)//3. 通过验证，执行具体的控制器处理


//获取当前登陆用户
router.get('/user/:userId', auth, userCtrl.getCurrentUser)

//更新用户
router.put('/user/userInfo', auth, userValidator.updataUser, userCtrl.updateCurrentUser)

module.exports = router;