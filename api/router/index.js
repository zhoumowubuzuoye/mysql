/*
 * @Author: xiewenhao
 * @Date: 2022-07-21 10:06:31
 * @LastEditTime: 2022-07-21 16:52:12
 * @Description: 
 */
const express = require('express')
const router = express.Router()
const {
    regUser,
    login
} = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const {
    reg_login_schema
} = require('../schema/user')

router.post('/reguer', expressJoi(reg_login_schema), regUser)

router.post('/login', login)

module.exports = router