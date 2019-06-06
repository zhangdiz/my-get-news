
const Sequelize = require('sequelize'); // 引入sequelize

const News = new Sequelize('mysql://root:090569@localhost/news',{
  define: {
    timestamps: false
  }
}) 

module.exports = {
    News
}