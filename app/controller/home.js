'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const res = { test: 1 };
    ctx.helper.success({ ctx, res });
  }
}

module.exports = HomeController;
