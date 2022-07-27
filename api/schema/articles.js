/*
 * @Author: xiewenhao
 * @Date: 2022-07-27 14:56:02
 * @LastEditTime: 2022-07-27 15:57:18
 * @Description: 
 */
const joi = require('joi')
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().required()
exports.add_articlr_schema = {
    body: {
        name,
        alias
    }
}

exports.delete_article_schema = {
    params: {
        id
    }
}

exports.get_article_schema = {
    params: {
        id
    }
}

exports.updte_article_schema = {
    body: {
        id,
        name,
        alias
    }
}