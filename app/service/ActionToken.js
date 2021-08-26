'use strict'

const Service = require('egg').Service

class ActionTokenService extends Service {
  async apply (_id) {
    const { app } = this
    const token = app.jwt.sign({
      _id: _id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
    }, app.config.jwt.secret)
    return token
  }
}

module.exports = ActionTokenService
