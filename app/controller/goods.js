'use strict';

const Controller = require('egg').Controller;

function GroupBy (array, fn) {
  debugger;
  const groups = {};
  array.forEach(function (item) {
    const group = JSON.stringify(fn(item));
    //这里利用对象的key值唯一性的，创建数组
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  //最后再利用map循环处理分组出来
  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
}
class HomeController extends Controller {
  async category () {
    const { ctx } = this;
    const res = await ctx.model.Category.findAll()
    ctx.helper.success({ ctx, res });
  }
  async tableList () {
    const { ctx } = this;
    const payload = ctx.request.query
    const cateId = payload.id;
    payload.page = payload.page || 1
    payload.page = payload.page > 0 ? payload.page - 1 : payload.page
    payload.limit = payload.limit || 20
    // const { limit, page, time } = payload
    // page = page || 1
    // limit = limit || 20
    const offset = payload.page * payload.limit
    const res = {}
    res.list = await ctx.model.Table.findAll({
      order: [
        ['id', 'DESC']
      ],
      offset: offset,
      limit: payload.limit,
      where: {
        cate_id: cateId
      }
    })
    res.total = await ctx.model.Table.count({
      where: {
        cate_id: cateId
      }
    })
    ctx.helper.success({ ctx, res });
  }

  async info () {
    const { ctx } = this;
    const payload = ctx.request.query
    const tableId = payload.tableId;
    const res = await ctx.model.Goods.findAll({
      order: [
        ['date', 'ASC']
      ],
      where: {
        table_id: tableId
      }
      // group: ['goods_id', 'date']
    })
    const list = {}
    res.map((item, index) => {
      if (list[item.goods_id]) {
        list[item.goods_id].data.push(item)
      } else {
        list[item.goods_id] = {}
        list[item.goods_id].data = []
        list[item.goods_id].data.push(item)
      }
    })
    // console.log(list)

    ctx.helper.success({ ctx, res: list });
  }
}

module.exports = HomeController;
