'use strict';

const Controller = require('egg').Controller;
const xlsx = require('node-xlsx').default;
const fs = require('mz/fs');
const pump = require('mz-modules/pump');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
// const sendToWormhole = require('stream-wormhole');
const crypto = require('crypto');
class UploadController extends Controller {
  async excel () {
    const {ctx} = this;
    const file = ctx.request.files[0]
    const type = file.type
    let filename = path.basename(file.filename)
    let extname = filename.lastIndexOf('.') >= 0 ? filename.slice(filename.lastIndexOf('.') - filename.length) : ''
    // 文件名没有扩展名时候，则从文件类型中取扩展名
    if (extname === '' && type.indexOf('/') >= 0) {
      extname = '.' + type.split('/')[1]
    }
    const sourceName = filename.split('.')[0]
    // // 将文件名重新赋值为一个随机数（避免文件重名）
    filename = Math.random().toString().slice(2) + extname
    const targetPath = path.join(this.config.baseDir, 'app/public/uploads', filename);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);
    const savePath =`app/public/uploads/${filename}`
    const payload = ctx.request.body
    const cateId = payload.id;
    try {
      await pump(source, target);
      ctx.logger.warn('save %s to %s', file.filepath, targetPath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }
    const tableResult = await this.createTable({
      name: sourceName,
      path: savePath,
      cate_id: cateId
    })


    const goodsResult = await this.parseExcel(`${this.config.baseDir}/app/public/uploads/${filename}`, cateId, tableResult.id)
    // console.log(sourceName, filename)

    const res = {
    };
    ctx.helper.success({ ctx, res });
  }

  async createTable (payload) {
    const { ctx } = this;
    const result = ctx.model.Table.create(payload)
    return result
  }
  async parseExcel (path, cateId, tableId) {
    const workSheetsFromFile = xlsx.parse(path);
    // console.log(workSheetsFromFile[0])
    const excelHead = workSheetsFromFile[0].data[0];
    const groupName = crypto.createHash('md5').update(workSheetsFromFile[0].name + Math.random()).digest("hex");
    // console.log(workSheetsFromFile)
    const workSheets = workSheetsFromFile[0].data.slice(1, workSheetsFromFile[0].data.length)
    const bulkArray = new Array();
    workSheets.map((item) => {
      let obj = {}
      if (item.length > 0) {
        excelHead.map((head, index) => {
          if (head == '月') {
            obj.date = new Date('1900', 0, item[index])
          } else if (head == '日期') {
            obj.date = new Date('1900', 0, item[index])
          } else if (head == '商品标题') {
            obj.title = item[index]
          } else if (head == '商品id') {
            obj.goods_id = item[index]
          } else if (head == '类别') {
            obj.type = item[index]
          } else if (head == '交易金额') {
            obj.pay_amount_num = item[index]
          } else if (head == '访客人数') {
            obj.visitor_num = item[index]
          } else if (head == '搜索人数') {
            obj.search_num = item[index]
          } else if (head == '收藏人数') {
            obj.collect_num = item[index]
          } else if (head == '加购人数') {
            obj.repurchase_num = item[index]
          } else if (head == '支付转化率') {
            obj.pay_transform_percentage = item[index]
          } else if (head == '支付人数') {
            obj.pay_people_num = item[index]
          } else if (head == '支付件数') {
            obj.pay_piece_num = item[index]
          } else if (head == '客单价') {
            obj.atv_num = item[index]
          } else if (head == 'uv价值') {
            obj.uv_value = item[index]
          } else if (head == '搜索占比') {
            obj.search_percentage = item[index]
          } else if (head == '收藏率') {
            obj.collect_percentage = item[index]
          } else if (head == '加购率') {
            obj.repurchase_percentage = item[index]
          }
          obj.group = groupName
          obj.group_name = workSheetsFromFile[0].name
          obj.cate_id = cateId
          obj.table_id = tableId
        })
        bulkArray.push(obj)
      }
    })
    const { ctx } = this;
    const result = ctx.model.Goods.bulkCreate(bulkArray)
    return result
  }
}

module.exports = UploadController;