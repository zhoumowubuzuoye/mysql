/*
 * @Author: xiewenhao
 * @Date: 2022-07-27 14:56:02
 * @LastEditTime: 2022-09-20 15:33:44
 * @Description: 
 */
const joi = require('joi')
const name = joi.string().required()
const alias = joi.string().required()
const id = joi.number().integer().required()
const pageSize = joi.number().integer()
const pageNum = joi.number().integer()
const actor = joi.optional()
const history = joi.number().optional()

exports.add_articlr_schema = {
    body: {
        name,
        alias,
        actor,
        history
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

exports.get_article_list_schema = {
    body: {
        pageSize,
        pageNum
    }
}