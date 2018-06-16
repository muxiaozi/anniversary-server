const router = require('koa-router')();

const User = require('../controller/user');
const Feedback = require('../controller/feedback');

router
    .post('/users', User.add)
    .get('/login/wx/:id', User.findWxId)
    .get('/login/qq/:id', User.findQQId)
    .get('/users', User.find)
    .get('/users/:user_id', User.findId)
    .put('/users/:user_id', User.update)
    .post('/users/:user_id/data', User.asyncData)

    .post('/users/:user_id/feedbacks', Feedback.add)

module.exports = router;