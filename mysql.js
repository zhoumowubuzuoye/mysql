/*
 * @Author: xiewenhao
 * @Date: 2022-07-18 17:03:09
 * @LastEditTime: 2022-07-18 17:22:49
 * @Description: 
 */
const mysql = require('mysql')
const sqpStr = 'insert into users (username,password) values (?,?)'
const user = {usename:'ww',password:1234567}
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'admin123',
    database:'my_db_01'
})
db.query(sqpStr,['zs','123456'],(err,result)=>{
  err??console.log(result);
})