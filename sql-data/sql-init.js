const mysqlOpt = require("../config/sql.config")  // 默认数据库配置
const sqlctr = require("./sqlctr"); // 数据库操作
const datactr = require('./getdata'); // 数据操作

const _sql_init = async () => {
    await sqlctr._mysql_ctr.connect().then(() => {
        console.log('数据库连接成功\n')
    }).catch(err => {
        console.log('数据库连接失败\n')        
    })

    // 新建数据库表明查重，如果不存在则新建表
    if (datactr.tableName.length > 0) {

        await datactr.tableName.forEach((item, index) => {
            // 数据库表检测
            sqlctr._mysql_ctr.duplicate_checking(mysqlOpt.database, item).then(res => {

                let result = JSON.parse(res)

                if (!result || result.length == 0) {
                    // 新建数据库表
                    sqlctr._mysql_ctr.creat_table(datactr.sqlCreatTable[index]).then(() => {
                        console.log('建表成功')
                    }).catch(err => {
                        console.log('建表错误' + err)
                    })
                } else {
                    console.log('数据库表' + item + '已存在，将进行数据更新')
                }
            }).catch(err => {
                console.log('数据库表查重错误' + err)
            })
        })
    }
}

module.exports = _sql_init