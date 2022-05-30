const mongoose = require('mongoose');
const baseModel = require('./base-model')
const md5 = require('../util/md5');

const userSchema = new mongoose.Schema({
    ...baseModel,
    username: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true,
        set:value =>md5(value),
        select: false
    },
    bio: {
        type: String,
        default:null
    },
    image:{
        type: String,
        default:null
    },
    
});

module.exports = userSchema