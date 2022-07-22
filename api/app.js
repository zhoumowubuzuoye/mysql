/*
 * @Author: xiewenhao
 * @Date: 2022-07-21 09:57:49
 * @LastEditTime: 2022-07-22 16:47:38
 * @Description: 
 */
const express = require('express')
const cors = require('cors')
const expressJWT = require('express-jwt')
const config = require('./config')
const joi = require('@hapi/joi')
const router = require('./router')
const infoRouter = require('./router/userinfo')
const api = express()

api.use(cors())
api.use(express.urlencoded({
    extended: false
}))
api.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next()
})
api.use(expressJWT({
    secret: config.jwtSecretKey
}).unless({
    path: [/^\/api/]
}))
api.use('/api', router)
api.use('/my',infoRouter)
api.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 未知的错误
    if (err.name === 'UnauthorizedError') return res.cc(err)
    res.cc(err)
})
api.listen(3007, () => {})