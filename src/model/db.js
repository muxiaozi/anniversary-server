const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost:27017/anniversary'

// 连接成功
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected ' + mongo_uri);
})

// 连接失败
mongoose.connection.on('error', (err) => {
    console.log('Mongoose error ' + err);
})

//断开连接
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected ');
})

mongoose.connect(mongo_uri);