'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/login',controller.user.login);

  router.post('/upload/excel',app.jwt, controller.upload.excel);


  router.get('/goods/category',app.jwt, controller.goods.category);
  router.get('/goods/table', app.jwt, controller.goods.tableList)
  router.get('/goods/info', app.jwt, controller.goods.info)
  
};
