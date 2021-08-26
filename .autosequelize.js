const EggSequelizeAuto = require('egg-sequelize-auto')

// With options:
const auto = new EggSequelizeAuto('smart_excel', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql',
  directory: './app/model/',
  port: '3306',
  tables: ['users','goods','category', 'table'],
})

auto.run(function (err) {
  if (err) throw err

  // console.log(auto.tables) // table list
  // console.log(auto.foreignKeys) // foreign key list
})
