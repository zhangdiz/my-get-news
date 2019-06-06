
const top = require('../models/tops.js');

const getTopInfo = async () => {
    const id = this.params.id;
    const result = await top.getTopsById(id);
    this.body = result
}

module.exports = {
    getTopInfo
}