// 数据库连接配置
const mysqlOpt = {
    host: 'localhost',
    user: 'root',
    password: '090569',
    database: 'news',
    connectTimeout: 5000, // 连接超时
    multipleStatements: false // 是否允许一个query中包含多条sql语句
}

module.exports = mysqlOpt