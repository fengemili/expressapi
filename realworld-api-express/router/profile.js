const express = require("express");
const router = express.Router()
const profileCrtl = require("../controller/profile")

//获取用户资料
router.get('/:username',profileCrtl.getUserInfo)

//关注用户
router.post('/:username/follow', profileCrtl.followUser)

//取消关注用户
router.delete('/:username/follow', profileCrtl.unFollowUser)


module.exports = router;