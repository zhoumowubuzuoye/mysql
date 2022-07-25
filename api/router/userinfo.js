/*
 * @Author: xiewenhao
 * @Date: 2022-07-22 16:39:39
 * @LastEditTime: 2022-07-25 15:08:20
 * @Description: 
 */
const express = require('express')
const router = express.Router()
const expreeJoi = require('@escook/express-joi')
const {
    getUserinfo,
    updateUserinfo,
    password
    
} = require('../router_handler/userinfo')
const {
    reg_update_schema,
    update_password_schema
} = require('../schema/user')

router.get('/userinfo', getUserinfo)
router.post('/update', expreeJoi(reg_update_schema), updateUserinfo)
router.post('/password',expreeJoi(update_password_schema),password)

module.exports = router