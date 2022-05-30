const mongoose = require('mongoose');
const baseModel = require('./base-model')
const Schema = mongoose.Schema
const { User,Article,Rooter } = require('../model')

const commentsSchema = new mongoose.Schema({
    ...baseModel,
    message: {
        type: String,
        require:true
    },
    favoritesCount: {
        type: Number,
        default: 0
    },
    author: {
        //外键要添加的东西
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    rooter:{
        //外键要添加的东西
        type:Schema.Types.ObjectId,
        ref:'Rooter',
        require:true
    },
    videoId:{
        //外键要添加的东西
        type:Schema.Types.ObjectId,
        ref:'Article',
        require:true
    },

    imageList: {
        type: Array,
        default: null
    }
});

module.exports = commentsSchema