/*
 * @Author: xiewenhao
 * @Date: 2022-07-21 10:19:20
 * @LastEditTime: 2022-07-21 17:04:14
 * @Description: 
 */
const db = require('../db')
const bcrypt = require('bcryptjs')
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
    res.send('login Ok')
}