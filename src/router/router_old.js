const router = require('koa-router')();

const UserOld = require('../controller/user_old');

router.get('/api/anniversary/index.php', UserOld)

module.exports = router;