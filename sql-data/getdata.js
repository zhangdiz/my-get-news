// ***** 获取数据
const sqlctr = require("./sqlctr"); // 数据库操作

const superagent = require("superagent");
const cheerio = require("cheerio");
const apiUrl = 'http://sjb.jxnews.com.cn/index.php/welcome/getNewsList'; // 新闻网址

const tableName = ['tops','list']

// mysql连接后新建表(后续改进, 增加html + ejs页面, 抓取数据url、数据库建表字段（类型）改为页面输入)
const sqlCreatTable = [
    'CREATE TABLE ' + tableName[0] + '(' +
    'categoryId int,' +
    'id int,' +
    'title varchar(255),' +
    'follow_count int,' +
    'type int,' +
    'tag varchar(255),' +
    'tag_str varchar(255),' +
    'live_flag varchar(255),' +
    'top_img_url varchar(255),' +
    'wap_url varchar(255),' +
    'pc_url varchar(255))'
    ,
    'CREATE TABLE ' + tableName[1] + '(' +
    'categoryId int,' +
    'id int,' +
    'newsId int,' +
    'title varchar(255),' +
    'type int,' +
    'tagId int,' +
    'tagStr varchar(255),' +
    'publish_time datetime,' +
    'pic_count int,' +
    'pics varchar(255),' +
    'followCount int,' +
    'title_img_url varchar(255),' +
    'wap_url varchar(255),' +
    'pc_url varchar(255))'
];


// 采集数据
var _consoleRes = (data, index) => {
    superagent
        .get(apiUrl)
        .query(data)
        .end((error, response) => {
            if (error) throw Error(error);

            //获取接口数据
            var content = response.body.data;

            if (!content) return false
            if (!content.list) return false
            if (!content.list.length > 0) return false

            if (content.tops) {
                content.tops.forEach((item, index) => {
                    let obj = {
                        categoryId: content.categoryId,
                        id: item.id,
                        type: item.type,
                        title: item.title,
                        tag: item.tag,
                        tag_str: item.tagStr,
                        live_flag: item.live_flag,
                        top_img_url: item.top_img_url,
                        wap_url: item.wap_url,
                        pc_url: item.pc_url,
                        follow_count: item.follow_count
                    }
                    sqlctr._mysql_ctr.add(tableName[0], obj).then(res => {
                        console.log(tableName[0] + '新增成功' + index + '条数据')
                    }).catch(err => {
                        console.log(tableName[0] + '新增失败' + err)
                    });

                })
            }

            if (content.list) {
                content.list.forEach((item, index) => {
                    let obj = {
                        categoryId: content.categoryId,
                        id: item.id,
                        type: item.type,
                        tagId: item.tagId,
                        title: item.title,
                        followCount: item.followCount,
                        title_img_url: item.title_img_url,
                        wap_url: item.wap_url,
                        pc_url: item.pc_url
                    }
                    sqlctr._mysql_ctr.add(tableName[1], obj).then(res => {
                        console.log(tableName[1] + '新增成功' + index + '条数据')
                    }).catch(err => {
                        console.log(tableName[1] + '新增失败' + err)
                    });                   
                })
            }
        })
}

module.exports = {
    tableName,
    sqlCreatTable,
    _consoleRes
};