/*
 * @Author: xiewenhao
 * @Date: 2022-09-20 15:43:35
 * @LastEditTime: 2022-09-20 16:03:49
 * @Description: 
 */
const moment = require("moment");
exports.myMoment = (date) => moment(date).format('YYYY-MM-DD HH-mm-ss')