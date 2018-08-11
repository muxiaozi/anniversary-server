const UserModel = require('../model/user.model');

module.exports = class UserService {

    static async add(user_info){
        return UserModel.create(user_info);
    }

    static async update(user_id, user_info){
        return UserModel.findByIdAndUpdate(user_id, user_info);
    }

    static async delete(user_id){
        return UserModel.findByIdAndRemove(user_id);
    }

    /**
     * 根据QQID查找用户
     */
    static async findQQId(qq_id) {
        return UserModel.findOne({ qq_id })
            .then(user => user || Promise.reject(new Error(qq_id + ' not found')));
    }

    /**
     * 根据WXID查找用户
     */
    static async findWXId(wx_id) {
        return UserModel.findOne({ wx_id })
            .then(user => user || Promise.reject(new Error(wx_id + ' not found')));
    }
}