const sql_init = require('./sql-init')
const datactr = require('./getdata'); // 数据操作

const valueId = 10279; // 新闻栏目id
const pageMaxSize = 800; // 最大页数

sql_init();

for (var i = 1; i < pageMaxSize; i++) {
    datactr._consoleRes({categoryId: valueId, page: i}, i)
}