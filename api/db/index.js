/*
 * @Author: xiewenhao
 * @Date: 2022-07-21 10:42:17
 * @LastEditTime: 2022-07-21 10:45:31
 * @Description: 
 */
const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

module.exports = db