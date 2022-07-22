const db = require('../db')

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
    db.query(sql,[req.body,req.body.id],(err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows !==1) return res.cc('更新用户的基本信息失败')
        res.send({
            msg:'更新用户信息成功',
            status:0
        })
    })
}