const auth = require('../controllers/tops.js'); 
const router = require('koa-router')();

router.get('/top/:id', auth.getTopInfo); 

module.exports = router;