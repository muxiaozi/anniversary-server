const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    wx_id: { type: String, default: null },
    qq_id: { type: String, default: null },
    name: { type: String, required: true },
    gender: { type: String, default: '未知' },
    avatar_url: { type: String, default: null },
    data: [{
        uuid: { type: Number, default: 0},
        time: { type: Date, default: Date.now },
        content: { type: String, default: null },
        type: { type: Number, default: 0 },
        is_solar: { type: Boolean, default: true }
    }]
});

module.exports = mongoose.model('User', UserSchema, 'user');