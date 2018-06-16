const FeedbackModel = require('../model/feedback.mode');

module.exports = class Feedback {
    static async add(ctx, next) {
        ctx.body = '123';
        await next();
    }
}