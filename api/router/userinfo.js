/*
 * @Author: xiewenhao
 * @Date: 2022-07-22 16:39:39
 * @LastEditTime: 2022-07-22 17:16:21
 * @Description: 
 */
const express = require('express')
const router = express.Router()
const expreeJoi = require('@escook/express-joi')
const {
    getUserinfo,
    updateUserinfo
} = require('../router_handler/userinfo')
const {
    reg_update_schema
} = require('../schema/user')

router.get('/userinfo', getUserinfo)
router.post('/update', expreeJoi(reg_update_schema), updateUserinfo)


module.exports = router