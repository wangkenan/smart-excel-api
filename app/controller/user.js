'use strict'
const Controller = require('egg').Controller
class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.UserCreateTransfer = {
      code: { type: 'string', required: true, allowEmpty: false, min: 4 },
      mobile: { type: 'string', required: true, allowEmpty: false, min: 11 }
    }
  }
  async login () {
    const { ctx, app, service } = this
    const payload = ctx.request.body
    let res = {}
    if (payload.username === '14444444444' && payload.password === '123456') {
      const token = app.jwt.sign({
        _id: 1,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
      }, app.config.jwt.secret)
      res.token = token
      ctx.helper.success({ ctx, res })
    } else {
      // throw Error()
      ctx.helper.error({ ctx, res, msg:'账号密码错误', code:'101' })
    }
    // const error = app.validator.validate(
    //   this.UserCreateTransfer,
    //   ctx.request.body
    // )
    // if (error) {
    //   ctx.body = error
    //   return
    // }
    // console.log(ctx.request.body)
    // const payload = ctx.request.body || {}
    // // const res = await service.user.create(payload)
    // ctx.helper.success({ ctx, res:{} })
  }
  async sendCode () { }
}

module.exports = UserController