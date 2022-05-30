exports.getUserInfo = async (req, res, next) => {
    try {
        //处理请求
        res.send('get /profile/:username')
    } catch (error) {
        next(error);
    }
}

exports.followUser = async (req, res, next) => {
    try {
        //处理请求
        res.send('post /profile/:username/follow')
    } catch (error) {
        next(error);
    }
}

exports.unFollowUser = async (req, res, next) => {
    try {
        //处理请求
        res.send('delete /profile/:username/follow')
    } catch (error) {
        next(error);
    }
}