const mysql = require("./node_modules/mysql")
const mysqlOpt = require("../config/sql.config")  // 默认数据库配置

const conn = mysql.createConnection(mysqlOpt);

const _mysql_ctr = {
    // 数据库连接
    connect: () => {
        return new Promise((resolve, reject) => {
            conn.connect((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    },
    // 数据库表名查重
    /**
     * databasename 库名
     * tablename 表名
     */
    duplicate_checking: (databasename, tablename) => {
        const command = 'select t.table_name from information_schema.TABLES t where t.TABLE_SCHEMA ="' + databasename + '" and t.TABLE_NAME ="' + tablename + '";'
        return new Promise((resolve, reject) => {
            conn.query(command, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.stringify(res))
                }
            });
        })
    },
    // 数据库建表
    /**
     * opt 建表参数
     */
    creat_table: (opt) => {
        return new Promise((resolve, reject) => {
            conn.query(opt, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    },
    // 增
    add: (tablename, opt) => {
        let keys = [], values = [];
        for(var i in opt) {
            keys.push(i)
            values.push("'" + opt[i] + "'")
        }

        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO ' + tablename + '(' + keys.join(',') + ') VALUES(' + values.join(',') + ')'
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('数据新增成功')
                };
            });
        })
    },
    // 删
    delete: (tablename, opt, key, value) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM ' + tablename + ' WHERE ' + key + ' = ' + value, opt, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('数据删除成功')
                };
            });
        })
    },
    // 查
    query: (tablename, params) => {
        return new Promise((resolve, reject) => {
            if (!params) {
                // 查询整个表
                conn.query('SELECT * FROM ' + tablename, (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    };
                })
            } else {
                let newArr = []
                for(var i in params) {
                    newArr.push(i + '=' + params[i])
                }
                conn.query('SELECT * FROM ' + tablename + ' WHERE ' + newArr.join(','), (err, res) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
            }
        })
    },
    // 改(更新数据)
    /**
     * tablename 表名
     * querys 新数据对象
     * key 关键字
     * value 关键字值
     */
    update: (tablename, querys, key, value) => {
        // let userModSql = 'UPDATE ' + tablename +' SET name = ?,age = ? WHERE id = ?';
        let modSql = 'UPDATE ' + tablename + ' SET ';
        let newArr = [];
        for (var i in querys) {
            newArr.push(i + ' = ' + querys[i])
        }
        modSql += newArr.join(',') + ' WHERE ' + key + ' = ' + value;

        return new Promise((resolve, reject) => {
            conn.query(modSql, querys, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('数据更新成功')
                };
            })
        })
    },
    // 断开数据库连接
    close: () => {
        conn.end();
    }
}


module.exports = {
    conn,
    _mysql_ctr
}