/*
 * @Author: xiewenhao
 * @Date: 2022-07-22 16:39:39
 * @LastEditTime: 2022-07-27 13:42:59
 * @Description: 
 */
const express = require('express')
const router = express.Router()
const expreeJoi = require('@escook/express-joi')
const {
    getUserinfo,
    updateUserinfo,
    password,
    avatar

} = require('../router_handler/userinfo')
const {
    reg_update_schema,
    update_password_schema,
    upate_avatar_schema
} = require('../schema/user')

router.get('/userinfo', getUserinfo)
router.post('/update', expreeJoi(reg_update_schema), updateUserinfo)
router.post('/password', expreeJoi(update_password_schema), password)
router.post('/avatar', expreeJoi(upate_avatar_schema), avatar)
module.exports = router