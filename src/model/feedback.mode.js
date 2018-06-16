const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contact: { type: String, required: true },
    content: { type: String, required: true },
    images: [String],
    client: { type: String, default: 'Android' }
});

module.exports = mongoose.model('Feedback', FeedbackSchema, 'feedback');