/*
 * @Author: xiewenhao
 * @Date: 2022-07-22 16:48:10
 * @LastEditTime: 2022-07-27 13:49:11
 * @Description: 
 */
const db = require('../db')
const bcrypt = require('bcryptjs')
exports.getUserinfo = (req, res) => {
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id =?'
    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc(err)
        res.send({
            data: result[0],
            msg: '查询成功',
            status: 0
        })
    })
}

exports.updateUserinfo = (req, res) => {
    const sql = 'update ev_users set ? where id = ?'
    db.query(sql, [req.body, req.body.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('更新用户的基本信息失败')
        res.send({
            msg: '更新用户信息成功',
            status: 0
        })
    })
}

exports.password = (req, res) => {
    const spq1 = 'select * from ev_users where id =?'
    const spl2 = 'update ev_users set password = ? where id = ? '
    db.query(spq1, req.user.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 0) return res.cc('对不起该用户不存在')
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!compareResult) return res.cc('旧密码错误')
        db.query(spl2, [bcrypt.hashSync(req.body.newPwd, 10), req.user.id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('密码更新失败')
            res.send({
                msg: '密码更新成功',
                status: 0
            })
        })
    })
}

exports.avatar = (req, res) => {
    const sql = 'update  ev_users set user_pic=? where id =?'
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('更换头像失败')
        res.send({
            msg: '更换头像成功',
            code: 0
        })
    })
}