/*
 * @Author: xiewenhao
 * @Date: 2022-07-18 17:03:09
 * @LastEditTime: 2022-07-19 14:23:15
 * @Description: 
 */
// const mysql = require('mysql')
// const db = mysql.createPool({
//     host:'127.0.0.1',
//     user:'root',
//     password:'admin123',
//     database:'my_db_01'
// })
// const dbStr = 'select * from users'
// db.query(dbStr,(err,res)=>{
//     console.log(err);
//     err??console.log(res);
// })

// const mysql = require('mysql')
// const db = mysql.createPool({
//     host:'127.0.0.1',
//     user:'root',
//     password:'admin123',
//     database:'my_db_01'
// })
// const sqlStr = 'select * from users where id < ?'
// db.query(sqlStr,10,(err,res)=>{
//     err??console.log(res);
// })

// const mysql = require('mysql')
// const db = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     database: 'my_db_01',
//     password: 'admin123'
// })
// const user = {
//     username:'ww',
//     password:'123321'
// }
// const sqlStr = 'insert into users set ?'
// db.query(sqlStr,user, (err, res) => {
//     err ?? console.log(res)
// })
//

const {
    log
} = require('console')
const mysql = require('mysql')
const db = mysql.createPool({
    hose: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})
// const strSql = 'update  users set? where id=? '
// const user = {
//     id: 12,
//     password: '22222',
//     username: 'wwwww'
// }
// db.query(strSql, [user, user.id], (err, res) => {
//     err ? console.log(err) : console.log(res);
// })

const strSql = 'delete from users where id=?'
db.query(strSql, 12, (err, res) => {
    err ? console.log(err) : console.log(res);
})