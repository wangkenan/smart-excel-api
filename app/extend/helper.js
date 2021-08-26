// const moment = require('moment')

// 格式化时间
// exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')
// const FlakeId = require('flake-idgen')
// const intformat = require('biguint-format')
// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
  ctx.status = 200
}
exports.error = ({ ctx, res = null, msg = '请求错误', code = -1 }) => {
  ctx.body = {
    code: code,
    data: res,
    msg
  }
  ctx.status = 200
}

// 生成snowFlake ID
// exports.uuid = () => {
//   const flakeIdGen = new FlakeId({ epoch: 1288834974657 })
//   const uuid = intformat(flakeIdGen.next())
//   return uuid
// }
