/*
 * @Author: xiewenhao
 * @Date: 2022-07-21 09:57:49
 * @LastEditTime: 2022-08-26 16:57:08
 * @Description: 
 */
const express = require('express')
const cors = require('cors')
const expressJWT = require('express-jwt')
const bodyParser = require('body-parser')
const config = require('./config')
const joi = require('@hapi/joi')
const router = require('./router')
const infoRouter = require('./router/userinfo')
const artRouter = require('./router/articles')
// const artsRouter = require('./router/arts')
const api = express()

api.use(cors())
api.use(express.urlencoded({
    extended: false
}))
api.use(bodyParser.urlencoded({extended:false}))
api.use(bodyParser.json())
api.use((req, res, next) => {
    console.log(req,11);
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
api.use('/my', infoRouter)
api.use('/my/articles', artRouter)
// api.use('/my', artsRouter)
api.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 未知的错误
    if (err.name === 'UnauthorizedError') return res.cc(err)
    res.cc(err)
})
api.listen(3007, () => {
    console.log('127.0.0.1:3007');
})