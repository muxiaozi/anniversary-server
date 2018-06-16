const UserModel = require('../model/user.model');

module.exports = class User {
    /**
     * 添加用户信息
     */
    static async add(ctx, next) {
        let user_info = ctx.request.body;
        // user_info.wx_id = null;
        ctx.body = await UserModel.create(user_info)
            .catch(err => ctx.throw(400, err));
        await next();
    }

    /**
     * 修改用户信息
     */
    static async update(ctx, next) {
        let user_id = ctx.params.user_id;
        ctx.body = await UserModel.findByIdAndUpdate(user_id, ctx.request.body)
            .catch(err => ctx.throw(400, err));
        await next();
    }

    static async find(ctx, next) {
        ctx.body = await UserModel.find().catch(err => ctx.throw(400, err));
        await next();
    }

    /**
     * 查找用户
     */
    static async findId(ctx, next) {
        let user_id = ctx.params.user_id;
        let user = await UserModel.findById(user_id)
            .catch(err => ctx.throw(400, err));
        if (user) {
            ctx.body = user;
        } else {
            ctx.throw(404, user_id + ' not found');
        }
        await next();
    }

    /**
     * 根据QQID查找用户
     */
    static async findWxId(ctx, next) {
        let wx_id = ctx.params.id;
        let user = await UserModel.findOne({ wx_id })
            .catch(err => ctx.throw(400, err));
        if (user) {
            ctx.body = user;
        } else {
            ctx.throw(404, wx_id + ' not found');
        }
        await next();
    }

    /**
     * 根据微信ID查找用户
     */
    static async findQQId(ctx, next) {
        let qq_id = ctx.params.id;
        let user = await UserModel.findById(qq_id)
            .catch(err => ctx.throw(400, err));
        if (user) {
            ctx.body = user;
        } else {
            ctx.throw(404, wx_id + ' not found');
        }
        await next();
    }

    /**
     * 同步纪念日数据
     */
    static async asyncData(ctx, next) {
        let user_id = ctx.params.user_id;
        let data = ctx.request.body;
        if (Array.isArray(data)) {
            let works = data.map(item => {
                return User.mergeData(user_id, item);
            })
            await Promise.all(works).catch(err => ctx.throw(400, err));
        }
        let result = await UserModel.findById(user_id).catch(err => ctx.throw(400, err));
        if (result) {
            ctx.body = result.data;
        } else {
            ctx.throw(404, user_id + ' not found');
        }
        await next();
    }

    /**
     * 合并数据
     */
    static async mergeData(user_id, data_item) {
        if (data_item.status === 1 || data_item.status === 2) {
            return UserModel.findOneAndUpdate( // 尝试更新
                {
                    _id: user_id,
                    'data.uuid': data_item.uuid
                }, {
                    $set: {
                        'data.$': data_item
                    }
                }).then(user => {
                    if (!user) { // 更新失败，尝试添加
                        return UserModel.findByIdAndUpdate(user_id, {
                            $addToSet: {
                                data: data_item
                            }
                        });
                    }
                });
        } else if (data_item.status === 3) {
            return UserModel.findByIdAndUpdate(user_id, {
                $pull: {
                    data: {
                        uuid: data_item.uuid
                    }
                }
            });
        }
    }
}