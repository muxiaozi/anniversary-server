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

    
}