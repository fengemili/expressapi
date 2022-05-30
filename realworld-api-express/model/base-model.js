const moment = require('moment')
module.exports = {
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:moment().toDate()
    }
}