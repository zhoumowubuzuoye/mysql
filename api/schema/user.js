/*
 * @Author: xiewenhao
 * @Date: 2022-07-21 15:16:17
 * @LastEditTime: 2022-07-22 17:11:58
 * @Description: 
 */
// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
}

exports.reg_update_schema = {
  body: {
    id,
    nickname,
    email
  }
}