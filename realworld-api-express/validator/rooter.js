const validate = require('../middleware/validate')
const { body, validationResult } = require('express-validator');
const { Rooter } = require('../model')
const md5 = require('../util/md5')

exports.login = [
    validate([
        body('rooter.account').notEmpty().withMessage('账号不能为空'),
        body('rooter.password').notEmpty().withMessage('密码不能为空')
        
    ]),
    validate([
        body('rooter.account').custom(async (account,{req}) => {
            const rooter = await Rooter.findOne({ account}).select(['account', 'username','bio','image','password'])
            if(!rooter) {
                return Promise.reject('管理员不存在')
            }
            //将数据挂载到请求对象中，后续的中间件也可以使用了
            //***** */
            req.rooter = rooter
        })
    ]),
    validate([
        body('rooter.password').custom(async (password,{req}) => {
            console.log(req.rooter)
            if(md5(password) !== req.rooter.password) {
                return Promise.reject('密码错误')
            }
        })
    ])
]