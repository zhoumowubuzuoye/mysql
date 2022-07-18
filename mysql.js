/*
 * @Author: xiewenhao
 * @Date: 2022-07-18 17:03:09
 * @LastEditTime: 2022-07-18 17:29:01
 * @Description: 
 */
const mysql = require('mysql')
const sqpStr = 'insert into users set ?'
const user = {username:'ww',password:1234567}
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'admin123',
    database:'my_db_01'
})
db.query(sqpStr,user,(err,result)=>{
  err??console.log(result);
})