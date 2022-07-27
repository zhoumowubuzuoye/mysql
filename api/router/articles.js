/*
 * @Author: xiewenhao
 * @Date: 2022-07-27 14:07:38
 * @LastEditTime: 2022-07-27 16:45:24
 * @Description: 
 */
const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
    add_articlr_schema,
    delete_article_schema,
    get_article_schema,
    updte_article_schema
} = require('../schema/articles')
const {
    getArticleList,
    addArcticle,
    deleteArticleById,
    getArtCateById,
    updteArtById
} = require('../router_handler/arricles')

router.get('/cates', getArticleList)
router.post('/addcates', expressJoi(add_articlr_schema), addArcticle)
router.get('/delete/:id', expressJoi(delete_article_schema), deleteArticleById)
router.get('/cate/:id', expressJoi(get_article_schema), getArtCateById)
router.post('/upateCate', expressJoi(updte_article_schema), updteArtById)
module.exports = router