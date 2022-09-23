/*
 * @Author: xiewenhao
 * @Date: 2022-07-27 14:08:08
 * @LastEditTime: 2022-09-23 10:19:21
 * @Description: 
 */
const _ = require('lodash')
const {
    result
} = require('@hapi/joi/lib/base')
const db = require('../db')
const {
    myMoment
} = require('../utils/time')
const moment = require('moment')
exports.getArticleList = (req, res) => {
    const sql = 'select id,name,date,actor,history,alias from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        const newArray = _.chunk(result, req.query.pageSize || 10)
        const data = {
            total: result.length,
            rows: newArray[req.query.pageNum - 1 || 0],
            pageNum: req.query.pageNum || 1
        }
        res.send({
            data: data,
            msg: '查询成功',
            status: 0
        })
    })
}

exports.addArcticle = (req, res) => {
    const {
        name,
        alias,
        actor,
        history
    } = req.body
    const sql = 'insert into ev_article_cate set ?'
    const sql1 = 'select * from ev_article_cate where name = ? or alias = ?'
    db.query(sql1, [name, alias], (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 2) return res.cc('文本名字与简介重复')
        if (result.length === 1 && result[0].name === name && result[0].alias === alias) return res.cc('文本名称与简介重复')
        if (result.length === 1 && result[0].alias === alias) return res.cc('简介重复')
        if (result.length === 1 && result[0].name === name) {
            return res.cc('文本名称重复')
        } else {
            db.query(sql, {
                    name,
                    alias,
                    actor,
                    history,
                    date: myMoment(new Date())
                },
                (
                    err, result
                ) => {
                    if (err) return res.cc(err)
                    if (result.affectedRows !== 1) return res.cc('新建书籍失败')
                    res.send({
                        status: 0,
                        msg: '新建书籍成功'
                    })
                })
        }
    })


}

exports.deleteArticleById = (req, res) => {
    const sql = 'update ev_article_cate set is_delete =1 where id=?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('删除失败')
        res.cc('删除成功', 0)
    })
}

exports.getArtCateById = (req, res) => {
    const spl = 'select * from  ev_article_cate where id = ? and is_delete != 1'
    db.query(spl, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length < 1) return res.cc('查询失败')
        res.send({
            data: result[0],
            msg: '查询成功',
            status: 0
        })
    })
}

exports.updteArtById = (req, res) => {
    const sql = 'update ev_article_cate set ? where id=?'
    const sql1 = 'select * from  ev_article_cate where id != ? and (alias = ? or name = ?)'
    const {
        id,
        alias,
        name
    } = req.body
    db.query(sql1, [id, alias, name], (err, result) => {
        if (err) return res.cc(err)
        if (result.length > 0) return res.cc('有文本被占用')
    })
    db.query(sql, [{
        alias,
        name
    }, id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('更新失败')
        res.cc('更新成功', 0)
    })
}

exports.upDateArcticle = async (req, res) => {
    const data = []
    for (let index = 0; index < 7; index++) {
        if (index < 7) {
            const sql = `SELECT * FROM  ev_article_cate where TO_DAYS( NOW( ) ) - TO_DAYS(date) =${index}`
            const res = await new Promise((resolve) => {
                setTimeout(() => {
                    db.query(sql, (err, res) => {
                        resolve(res)
                    })
                })
            })
            if (res.length > 0) {
                data.push({
                    data: res,
                    date: res[0].date.slice(0,10)
                })
            }
        }
    }
    res.send({
        data,
        msg: '查询成功',
        status: 0
    })
}