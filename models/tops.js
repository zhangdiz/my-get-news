// models/user.js
const db = require('../config/db.js'), 
      topsModel = '../schema/tops.js';
const NewsDb = db.News; // 引入数据库

const Tops = NewsDb.import(topsModel);

const getTopsById = async (id) => {
  const topInfo = await Tops.findOne({
    where: {
      id: id
    }
  });

  return topInfo
}

module.exports = {
    getTopsById
}