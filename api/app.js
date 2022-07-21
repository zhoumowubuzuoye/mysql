/*
 * @Author: xiewenhao
 * @Date: 2022-07-21 09:57:49
 * @LastEditTime: 2022-07-21 17:04:11
 * @Description: 
 */
const express = require('express')
const cors = require('cors')
const joi = require('@hapi/joi')
const router = require('./router')
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
api.use('/api', router)
api.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 未知的错误
    res.cc(err)
})
api.listen(3007, () => {
})