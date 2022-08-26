/*
 * @Author: xiewenhao
 * @Date: 2022-07-21 10:19:20
 * @LastEditTime: 2022-08-26 16:10:19
 * @Description: 
 */
const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
exports.regUser = (req, res) => {
    let {
        username,
        password
    } = req.body
    if (!username || !password) {
        return res.cc('用户不合法')
    }
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr, username, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length > 0) {
            return res.cc('用户名已被占用请更换会户名')
        }
        password = bcrypt.hashSync(password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, {
            username: username,
            password: password
        }, (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if (result.affectedRows !== 1) {
                return res.cc('注册失败')
            }
            return res.cc('注册成功', 0)
        })
    })
}

exports.login = (req, res) => {
    console.log(req.body);
    const sql = 'select * from ev_users where username = ?'
    let {
        password,
        username
    } = req.body
    db.query(sql, username, (err, result) => {
        console.log(result);
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('请输入正确的用户名')
        const compareResult = bcrypt.compareSync(password, result[0].password)
        if (!compareResult) return res.cc('登录失败')
        const user = {
            ...result[0],
            password: '',
            user_pic: ""
        }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn
        })
        res.send({
            status: 0,
            token: "Bearer " + tokenStr,
            msg: '登陆成功'
        })
    })
}