const mongoose = require('mongoose');
const baseModel = require('./base-model')
const Schema = mongoose.Schema
const { Rooter } = require('../model')

const articleSchema = new mongoose.Schema({
    ...baseModel,
    title: {
        type: String,
        require:true
    },
    description: {
        type: String,
        require:true
    },
    body: {
        type: String,
        require:true
    },
    tag: {
        type: String,
        require:true
    },
    favoritesCount: {
        type: Number,
        default: 0
    },
    rooter:{
        //外键要添加的东西
        type:Schema.Types.ObjectId,
        ref:'Rooter',
        require:true
    },
    videoUrl: {
        type: String,
        default: true
    }
});

module.exports = articleSchema